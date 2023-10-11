import axios, { AxiosResponse } from "axios";


interface CreateCollectorData {
    token: string;
    collectorData: {
        workspaceId: string;
        name: string;
        sourceType: string;
        allowedDomains: string[];
        formStructure: {
            fields: {
                name: string;
                type: string;
            }[];
        };
    };
}

interface CollectorResponse {
    message: string;
    collector: {
        id: string;
        name: string;
        sourceType: string;
        allowedDomains: string[];
        formStructure: {
            fields: {
                name: string;
                type: string;
            }[];
        };
    };
}

export const requestPostCreateCollector = async (createCollectorData: CreateCollectorData): Promise<CollectorResponse> => {
    const runtimeConfig = useRuntimeConfig(); // Use your runtime config utility to get the API base URL

    // Ensure runtimeConfig is available and contains the API base URL
    if (!runtimeConfig || !runtimeConfig.public.apiBase) {
        throw new Error('Runtime configuration is missing or incomplete');
    }

    const url = `${runtimeConfig.public.apiBase}create-collector`; // Adjust the URL path as needed
    const headers = { 'content-type': 'application/json' };

    try {
        const response: AxiosResponse<CollectorResponse> = await axios.post(url, createCollectorData, { headers });

        // Extract HTTP status code and response data
        const { status, data } = response;

        if (status === 201) {
            return data;
        } else if (status === 400) {
            throw new Error("Bad request: Invalid collector data");
        } else if (status === 401) {
            throw new Error("Unauthorized: Invalid token");
        } else if (status === 403) {
            throw new Error("Forbidden: You are not authorized to create a collector");
        } else if (status === 404) {
            throw new Error("Not Found: User or workspace not found");
        } else if (status === 500) {
            throw new Error("Internal Server Error: Failed to create the collector");
        } else {
            throw new Error(`HTTP Error: ${status} - ${response.statusText}`);
        }
    } catch (error) {
        const errorMessage = (error as Error).message || 'An error occurred while creating a collector';
        throw new Error(errorMessage);
    }
};
