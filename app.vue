<template>
  <!-- Main container -->
  <div class="w-full">
    <!-- If data is loaded, show the main content -->
    <div v-if="isLoaded" class="w-full">
      <!-- Nuxt layout for the main page -->
      <NuxtLayout>
        <NuxtPage></NuxtPage>
      </NuxtLayout>
    </div>

    <!-- If data is not yet loaded, show a loading indicator -->
    <div v-else class="w-full min-h-screen grid place-content-center">
      <!-- Loading indicator -->
      <Loader2 class="mr-2 h-4 w-4 animate-spin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';

// Access color mode and authentication store
const colorMode = useColorMode()
const store = useAuthStore()

// Access router and route information
const router = useRouter()
const route = useRoute()

//uiState
const sideBarState = useState('sidebar', () => true)

// Create a reactive variable to track if data is loaded
const isLoaded = ref(false)

// When the component is mounted, perform these actions
onMounted(async () => {
  // Set the theme preference if it's not already set
  if (!colorMode.preference) colorMode.preference = colorMode.value

  // Check if there is a user token in local storage
  const token = localStorage.getItem('token')
  if (token) {
    try {
      // Fetch user data using the token and update the store
      const userRes = await requestFetchUserWithToken(token);
      store.updateUser(userRes);

      // Check the first route path and navigate accordingly
      const firstRoutePath = route.path.split('/')[1]
      if (firstRoutePath == 'app') console.log('Navigating to the app route')
      else router.push('/app')

      // Set isLoaded to true to indicate data loading is complete
      isLoaded.value = true;
    } catch (error) {
      // Handle errors, clear token, and navigate to login on failure
      const errorMessage = (error as Error).message || 'An error occurred when trying to login. Clearing local storage and trying again.';
      console.log(errorMessage)
      localStorage.removeItem('token');
      isLoaded.value = true;
      router.push('/auth/login')
    }
  } else {
    // Check the first route path and navigate accordingly
    const firstRoutePath = route.path.split('/')[1]
    if (firstRoutePath == 'app') router.push('/')
    // If there is no token, set isLoaded to true
    isLoaded.value = true;
  }
})
</script>

<style>
* {
  font-family: "Switzer";
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

html,
body {
  width: 100%;
}
</style>
