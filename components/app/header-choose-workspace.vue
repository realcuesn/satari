<template>
    <UiPopover v-model:open="open">
        <UiPopoverTrigger as-child>
            <UiButton variant="outline" role="combobox" :aria-expanded="open" class="w-[200px] gap-x-2 justify-between">
                <UiAvatar v-if="value && value.title" class="block h-6 w-6">
                    <UiAvatarImage :src="`https://api.dicebear.com/7.x/identicon/svg?seed=${value.title}`" />
                    <UiAvatarFallback class="h-full w-full grid place-content-center">CN</UiAvatarFallback>
                </UiAvatar>
                <UiAvatar v-else class="block h-6 w-6">
                    <UiAvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                    <UiAvatarFallback class="h-full w-full grid place-content-center">?</UiAvatarFallback>
                </UiAvatar>
                <div class="w-full truncate">
                    {{ value ? value.title : "Select Workspace..." }}
                </div>
                <ChevronsUpDown class="ml-2 h-3 w-3 shrink-0 opacity-50" />
            </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="max-w-[450px] p-0">
            <UiCommand v-model="value" :filter-function="filterFunction">
                <UiCommandInput placeholder="Search Workspace..." />
                <UiCommandEmpty>No Workspace Found.</UiCommandEmpty>

                <UiCommandGroup heading="Owned">
                    <UiCommandItem v-for="workspace in ownedWorkspaces" :key="workspace.workspaceId" :value="workspace"
                        @select="open = false">
                        <UiAvatar class="block h-6 w-6">
                            <UiAvatarImage :src="`https://api.dicebear.com/7.x/identicon/svg?seed=${workspace.title}`" />
                            <UiAvatarFallback class="h-full w-full grid place-content-center">CN</UiAvatarFallback>
                        </UiAvatar>
                        <Check class="mx-2 h-4 w-4 opacity-0"
                            :class="{ 'opacity-100': value?.workspaceId === workspace.workspaceId }" />
                        <div class="w-full truncate">
                            {{ workspace.title }}
                        </div>
                        <CrownIcon class="ml-auto h-4 w-4"></CrownIcon>
                    </UiCommandItem>
                </UiCommandGroup>

                <UiCommandSeparator></UiCommandSeparator>

                <UiCommandGroup heading="Managing">
                    <UiCommandItem v-for="workspace in managingWorkspaces" :key="workspace.workspaceId" :value="workspace"
                        @select="open = false">
                        <UiAvatar class="block h-6 w-6">
                            <UiAvatarImage :src="`https://api.dicebear.com/7.x/identicon/svg?seed=${workspace.title}`" />
                            <UiAvatarFallback class="h-full w-full grid place-content-center">CN</UiAvatarFallback>
                        </UiAvatar>
                        <Check class="mx-2 h-4 w-4 opacity-0"
                            :class="{ 'opacity-100': value?.workspaceId === workspace.workspaceId }" />
                        <div class="w-full truncate">
                            {{ workspace.title }}
                        </div>
                        <ShieldIcon class="ml-auto h-4 w-4"></ShieldIcon>
                    </UiCommandItem>
                </UiCommandGroup>

                <UiCommandSeparator></UiCommandSeparator>

                <UiCommandGroup heading="Member">
                    <UiCommandItem v-for="workspace in memberWorkspaces" :key="workspace.workspaceId" :value="workspace"
                        @select="open = false">
                        <UiAvatar class="block h-6 w-6">
                            <UiAvatarImage :src="`https://api.dicebear.com/7.x/identicon/svg?seed=${workspace.title}`" />
                            <UiAvatarFallback class="h-full w-full grid place-content-center">CN</UiAvatarFallback>
                        </UiAvatar>
                        <Check class="mx-2 h-4 w-4 opacity-0"
                            :class="{ 'opacity-100': value?.workspaceId === workspace.workspaceId }" />
                        <div class="w-full truncate">
                            {{ workspace.title }}
                        </div>
                        <PersonIcon class="ml-auto h-4 w-4"></PersonIcon>
                    </UiCommandItem>
                </UiCommandGroup>
            </UiCommand>
        </UiPopoverContent>
    </UiPopover>
</template>
  
<script setup>
import { PersonIcon } from "@radix-icons/vue";
import { CrownIcon } from "lucide-vue-next";
import { ShieldIcon } from "lucide-vue-next";
import { Check } from "lucide-vue-next";
import { ChevronsUpDown } from "lucide-vue-next";

const workspacesStore = useWorkspacesStore();

const open = ref(false);
const value = ref();
const ownedWorkspaces = workspacesStore.workspaces.filter(workspace => workspace.role === 'Owner');
const managingWorkspaces = workspacesStore.workspaces.filter(workspace => workspace.role === 'Manager');
const memberWorkspaces = workspacesStore.workspaces.filter(workspace => workspace.role === 'Member');

watch(() => value.value, async () => {
    workspacesStore.selectWorkspace(value.value);
    const collectorsResponse = await requestFetchCollectors({
        token: localStorage.getItem('token'),
        workspaceId: workspacesStore.$state.selectedWorkspace.workspaceId
    })
    workspacesStore.updateCollectors(collectorsResponse.collectors)
})

onMounted(() => {
    console.log(workspacesStore.workspaces)
    value.value = workspacesStore.selectedWorkspace
})
const filterFunction = (list, search) =>
    list.filter((workspace) =>
        workspace.title.toLowerCase().includes(search.toLowerCase())
    );
</script>
  