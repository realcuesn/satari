<template>
  <!-- Main container -->
  <div class="w-full">
    <!-- If data is loaded, show the main content -->
    <div v-if="isDataLoaded" class="w-full">
      <!-- Nuxt layout for the main page -->
      <NuxtLayout>
        <NuxtPage></NuxtPage>
      </NuxtLayout>
    </div>

    <!-- If data is not yet loaded, show a loading indicator -->
    <div v-else class="w-full min-h-screen grid place-content-center">
      <!-- Loading indicator -->
      <LoadingIndicator class="mr-2 h-4 w-4 animate-spin" />
    </div>
  </div>
</template>

<script setup>
import { Loader2 as LoadingIndicator } from 'lucide-vue-next';

// Access color mode and authentication store
const colorModeStore = useColorMode();
const authStore = useAuthStore();
const workspacesStore = useWorkspacesStore();

// Access router and route information
const router = useRouter();
const route = useRoute();

// UI state
const isSidebarOpen = useState('sidebar', () => true);

// Create a reactive variable to track if data is loaded
const isDataLoaded = ref(false);

// Simulate artificial loading delay
const artificialLoadDelay = 1000;

// When the component is mounted, perform these actions
onMounted(async () => {
  // Set the theme preference if it's not already set
  if (!colorModeStore.preference) colorModeStore.preference = colorModeStore.value;

  // Check if there is a user token in local storage
  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Fetch user data using the token and update the authentication store
      const userDataResponse = await requestFetchUserWithToken(token);
      authStore.updateUser(userDataResponse);

      // Fetch user workspaces using the token
      const workspacesResponse = await requestFetchUserWorkspaces({
        token
      });

      // Check if the user has an owner workspace
      const firstOwnerWorkspace = workspacesResponse.workspaces.find(({ role }) => role === 'Owner');
      // Update the workspaces in the store
      workspacesStore.updateWorkspaces(workspacesResponse.workspaces);
      if (!firstOwnerWorkspace) {
        // User does not have an owner workspace
        console.log(workspacesResponse.workspaces);

        // Wait for an artificial delay before redirecting to create a workspace
        await delay(artificialLoadDelay);
        await router.push('/flow/create-workspace');
      } else {
        // User has an owner workspace

        // If a workspace is already selected, navigate to the appropriate route
        if (workspacesStore.selectedWorkspace) {
          if (workspacesStore.workspaces.find(({ workspaceId }) => workspaceId === workspacesStore.selectedWorkspace.workspaceId)) {
            // Check the first route path and navigate accordingly     

            const collectorsResponse = await requestFetchCollectors({
              token: localStorage.getItem('token'),
              workspaceId: workspacesStore.$state.selectedWorkspace.workspaceId
            })

            workspacesStore.updateCollectors(collectorsResponse.collectors)
            const firstRoutePath = route.path.split('/')[1];
            if (firstRoutePath === 'app') console.log('Navigating to the app route');
            else await router.push('/app');
          } else {
            // Select the owner workspace and navigate to the appropriate route
            workspacesStore.selectWorkspace(firstOwnerWorkspace);

            const collectorsResponse = await requestFetchCollectors({
              token: localStorage.getItem('token'),
              workspaceId: workspacesStore.$state.selectedWorkspace.workspaceId
            })

            workspacesStore.updateCollectors(collectorsResponse.collectors)
            const firstRoutePath = route.path.split('/')[1];
            if (firstRoutePath === 'app') console.log('Navigating to the app route');
            else await router.push('/app');
          }
        } else {
          // Select the owner workspace and navigate to the appropriate route
          workspacesStore.selectWorkspace(firstOwnerWorkspace);

          const collectorsResponse = await requestFetchCollectors({
            token: localStorage.getItem('token'),
            workspaceId: workspacesStore.$state.selectedWorkspace.workspaceId
          })

          workspacesStore.updateCollectors(collectorsResponse.collectors)
          const firstRoutePath = route.path.split('/')[1];
          if (firstRoutePath === 'app') console.log('Navigating to the app route');
          else await router.push('/app');
        }
      }

      // Set isDataLoaded to true to indicate data loading is complete
      isDataLoaded.value = true;
    } catch (error) {
      // Handle errors, clear token, and navigate to login on failure
      const errorMessage = error.message || 'An error occurred when trying to login. Clearing local storage and trying again.';
      console.log(errorMessage);
      localStorage.removeItem('token');

      // Wait for an artificial delay before redirecting to the login page
      await delay(artificialLoadDelay);
      await router.push('/auth/login');
      isDataLoaded.value = true;
    }
  } else {
    // No user token in local storage

    // Check the first route path and navigate accordingly
    const firstRoutePath = route.path.split('/')[1];
    if (firstRoutePath === 'app') {
      // Wait for an artificial delay before redirecting to the home page
      await delay(artificialLoadDelay);
      await router.push('/');
    }
    // If there is no token, set isDataLoaded to true
    isDataLoaded.value = true;
  }
});

// Utility function to introduce an artificial delay for a specified number of milliseconds
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
</script>

<style>
* {
  font-family: "Switzer";
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
}
</style>
