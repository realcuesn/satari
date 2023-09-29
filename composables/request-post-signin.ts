import axios, { type AxiosRequestConfig } from "axios";


interface SignInData {
    username: string;
    password: string;
}

interface SignInResponse {
    message: string;
    userUID: string;
    token: string;
}

export const requestPostSignIn = async (signinData: SignInData): Promise<SignInResponse> => {
    const runtimeConfig = useRuntimeConfig(); // Ensure runtimeConfig is available

    if (!runtimeConfig || !runtimeConfig.public.apiBase) {
        throw new Error('Runtime configuration is missing or incomplete');
    }

    const url = `${runtimeConfig.public.apiBase}signin`;
    const headers = { 'content-type': 'application/json' };

    try {
        const response = await axios.post<SignInResponse>(url, signinData, { headers });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        const errorMessage = (error as Error).message || 'An error occurred during signin';
        throw new Error(errorMessage);
    }
};

// Example usage:
// const response = await signin({
//   username: 'test_name',
//   password: 'testPassword',
// });
// console.log(response.message); // Access the response properties
