<script setup lang="ts">
import { ChevronDownIcon } from '@radix-icons/vue';

const props = defineProps(['collector'])


function copy(id: string) {
    navigator.clipboard.writeText(id)
}
</script>


<template>
    <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
            <UiButton size="sm" class="gap-x-2" variant="secondary">{{ $props.collector.allowedDomains.length }} <ChevronDownIcon>
                </ChevronDownIcon>
            </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent>
            <UiDropdownMenuLabel>Allowed Domains</UiDropdownMenuLabel>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem v-for="domain in $props.collector.allowedDomains">{{ domain }}</UiDropdownMenuItem>

        </UiDropdownMenuContent>
    </UiDropdownMenu></template>