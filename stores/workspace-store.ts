interface Workspace {
    workspaceId: string;
    ownerId: string;
    managers: string[];
    teamMembers: string[];
    title: string;
    description: string;
    role: string;
    // Add other workspace properties as needed
}

interface WorkspaceData {
    workspaces: Ref<Workspace[]>;
    selectedWorkspaceId: Ref<string | null>;
    selectedWorkspace: Ref<Workspace | null>;
}

export const useWorkspaceStore = defineStore('workspaceStore', () => {
    const workspaces: Ref<Workspace[]> = ref([]);
    const selectedWorkspaceId: Ref<string | null> = ref(null);
    const selectedWorkspace: Ref<Workspace | null> = ref(null);

    function selectWorkspace(workspaceId: string) {
        selectedWorkspaceId.value = workspaceId;
        selectedWorkspace.value = workspaces.value.find((w) => w.workspaceId === workspaceId) || null;
    }

    function updateWorkspaces(newWorkspaces: Workspace[]) {
        workspaces.value = newWorkspaces;
        selectedWorkspaceId.value = null;
        selectedWorkspace.value = null;
    }

    function removeWorkspace(workspaceId: string) {
        workspaces.value = workspaces.value.filter((w) => w.workspaceId !== workspaceId);
        if (selectedWorkspaceId.value === workspaceId) {
            selectedWorkspace.value = null;
        }
    }

    function clearWorkspaces() {
        workspaces.value = [];
        selectedWorkspaceId.value = null;
        selectedWorkspace.value = null;
    }

    function updateSelectedWorkspace(updatedWorkspace: Workspace) {
        selectedWorkspace.value = updatedWorkspace;
    }

    return {
        workspaces,
        selectedWorkspaceId,
        selectedWorkspace,
        selectWorkspace,
        updateWorkspaces,
        removeWorkspace,
        clearWorkspaces,
        updateSelectedWorkspace,
    };
});
