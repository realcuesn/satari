<template>
    <div class="w-full lg:grid h-screen lg:grid-cols-2">
        <!-- Left Panel -->
        <div class="hidden lg:block h-full w-full relative">
            <img class="h-full w-full object-cover"
                src="https://images.pexels.com/photos/4754883/pexels-photo-4754883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="" />
            <div class="absolute top-0 flex flex-col justify-between h-full w-full">
                <div class="w-full px-4 py-3 xl:px-6">
                    <NuxtLink class="uppercase font-semibold" to="/">Satari</NuxtLink>
                </div>
                <div class="w-full pl-4 pb-10 xl:pl-6 pr-[10%]">
                    <blockquote class="space-y-2">
                        <p class="text-lg">
                            &ldquo;This library has saved me countless hours of work and helped me deliver stunning designs
                            to my clients faster than ever before.&rdquo;
                        </p>
                        <footer class="text-sm">Sofia Davis</footer>
                    </blockquote>
                </div>
            </div>
        </div>

        <!-- Right Panel -->
        <div class="h-full w-full relative">
            <div class="flex flex-col justify-between h-full w-full">
                <!-- Header -->
                <div class="w-full flex justify-between lg:justify-end px-4 py-3 xl:px-6">
                    <NuxtLink class="uppercase font-semibold lg:hidden" to="/">Satari</NuxtLink>
                    <NuxtLink to="/auth/signup">
                        <UiButton variant="ghost">Register</UiButton>
                    </NuxtLink>
                </div>

                <!-- Login Form -->
                <form @submit.prevent="handleSubmit" class="mx-auto text-center space-y-4 w-80">
                    <h2 class="text-2xl">Login to Account</h2>
                    <p class="text-muted-foreground text-sm mt-2">Login with your username & password</p>
                    <div class="w-full space-y-1">
                        <UiInput autocomplete required class="w-full" v-model="username" type="text" placeholder="Username">
                        </UiInput>
                        <div class="flex gap-x-1">
                            <UiInput autocomplete class="w-full" required type="password" v-model="password"
                                placeholder="Password"></UiInput>
                            <UiPopover>
                                <UiPopoverTrigger as-child>
                                    <UiButton type="button" size="default" variant="outline">
                                        <InfoCircledIcon v-if="isPasswordValid"></InfoCircledIcon>
                                        <InfoCircledIcon v-else class="stroke-red-500"></InfoCircledIcon>
                                    </UiButton>
                                </UiPopoverTrigger>
                                <UiPopoverContent :align="'end'" class="w-fit">
                                    <p>
                                    <ul class="text-xs text-muted-foreground">
                                        <li>At least 8 characters</li>
                                        <li>At least one uppercase letter</li>
                                        <li>At least one lowercase letter</li>
                                        <li>At least one number</li>
                                        <li>Special characters are optional</li>
                                    </ul>
                                    </p>
                                </UiPopoverContent>
                            </UiPopover>
                        </div>
                    </div>
                    <UiButton type="submit" class="w-full" :disabled="isLoading">
                        <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                        Login to Account
                    </UiButton>
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <span class="w-full border-t" />
                        </div>
                        <div class="relative flex justify-center text-xs uppercase">
                            <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <UiButton class="w-full" variant="outline" type="button" :disabled="false">
                        <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                        <DiscordLogoIcon v-else class="mr-2 h-4 w-4" />
                        Discord
                    </UiButton>
                    <p class="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our
                        <NuxtLink to="/terms" class="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </NuxtLink>
                        and
                        <NuxtLink to="/privacy" class="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </NuxtLink>
                    </p>
                </form>
                <div></div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { DiscordLogoIcon, InfoCircledIcon } from '@radix-icons/vue';
import { Loader2 } from 'lucide-vue-next';
import { requestFetchCollectors } from '~/composables/request-fetch-collectors';
const isLoading = ref(false);
const authStore = useAuthStore();
const workspacesStore = useWorkspacesStore();
const password = ref('');
const username = ref('');
const isPasswordValid = ref(true);

const passwordRequirements = {
    minLength: 8,
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /\d/,
};

const handleSubmit = async () => {
    const router = useRouter();
    const route = useRoute();
    const userPassword = password.value;

    if (
        userPassword.length < passwordRequirements.minLength ||
        !passwordRequirements.hasUppercase.test(userPassword) ||
        !passwordRequirements.hasLowercase.test(userPassword) ||
        !passwordRequirements.hasNumber.test(userPassword)
    ) {
        isPasswordValid.value = false;
        console.error("Password must meet the specified requirements.");
        return;
    }

    isPasswordValid.value = true;
    isLoading.value = true;

    try {
        const res = await requestPostSignIn({
            password: password.value,
            username: username.value,
        });

        localStorage.setItem('token', res.token);
        const userRes = await requestFetchUserWithToken(res.token);
        authStore.updateUser(userRes);

        const token = localStorage.getItem('token');
        const workspacesResponse = await requestFetchUserWorkspaces({ token });
        const firstOwnerWorkspace = workspacesResponse.workspaces.find(({ role }) => role === 'Owner');
        workspacesStore.updateWorkspaces(workspacesResponse.workspaces);
        if (!firstOwnerWorkspace) {
            await router.push('/flow/create-workspace');
        } else {
            // User has an owner workspace

            // If a workspace is already selected, navigate to the appropriate route
            if (workspacesStore.selectedWorkspace) {
                if (
                    workspacesStore.workspaces.find(
                        ({ workspaceId }) => workspaceId === workspacesStore.selectedWorkspace.workspaceId
                    )
                ) {

                    const collectorsResponse = await requestFetchCollectors({
                        token: localStorage.getItem('token'),
                        workspaceId: workspacesStore.$state.selectedWorkspace.workspaceId
                    })

                    workspacesStore.updateCollectors(collectorsResponse.collectors)
                    // Check the first route path and navigate accordingly
                    const firstRoutePath = route.path.split("/")[1];
                    if (firstRoutePath === "app")
                        console.log("Navigating to the app route");
                    else await router.push("/app");
                } else {
                    // Select the owner workspace and navigate to the appropriate route
                    workspacesStore.selectWorkspace(firstOwnerWorkspace);

                    const collectorsResponse = await requestFetchCollectors({
                        token: localStorage.getItem('token'),
                        workspaceId: workspacesStore.$state.selectedWorkspace.workspaceId
                    })

                    workspacesStore.updateCollectors(collectorsResponse.collectors)
                    const firstRoutePath = route.path.split("/")[1];
                    if (firstRoutePath === "app")
                        console.log("Navigating to the app route");
                    else await router.push("/app");
                }
            } else {
                // Select the owner workspace and navigate to the appropriate route
                workspacesStore.selectWorkspace(firstOwnerWorkspace);

                const collectorsResponse = await requestFetchCollectors({
                    token: localStorage.getItem('token'),
                    workspaceId: workspacesStore.$state.selectedWorkspace.workspaceId
                })

                workspacesStore.updateCollectors(collectorsResponse.collectors)
                const firstRoutePath = route.path.split("/")[1];
                if (firstRoutePath === "app")
                    console.log("Navigating to the app route");
                else await router.push("/app");
            }
        }
    } catch (error) {
        console.error(error.message);
    }

    setTimeout(() => {
        isLoading.value = false;
        username.value = '';
        password.value = '';
    }, 2000);
};
</script>
  