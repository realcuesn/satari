<script setup lang="ts">
import { DotsHorizontalIcon } from '@radix-icons/vue'
import { requestPostDeleteCollector } from '~/composables/request-post-delete-collector';
const props = defineProps(['collector'])
const workspacesStore = useWorkspacesStore()

function copy(id: string) {
    navigator.clipboard.writeText(id)
}

const handleDelete = async () => {

    try {

        const res = await requestPostDeleteCollector({
            collectorId: props.collector.collectorId,
            token: localStorage.getItem('token')!,
            workspaceId: props.collector.workspaceId
        })
        const collectorsResponse = await requestFetchCollectors({
            token: localStorage.getItem('token')!,
            workspaceId: workspacesStore.$state.selectedWorkspace!.workspaceId
        })
        workspacesStore.updateCollectors(collectorsResponse.collectors)
    } catch (error: any) {
        console.log(error)
    }

}
</script>


<template>
    <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
            <UiButton variant="ghost" class="h-8 w-8 p-0">
                <span class="sr-only">Open menu</span>
                <DotsHorizontalIcon class="h-4 w-4" />
            </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="end">
            <UiDropdownMenuLabel>Actions</UiDropdownMenuLabel>
            <UiDropdownMenuItem @click="copy($props.collector.collectorId)">
                View Collector
            </UiDropdownMenuItem>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem @click="handleDelete"> Delete Collector
            </UiDropdownMenuItem>
        </UiDropdownMenuContent>
    </UiDropdownMenu>
</template>