import axios, { AxiosResponse } from "axios";

interface AddManagerData {
    token: string;
    workspaceId: string;
    managerUsername: string;
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

interface AddManagerResponse {
    message: string;
    workspace: Workspace;
}

export const requestPostAddManagerToWorkspace = async (addManagerData: AddManagerData): Promise<AddManagerResponse> => {
    const runtimeConfig = useRuntimeConfig(); // Ensure runtimeConfig is available

    if (!runtimeConfig || !runtimeConfig.public.apiBase) {
        throw new Error('Runtime configuration is missing or incomplete');
    }

    const url = `${runtimeConfig.public.apiBase}add-manager-to-workspace`;
    const headers = { 'content-type': 'application/json' };

    try {
        const response: AxiosResponse<AddManagerResponse> = await axios.post(url, addManagerData, { headers });

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            throw new Error("Invalid token");
        } else if (response.status === 403) {
            throw new Error("You are not authorized to add a manager to this workspace");
        } else {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        const errorMessage = (error as Error).message || 'An error occurred while adding a manager to the workspace';
        throw new Error(errorMessage);
    }
};
