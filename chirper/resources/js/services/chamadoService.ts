import { apiClient } from '../api/client';
import type {
    CreateHelpdeskTicket,
    HelpdeskTicket,
    TicketPriority,
    TicketStatus,
} from '../types/helpdesk';

interface RawChamado {
    id: number;
    titulo: string;
    patrimonio: string;
    prioridade: string;
    categoria: string | null;
    solicitante: string | null;
    responsavel: string | null;
    status: string | null;
}

interface RawCreatedChamado {
    id: number;
    uuid: string;
    titulo: string;
    descricao: string;
    prioridade: string;
    status: string;
    patrimonio: string;
    id_categoria: number;
    id_usuario: number;
    id_responsavel: number | null;
}

export async function fetchChamados(): Promise<HelpdeskTicket[]> {
    const response = await apiClient.get<RawChamado[]>('/api/chamados');

    return response.data.map((item) => ({
        id: item.id,
        titulo: item.titulo,
        patrimonio: item.patrimonio,
        prioridade: item.prioridade as TicketPriority,
        categoria: item.categoria ?? 'Sem categoria',
        solicitante: item.solicitante ?? 'Desconhecido',
        responsavel: item.responsavel ?? undefined,
        status: (item.status ?? 'pendente') as TicketStatus,
    }));
}

export async function createChamado(payload: CreateHelpdeskTicket): Promise<{
    message: string;
    data: RawCreatedChamado;
}> {
    const response = await apiClient.post<RawCreatedChamado>('/api/chamados', payload);

    return {
        message: response.message ?? 'Chamado criado com sucesso',
        data: response.data,
    };
}
