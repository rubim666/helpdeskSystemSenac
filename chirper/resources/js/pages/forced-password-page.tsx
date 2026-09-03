import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, KeyRound, LogOut } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';

import { FloatingBackground } from '@/components/fx/floating-background';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { alterarMinhaSenha } from '@/services/usuarioService';

interface ForcedPasswordPageProps {
    onPasswordChanged: () => Promise<void>;
    onLogout: () => Promise<void>;
}

export function ForcedPasswordPage({ onPasswordChanged, onLogout }: ForcedPasswordPageProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        if (novaSenha !== confirmarSenha) {
            setError('As senhas não coincidem.');
            return;
        }

        setIsSubmitting(true);

        try {
            await alterarMinhaSenha(novaSenha);
            await onPasswordChanged();
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erro ao trocar senha.';
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-8">
            <FloatingBackground />
            <motion.div
                initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-md"
            >
                <Card className="rounded-3xl p-6 sm:p-8">
                    <CardHeader>
                        <CardTitle className="text-2xl">Defina uma nova senha</CardTitle>
                        <CardDescription>
                            Você está usando a senha padrão. Por segurança, defina uma senha só sua antes de continuar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {error ? (
                                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                                    {error}
                                </div>
                            ) : null}

                            <label className="block space-y-2">
                                <span className="text-sm text-stone-200">Nova senha</span>
                                <div className="relative">
                                    <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                                    <Input
                                        className="pl-9 pr-10"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={novaSenha}
                                        onChange={(event) => setNovaSenha(event.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((current) => !current)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                            </label>

                            <label className="block space-y-2">
                                <span className="text-sm text-stone-200">Confirmar nova senha</span>
                                <div className="relative">
                                    <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                                    <Input
                                        className="pl-9"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={confirmarSenha}
                                        onChange={(event) => setConfirmarSenha(event.target.value)}
                                        required
                                    />
                                </div>
                            </label>

                            <p className="text-xs text-stone-400">
                                Mínimo 8 caracteres, com maiúscula, minúscula, número e símbolo.
                            </p>

                            <AnimatePresence mode="wait">
                                <motion.button
                                    key={isSubmitting ? 'loading' : 'ready'}
                                    type="submit"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    whileHover={{ scale: 1.01 }}
                                    className="relative flex h-11 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-orange-400 font-medium text-white shadow-[0_10px_35px_rgba(217,119,6,0.30)] disabled:opacity-60"
                                    disabled={isSubmitting}
                                >
                                    <span className="relative z-10">{isSubmitting ? 'Salvando...' : 'Definir nova senha'}</span>
                                </motion.button>
                            </AnimatePresence>

                            <Button type="button" variant="ghost" className="w-full" onClick={onLogout}>
                                <LogOut className="size-4" />
                                Sair
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </main>
    );
}