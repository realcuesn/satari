import axios, { type AxiosRequestConfig, AxiosError } from "axios";

interface ResponseData {
    _id?: string | null;
    username?: string | null;
    email?: string | null;
    ipAddress?: string | null;
    createdAt?: string | null;
    userUID?: string | null;
    tokenVersion?: number | null;
    avatar?: string | null;
    mfa_enabled?: boolean | null;
    global_name?: string | null;
    verified?: boolean | null;
}

export const requestFetchUserWithToken = async (token: string): Promise<ResponseData> => {
    const runtimeConfig = useRuntimeConfig(); // Ensure runtimeConfig is available

    if (!runtimeConfig || !runtimeConfig.public.apiBase) {
        throw new Error('Runtime configuration is missing or incomplete');
    }

    const url = `${runtimeConfig.public.apiBase}login-with-token`;

    const options: AxiosRequestConfig = {
        method: 'POST',
        url: url,
        headers: { 'content-type': 'application/json' },
        data: {
            token: token
        }
    };

    try {
        const response = await axios.request<ResponseData>(options);

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            // Invalid token or user not found
            throw new Error('Invalid token or user not found');
        } else {
            // Handle other status codes if needed
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 401) {
                throw new Error('Invalid token or user not found');
            }
        }
        const errorMessage = (error as Error).message || 'An error occurred';
        throw new Error(errorMessage);
    }
};
