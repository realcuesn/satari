<template>
    <div class="w-full flex flex-col h-screen max-h-screen">
        <AppHeader></AppHeader>
        <div class="w-full h-[calc(100vh-66px)] flex overflow-clip" v-auto-animate>
            <AppSidebar v-if="sideBarState"></AppSidebar>
            <div class="h-full w-full overflow-y-auto">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { InfoCircledIcon } from '@radix-icons/vue';
//uiState
const sideBarState = useState('sidebar')

</script>
