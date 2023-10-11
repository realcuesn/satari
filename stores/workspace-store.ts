// store/workspaces.ts
import { defineStore } from 'pinia';

const SELECTED_WORKSPACE_STORAGE_KEY = 'selectedWorkspace'; // Key for Local Storage

interface Workspace {
  workspaceId: string;
  title: string;
  description: string;
  role: string;
  managers: string[];
  teamMembers: string[];
  ownerId: string;
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

export const useWorkspacesStore = defineStore('workspacesStore', () => {
  const workspaces = ref<Workspace[]>([]);
  const collectors = ref<Collector[]>([]); // Add a collectors property
  const selectedWorkspace = ref<Workspace | null>(null);

  // Initialize selectedWorkspace from local storage
  const storedSelectedWorkspace = localStorage.getItem(SELECTED_WORKSPACE_STORAGE_KEY);
  if (storedSelectedWorkspace) {
    // Parse the stored value and make sure it exists in the workspaces list
    const parsedSelectedWorkspace = JSON.parse(storedSelectedWorkspace) as Workspace;
    const workspaceExists = workspaces.value.some((workspace) => workspace.workspaceId === parsedSelectedWorkspace.workspaceId);

    if (workspaceExists) {
      selectedWorkspace.value = parsedSelectedWorkspace;
    } else {
      // If the selected workspace doesn't exist, clear it from local storage
      localStorage.removeItem(SELECTED_WORKSPACE_STORAGE_KEY);
    }
  }

  // Watch for changes to workspaces and update selectedWorkspace if it's removed
  watch(workspaces, (newWorkspaces) => {
    if (selectedWorkspace.value && !newWorkspaces.some((workspace) => workspace.workspaceId === selectedWorkspace.value!.workspaceId)) {
      selectedWorkspace.value = null;
      localStorage.removeItem(SELECTED_WORKSPACE_STORAGE_KEY);
    }
  });

  function updateWorkspaces(value: Workspace[]) {
    workspaces.value = value;
  }

  function updateCollectors(value: Collector[]) {
    collectors.value = value;
  }

  function selectWorkspace(workspace: Workspace | null) {
    selectedWorkspace.value = workspace;

    if (workspace) {
      // Update the selectedWorkspace in local storage
      localStorage.setItem(SELECTED_WORKSPACE_STORAGE_KEY, JSON.stringify(workspace));
    } else {
      // If workspace is null, remove the selectedWorkspace from local storage
      localStorage.removeItem(SELECTED_WORKSPACE_STORAGE_KEY);
    }
  }

  return { updateWorkspaces, updateCollectors, selectWorkspace, workspaces, collectors, selectedWorkspace };
});
