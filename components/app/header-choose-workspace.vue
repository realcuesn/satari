<template>
    <UiPopover v-model:open="open">
        <UiPopoverTrigger as-child>
            <UiButton variant="outline" role="combobox" :aria-expanded="open" class="w-[200px] justify-between">
                <div class="w-full truncate">
                    {{ value ? value.name : 'Select Workspace...' }}
                </div>
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="max-w-[450px] p-0">
            <UiCommand v-model="value" :filter-function="filterFunction">
                <UiCommandInput placeholder="Search Workspace..." />
                <UiCommandEmpty>No Workspace Found.</UiCommandEmpty>

                <UiCommandGroup heading="Owned">
                    <UiCommandItem v-for="workspace in ownedWorkspaces" :key="workspace.id" :value="workspace"
                        @select="open = false">
                        <Check class="mr-2 h-4 w-4 opacity-0" :class="{ 'opacity-100': value?.id === workspace.id }" />
                        {{ workspace.name }}
                        <CrownIcon class="ml-auto h-4 w-4"></CrownIcon>
                    </UiCommandItem>
                </UiCommandGroup>

                <UiCommandSeparator></UiCommandSeparator>

                <UiCommandGroup heading="Managing">
                    <UiCommandItem v-for="workspace in managingWorkspaces" :key="workspace.id" :value="workspace"
                        @select="open = false">
                        <Check class="mr-2 h-4 w-4 opacity-0" :class="{ 'opacity-100': value?.id === workspace.id }" />
                        {{ workspace.name }}

                        <ShieldIcon class="ml-auto h-4 w-4"></ShieldIcon>
                    </UiCommandItem>
                </UiCommandGroup>

                <UiCommandSeparator></UiCommandSeparator>

                <UiCommandGroup heading="Member">
                    <UiCommandItem v-for="workspace in memberWorkspaces" :key="workspace.id" :value="workspace"
                        @select="open = false">
                        <Check class="mr-2 h-4 w-4 opacity-0" :class="{ 'opacity-100': value?.id === workspace.id }" />
                        {{ workspace.name }}
                        <PersonIcon class="ml-auto h-4 w-4"></PersonIcon>
                    </UiCommandItem>
                </UiCommandGroup>
            </UiCommand>
        </UiPopoverContent>
    </UiPopover>
</template>
  
<script setup>
import { PersonIcon } from '@radix-icons/vue';
import { CrownIcon } from 'lucide-vue-next';
import { ShieldIcon } from 'lucide-vue-next';
import { Check } from 'lucide-vue-next';
import { ChevronsUpDown } from 'lucide-vue-next';

const ownedWorkspaces = [
    { id: 1, name: 'Workspace 1 (Owned)' },
    { id: 2, name: 'Workspace 2 (Owned)' },
];

const managingWorkspaces = [
    { id: 3, name: 'Workspace 3 (Managing)' },
    { id: 4, name: 'Workspace 4 (Managing)' },
];

const memberWorkspaces = [
    { id: 5, name: 'Workspace 5 (Member)' },
    { id: 6, name: 'Workspace 6 (Member)' },
];

const open = ref(false);
const value = ref();

const filterFunction = (list, search) => list.filter(workspace => workspace.name.toLowerCase().includes(search.toLowerCase()));
</script>
  