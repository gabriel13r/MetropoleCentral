import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Configurações flexíveis de URL base para desenvolvimento local e Replit
const DEFAULT_PORT = '5000';
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' 
  : `http://localhost:${import.meta.env.VITE_API_PORT || DEFAULT_PORT}`;

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Adiciona o prefixo da API base se a URL começar com /api
  const fullUrl = url.startsWith('/api') ? `${API_BASE_URL}${url}` : url;
  
  console.log(`[API] Fazendo requisição ${method} para: ${fullUrl}`);
  
  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    // Adiciona o prefixo da API base se a URL começar com /api
    const fullUrl = url.startsWith('/api') ? `${API_BASE_URL}${url}` : url;
    
    console.log(`[API] Fazendo requisição GET para: ${fullUrl}`);
    
    const res = await fetch(fullUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      console.log('[API] Retornando null para requisição não autenticada');
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
