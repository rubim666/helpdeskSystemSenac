import { useEffect, useState } from 'react';

import { fetchChamados } from '../services/chamadoService';
import type { HelpdeskTicket } from '../types/helpdesk';

interface UseChamadosResult {
    chamados: HelpdeskTicket[];
    isLoading: boolean;
    error: string | null;
    refreshChamados: () => Promise<void>;
}

export function useChamados(): UseChamadosResult {
    const [chamados, setChamados] = useState<HelpdeskTicket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function refreshChamados(): Promise<void> {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchChamados();
            setChamados(data);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Erro ao carregar chamados';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        let cancelled = false;

        refreshChamados()
            .catch(() => {
                return;
            })
            .finally(() => {
                if (cancelled) {
                    return;
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return { chamados, isLoading, error, refreshChamados };
}
