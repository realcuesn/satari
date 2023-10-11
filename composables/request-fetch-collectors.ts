import axios, { AxiosResponse } from "axios";

interface FetchCollectorsData {
    token: string;
    workspaceId: string;
}

interface Collector {
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
    collectorId: string;
}

interface FetchCollectorsResponse {
    collectors: Collector[];
}

export const requestFetchCollectors = async (
    fetchCollectorsData: FetchCollectorsData
): Promise<FetchCollectorsResponse> => {
    const runtimeConfig = useRuntimeConfig(); // Use your runtime config utility to get the API base URL

    // Ensure runtimeConfig is available and contains the API base URL
    if (!runtimeConfig || !runtimeConfig.public.apiBase) {
        throw new Error("Runtime configuration is missing or incomplete");
    }

    const url = `${runtimeConfig.public.apiBase}fetch-collectors`; // Adjust the URL path as needed
    const headers = { "content-type": "application/json" };

    try {
        const response: AxiosResponse<FetchCollectorsResponse> = await axios.post(
            url,
            fetchCollectorsData,
            { headers }
        );

        // Extract HTTP status code and response data
        const { status, data } = response;

        if (status === 200) {
            return data;
        } else if (status === 400) {
            throw new Error("Bad request: Invalid request data");
        } else if (status === 401) {
            throw new Error("Unauthorized: Invalid token");
        } else if (status === 403) {
            throw new Error("Forbidden: You are not authorized to fetch collectors");
        } else if (status === 404) {
            throw new Error("Not Found: Workspace not found");
        } else if (status === 500) {
            throw new Error("Internal Server Error: Failed to fetch collectors");
        } else {
            throw new Error(`HTTP Error: ${status} - ${response.statusText}`);
        }
    } catch (error) {
        const errorMessage =
            (error as Error).message || "An error occurred while fetching collectors";
        throw new Error(errorMessage);
    }
};
