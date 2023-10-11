import axios, { AxiosResponse } from "axios";

interface FetchUserWorkspacesData {
    token: string;
}

interface Workspace {
    workspaceId: string;
    title: string;
    description: string;
    role: string;
    managers: string[];
    teamMembers: string[];
    ownerId: string;
}

interface FetchUserWorkspacesResponse {
    workspaces: Workspace[];
}

export const requestFetchUserWorkspaces = async (fetchUserWorkspacesData: FetchUserWorkspacesData): Promise<FetchUserWorkspacesResponse> => {
    const runtimeConfig = useRuntimeConfig(); // Ensure runtimeConfig is available

    if (!runtimeConfig || !runtimeConfig.public.apiBase) {
        throw new Error('Runtime configuration is missing or incomplete');
    }

    const url = `${runtimeConfig.public.apiBase}fetch-user-workspaces`;
    const headers = { 'content-type': 'application/json' };

    try {
        const response: AxiosResponse<FetchUserWorkspacesResponse> = await axios.post(url, fetchUserWorkspacesData, { headers });

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            throw new Error("Invalid token");
        } else {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        const errorMessage = (error as Error).message || 'An error occurred while fetching user workspaces';
        throw new Error(errorMessage);
    }
};

// Example usage:
// try {
//   const response = await requestFetchUserWorkspaces({
//     token: 'YOUR_JWT_TOKEN_HERE',
//   });
//   console.log(response.workspaces); // Access the response properties
// } catch (error) {
//   console.error(error.message); // Handle and log the error
// }
