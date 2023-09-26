<template>
    <div class="w-full min-h-screen bg-background">
        <h2>Home</h2>
        <div>
            <NuxtLink to="/about/settings">
                <UiButton size="default" variant="default">
                    <ZapOff></ZapOff>
                </UiButton>
            </NuxtLink>

        </div>

        <UiSelect>
            <UiSelectTrigger class="w-[180px]">
                <UiSelectValue placeholder="Select a fruit" />
            </UiSelectTrigger>
            <UiSelectContent>
                <UiSelectGroup>
                    <UiSelectLabel>Fruits</UiSelectLabel>
                    <UiUiSelectItem value="apple">
                        Apple
                    </UiUiSelectItem>
                    <UiSelectItem value="banana">
                        Banana
                    </UiSelectItem>
                    <UiSelectItem value="blueberry">
                        Blueberry
                    </UiSelectItem>
                    <UiSelectItem value="grapes">
                        Grapes
                    </UiSelectItem>
                    <UiSelectItem value="pineapple">
                        Pineapple
                    </UiSelectItem>
                </UiSelectGroup>
            </UiSelectContent>
        </UiSelect>
    </div>
</template>

<script setup>
import { ZapOff } from 'lucide-vue-next';

</script>
