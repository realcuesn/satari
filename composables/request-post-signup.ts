import axios from "axios";

interface SignUpData {
    username: string;
    email: string;
    password: string;
}

interface SignUpResponse {
    message: string;
    userUID: string;
    token: string;
}

export const requestPostSignUp = async (signupData: SignUpData): Promise<SignUpResponse> => {
    const runtimeConfig = useRuntimeConfig(); // Ensure runtimeConfig is available

    if (!runtimeConfig || !runtimeConfig.public.apiBase) {
        throw new Error('Runtime configuration is missing or incomplete');
    }

    const url = `${runtimeConfig.public.apiBase}signup`;
    const headers = { 'content-type': 'application/json' };

    try {
        const response = await axios.post<SignUpResponse>(url, signupData, { headers });

        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        const errorMessage = (error as Error).message || 'An error occurred during signup';
        throw new Error(errorMessage);
    }
};

// Example usage:
// const response = await requestPostSignUp({
//   username: 'your_username',
//   email: 'your_email@example.com',
//   password: 'your_password',
// });
// console.log(response.message); // Access the response properties
