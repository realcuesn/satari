<template>
    <div class="w-full flex items-center justify-between px-4 border-primary-foreground border-b py-3 xl:px-6">
        <div class="flex items-center gap-x-3">
            <h1 class="uppercase font-semibold">Satari</h1>

            <!--   <UiNavigationMenu>
                <UINavigationMenuList>
                    <UiNavigationMenuItem>
                        <UiNavigationMenuTrigger>Item One</UiNavigationMenuTrigger>
                        <UiNavigationMenuContent>
                            <UiNavigationMenuLink>Link</UiNavigationMenuLink>
                        </UiNavigationMenuContent>
                    </UiNavigationMenuItem>
                </UINavigationMenuList>
            </UiNavigationMenu>
 -->

        </div>

        <div class="flex items-center gap-x-3">
            <div>
                <UiButton v-if="colorMode.preference == 'dark'" @click="colorMode.preference = 'light'" size="icon"
                    variant="ghost">
                    <SunIcon></SunIcon>
                </UiButton>
                <UiButton v-else @click="colorMode.preference = 'dark'" size="icon" variant="ghost">
                    <MoonIcon></MoonIcon>
                </UiButton>
            </div>

            <div v-if="store.$state.user">
                <NuxtLink to="/app/">
                    <UiButton class="gap-x-1" variant="default">
                        <!--  <LightningBoltIcon></LightningBoltIcon> -->Dashboard
                    </UiButton>
                </NuxtLink>
            </div>
            <div v-else class="flex items-center gap-x-3">
                <NuxtLink to="/auth/login">
                    <UiButton variant="outline">Login</UiButton>
                </NuxtLink>
                <NuxtLink to="/auth/signup">
                    <UiButton variant="default">Signup</UiButton>
                </NuxtLink>
            </div>



        </div>
    </div>
</template>

<script setup lang="ts">
import { LightningBoltIcon, MoonIcon, SunIcon } from '@radix-icons/vue';

const colorMode = useColorMode()
const store = useAuthStore()

</script>
