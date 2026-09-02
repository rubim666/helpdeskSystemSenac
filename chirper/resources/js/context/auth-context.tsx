import { Preferences } from '@capacitor/preferences';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { ApiError } from '../api/client';
import { fetchAuthenticatedUser, loginRequest, logoutRequest } from '../services/authService';
import type { HelpdeskUser } from '../types/helpdesk';

interface LoginCredentials {
    email: string;
    password: string;
    remember: boolean;
}

interface AuthContextValue {
    user: HelpdeskUser | null;
    isAuthenticated: boolean;
    isInitializing: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AUTH_STORAGE_KEY = 'helpdesk.auth.user';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function isStoredUser(value: unknown): value is HelpdeskUser {
    const parsed = value as Partial<HelpdeskUser> | null;

    return (
        !!parsed &&
        typeof parsed.id === 'number' &&
        typeof parsed.nome === 'string' &&
        typeof parsed.email === 'string' &&
        typeof parsed.nivel === 'string' &&
        typeof parsed.ativo === 'boolean' &&
        typeof parsed.telefone === 'string'
    );
}

async function loadStoredUser(): Promise<HelpdeskUser | null> {
    try {
        const { value } = await Preferences.get({ key: AUTH_STORAGE_KEY });
        if (!value) {
            return null;
        }

        const parsed = JSON.parse(value) as unknown;
        return isStoredUser(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<HelpdeskUser | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);

    const persistUser = useCallback(async (nextUser: HelpdeskUser | null, shouldRemember = true) => {
        setUser(nextUser);

        if (!nextUser || !shouldRemember) {
            await Preferences.remove({ key: AUTH_STORAGE_KEY });
            return;
        }

        await Preferences.set({ key: AUTH_STORAGE_KEY, value: JSON.stringify(nextUser) });
    }, []);

    const refreshUser = useCallback(async () => {
        try {
            const me = await fetchAuthenticatedUser();
            await persistUser(me, true);
        } catch (error) {
            if (error instanceof ApiError && error.status === 401) {
                await persistUser(null, false);
                return;
            }

            throw error;
        }
    }, [persistUser]);

    useEffect(() => {
        let cancelled = false;

        async function bootstrap() {
            const cachedUser = await loadStoredUser();
            if (!cancelled && cachedUser) {
                setUser(cachedUser);
            }

            try {
                await refreshUser();
            } catch {
                if (!cancelled) {
                    await persistUser(null, false);
                }
            } finally {
                if (!cancelled) {
                    setIsInitializing(false);
                }
            }
        }

        void bootstrap();

        return () => {
            cancelled = true;
        };
    }, [persistUser, refreshUser]);

    const login = useCallback(
        async ({ email, password, remember }: LoginCredentials) => {
            const authUser = await loginRequest({ email, senha: password });
            await persistUser(authUser, remember);
        },
        [persistUser],
    );

    const logout = useCallback(async () => {
        try {
            await logoutRequest();
        } finally {
            await persistUser(null, false);
        }
    }, [persistUser]);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            isAuthenticated: user !== null,
            isInitializing,
            login,
            logout,
            refreshUser,
        }),
        [isInitializing, login, logout, refreshUser, user],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider');
    }

    return context;
}
