const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';
const REQUEST_TIMEOUT_MS = 10000;

interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
    message?: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(`${BASE_URL}${path}`, {
            ...init,
            headers: {
                Accept: 'application/json',
                ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
                ...init?.headers,
            },
            signal: controller.signal,
        });

        let body: ApiResponse<T>;

        try {
            body = (await response.json()) as ApiResponse<T>;
        } catch {
            throw new Error('Resposta inesperada da API');
        }

        if (typeof body?.success !== 'boolean') {
            throw new Error('Resposta inesperada da API');
        }

        if (!response.ok || !body.success) {
            throw new Error(body.error ?? `Erro ${response.status}: ${response.statusText}`);
        }

        return body;
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            throw new Error('Tempo limite excedido ao comunicar com a API');
        }

        if (error instanceof TypeError) {
            throw new Error('Nao foi possivel conectar com a API');
        }

        throw error;
    } finally {
        window.clearTimeout(timeoutId);
    }
}

async function get<T>(path: string): Promise<ApiResponse<T>> {
    return request<T>(path);
}

async function post<T>(path: string, payload: unknown): Promise<ApiResponse<T>> {
    return request<T>(path, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export const apiClient = { get, post };
