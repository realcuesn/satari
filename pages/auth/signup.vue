<template>
    <div class="w-full lg:grid h-screen lg:grid-cols-2">
        <div class="hidden lg:block h-full w-full relative">
            <img class="h-full w-full object-cover"
                src="https://images.pexels.com/photos/4754883/pexels-photo-4754883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="">
            <div class="absolute top-0 flex flex-col justify-between h-full w-full">
                <div class="w-full px-4 py-3 xl:px-6">
                    <NuxtLink class="uppercase font-semibold" to="/">Satari</NuxtLink>
                </div>

                <div class="w-full pl-4 pb-10 xl:pl-6 pr-[10%]">
                    <blockquote class="space-y-2">
                        <p class="text-lg">
                            &ldquo;This library has saved me countless hours of work and
                            helped me deliver stunning designs to my clients faster than
                            ever before.&rdquo;
                        </p>
                        <footer class="text-sm">
                            Sofia Davis
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>

        <div class=" h-full w-full relative">
            <div class="flex flex-col justify-between h-full w-full">
                <div class="w-full flex justify-between lg:justify-end px-4 py-3 xl:px-6">
                    <NuxtLink class="uppercase font-semibold lg:hidden" to="/">
                        Satari
                    </NuxtLink>

                    <NuxtLink to="/auth/login">
                        <UiButton variant="ghost">Login</UiButton>
                    </NuxtLink>
                </div>

                <form @submit.prevent="handleSubmit" class="mx-auto text-center space-y-4 w-80">
                    <h2 class="text-2xl">Create an account</h2>
                    <p class="text-muted-foreground text-sm mt-2">Create your account with email & password</p>
                    <div class=" w-full space-y-1">
                        <UiInput required class="w-full" v-model="username" type="text" placeholder="Username">
                        </UiInput>
                        <UiInput required class="w-full" v-model="email" type="email" placeholder="Email">
                        </UiInput>
                        <div class="flex gap-x-1">
                            <UiInput class="w-full" required type="password" v-model="password" placeholder="Password">
                            </UiInput>
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
                        Create an Account
                    </UiButton>
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <span class="w-full border-t" />
                        </div>
                        <div class="relative flex justify-center text-xs uppercase">
                            <span class="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
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
                        .
                    </p>


                </form>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DiscordLogoIcon, GithubLogoIcon, InfoCircledIcon, TwitterLogoIcon } from '@radix-icons/vue';
import { Loader2 } from 'lucide-vue-next';
import { requestFetchUserWithToken } from '~/composables/request-fetch-user-with-token';
const isLoading = ref(false);
const store = useAuthStore();
// Individual refs for email and password
const email = ref('');
const password = ref('');
const username = ref('');
const isPasswordValid = ref(true);
// Handle form submission
const passwordRequirements = {
    minLength: 8,
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /\d/,
    // Add more requirements for special characters if needed
};

// Handle form submission
const handleSubmit = async () => {
    // Access email.value and password.value for the form values
    const userPassword = password.value;
    const router = useRouter()

    // Validate the password
    if (
        userPassword.length < passwordRequirements.minLength ||
        !passwordRequirements.hasUppercase.test(userPassword) ||
        !passwordRequirements.hasLowercase.test(userPassword) ||
        !passwordRequirements.hasNumber.test(userPassword)
    ) {
        // Password doesn't meet the requirements
        isPasswordValid.value = false
        console.log("Password must meet the specified requirements.");
        return;
    }

    // Password meets the requirements, proceed with form submission
    isPasswordValid.value = true
    isLoading.value = true;

    try {
        const res = await requestPostSignUp({
            email: email.value,
            password: password.value,
            username: username.value,
        })
        console.log(res.message)
        localStorage.setItem('token', res.token)
        const userRes = await requestFetchUserWithToken(res.token);
        console.log(userRes)
        store.updateUser(userRes)
        router.push('/app/')
    } catch (error) {
        console.log(error.message)
    }

    // Simulate a submission (replace with your actual logic)
    setTimeout(() => {
        isLoading.value = false;
        // Reset the form values
        email.value = '';
        password.value = '';
    }, 2000); // Replace with your desired submission time
};
</script>
