<template>
    <div class="w-full flex items-center justify-between pl-2 pr-4 border-muted border-b-2 py-3 xl:pr-6">
        <div class="flex items-center gap-x-3">
            <!--  <h1 class="uppercase font-semibold">Satari</h1> -->
            <AppHeaderChooseWorkspace></AppHeaderChooseWorkspace>
            <UiButton @click="sideBarState = !sideBarState" size="icon" class="hidden lg:flex" variant="ghost">
                <PanelLeft :class="{ '-rotate-180': sideBarState }" class="h-4 transition-transform duration-500">
                </PanelLeft>
            </UiButton>
            <AppSidebarSheet></AppSidebarSheet>
        </div>

        <div class="flex items-center gap-x-3">

            <UiButton v-if="colorMode.preference == 'dark'" @click="colorMode.preference = 'light'" size="icon"
                variant="ghost">
                <SunIcon></SunIcon>
            </UiButton>
            <UiButton v-else @click="colorMode.preference = 'dark'" size="icon" variant="ghost">
                <MoonIcon></MoonIcon>
            </UiButton>

            <AppHeaderUser></AppHeaderUser>

        </div>
    </div>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon } from '@radix-icons/vue';
import { PanelLeft } from 'lucide-vue-next';

const colorMode = useColorMode()
const store = useAuthStore()
const sideBarState = useState('sidebar')

</script>
