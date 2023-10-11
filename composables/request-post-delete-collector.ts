import axios, { AxiosResponse } from "axios";

interface DeleteCollectorData {
    token: string;
    workspaceId: string;
    collectorId: string;
}

interface DeleteCollectorResponse {
    message: string;
}

export const requestPostDeleteCollector = async (
    deleteCollectorData: DeleteCollectorData
): Promise<DeleteCollectorResponse> => {
    const runtimeConfig = useRuntimeConfig(); // Use your runtime config utility to get the API base URL

    // Ensure runtimeConfig is available and contains the API base URL
    if (!runtimeConfig || !runtimeConfig.public.apiBase) {
        throw new Error("Runtime configuration is missing or incomplete");
    }

    const url = `${runtimeConfig.public.apiBase}delete-collector`; // Adjust the URL path as needed
    const headers = { "content-type": "application/json" };

    try {
        const response: AxiosResponse<DeleteCollectorResponse> = await axios.post(
            url,
            deleteCollectorData,
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
            throw new Error("Forbidden: You are not authorized to delete a collector");
        } else if (status === 404) {
            throw new Error("Not Found: Workspace or collector not found");
        } else if (status === 500) {
            throw new Error("Internal Server Error: Failed to delete the collector");
        } else {
            throw new Error(`HTTP Error: ${status} - ${response.statusText}`);
        }
    } catch (error) {
        const errorMessage =
            (error as Error).message || "An error occurred while deleting a collector";
        throw new Error(errorMessage);
    }
};
