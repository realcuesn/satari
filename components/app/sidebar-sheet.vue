<template>
    <UiSheet>
        <UiSheetTrigger as-child>
            <UiButton size="icon" variant="ghost">
                <PanelLeft class="h-4 lg:hidden">
                </PanelLeft>
            </UiButton>
        </UiSheetTrigger>
        <UiSheetContent side="left">
            <UiSheetHeader class="w-full text-left">
                <h2 class="text-muted-foreground text-xs font-semibold">MENU</h2>
            </UiSheetHeader>
            <UiSheetDescription>
                <div class="w-full flex flex-col gap-y-0 pt-6">
                    <!-- Dashboard -->
                    <NuxtLink to="/app/" class="w-full">
                        <UiButton class="pl-0 gap-x-5" variant="link">
                            <HomeIcon></HomeIcon>
                            Dashboard
                        </UiButton>
                    </NuxtLink>

                    <!-- Team Management -->
                    <NuxtLink to="/app/team" class="w-full">
                        <UiButton class="pl-0 gap-x-5" variant="link">
                            <RocketIcon></RocketIcon>
                            Team
                        </UiButton>
                    </NuxtLink>

                    <!-- Leads and Clients -->
                    <NuxtLink to="/app/leads" class="w-full">
                        <UiButton class="pl-0 gap-x-5" variant="link">
                            <CardStackIcon></CardStackIcon>
                            Leads
                        </UiButton>
                    </NuxtLink>

                    <!-- Contacts -->
                    <NuxtLink to="/app/contacts" class="w-full">
                        <UiButton class="pl-0 gap-x-5" variant="link">
                            <PersonIcon></PersonIcon>
                            Contacts
                        </UiButton>
                    </NuxtLink>

                    <!-- Appointments -->
                    <NuxtLink to="/app/appointments" class="w-full">
                        <UiButton class="pl-0 gap-x-5" variant="link">
                            <CalendarIcon></CalendarIcon>
                            Appointments
                        </UiButton>
                    </NuxtLink>

                    <!-- Forms -->
                    <NuxtLink to="/app/forms" class="w-full">
                        <UiButton class="pl-0 gap-x-5" variant="link">
                            <CubeIcon></CubeIcon>
                            Forms
                        </UiButton>
                    </NuxtLink>

                    <!-- Tasks -->
                    <NuxtLink to="/app/tasks" class="w-full">
                        <UiButton class="pl-0 gap-x-5" variant="link">
                            <LightningBoltIcon></LightningBoltIcon>
                            Tasks
                        </UiButton>
                    </NuxtLink>

                    <!-- Analytics -->
                    <NuxtLink to="/app/analytics" class="w-full">
                        <UiButton class="pl-0 gap-x-5" variant="link">
                            <BarChartIcon></BarChartIcon>
                            Analytics
                        </UiButton>
                    </NuxtLink>

                    <!-- Tracking -->
                    <NuxtLink to="/app/tracking" class="w-full">
                        <UiButton class="pl-0 gap-x-5" variant="link">
                            <ActivityLogIcon></ActivityLogIcon>
                            Tracking
                        </UiButton>
                    </NuxtLink>

                    <!-- Newsletter -->
                    <NuxtLink to="/app/newsletter" class="w-full">
                        <UiButton class="pl-0 gap-x-5" variant="link">
                            <EnvelopeClosedIcon></EnvelopeClosedIcon>
                            Newsletter
                        </UiButton>
                    </NuxtLink>

                    <!-- Team Updates -->
                    <NuxtLink to="/app/team-updates" class="w-full">
                        <UiButton class="pl-0 gap-x-5" variant="link">
                            <InfoCircledIcon></InfoCircledIcon>
                            Team Updates
                        </UiButton>
                    </NuxtLink>
                </div>
            </UiSheetDescription>
        </UiSheetContent>
    </UiSheet>
</template>

<script setup>
import { PanelLeft } from 'lucide-vue-next';
import { ActivityLogIcon, BarChartIcon, CalendarIcon, CardStackIcon, CircleIcon, CubeIcon, EnvelopeClosedIcon, HomeIcon, InfoCircledIcon, LightningBoltIcon, PersonIcon, RocketIcon } from '@radix-icons/vue';

</script>


<style scoped>
a {
    opacity: 0.5;
}

.router-link-exact-active {
    opacity: 1;
}
</style>
