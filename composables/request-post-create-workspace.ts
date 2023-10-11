import axios, { type AxiosResponse } from "axios";

interface CreateWorkspaceData {
    token: string;
    workspaceName: string;
    workspaceDescription: string;
}

interface CreateWorkspaceResponse {
    message: string;
    workspace: Workspace;
}

interface Workspace {
    workspaceId: string;
    ownerId: string;
    managers: string[];
    teamMembers: string[];
    title: string; // Updated property name
    description: string; // Updated property name
    // Add other workspace properties as needed
}

export const requestPostCreateWorkspace = async (createWorkspaceData: CreateWorkspaceData): Promise<CreateWorkspaceResponse> => {
    const runtimeConfig = useRuntimeConfig(); // Ensure runtimeConfig is available

    if (!runtimeConfig || !runtimeConfig.public.apiBase) {
        throw new Error('Runtime configuration is missing or incomplete');
    }

    const url = `${runtimeConfig.public.apiBase}create-workspace`;
    const headers = { 'content-type': 'application/json' };

    try {
        const response: AxiosResponse<CreateWorkspaceResponse> = await axios.post(url, createWorkspaceData, { headers });

        if (response.status === 201) {
            return response.data;
        } else if (response.status === 401) {
            throw new Error("Invalid token");
        } else if (response.status === 403) {
            throw new Error("You are not authorized to create a workspace");
        } else {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        const errorMessage = (error as Error).message || 'An error occurred during workspace creation';
        throw new Error(errorMessage);
    }
};

// Example usage:
// try {
//   const response = await requestPostCreateWorkspace({
//     token: 'YOUR_JWT_TOKEN_HERE',
//     workspaceName: 'New Workspace',
//     workspaceDescription: 'Description of the new workspace',
//   });
//   console.log(response.message); // Access the response properties
// } catch (error) {
//   console.error(error.message); // Handle and log the error
// }
