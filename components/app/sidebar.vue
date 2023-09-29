<template>
    <div class="hidden lg:block w-64 min-w-[16rem] border-muted overflow-y-clip max-h-full h-full border-r-2">
        <div class="h-full w-full overflow-y-auto p-4 pt-10">
            <div class="w-full gap-y-6 flex flex-col">
                <h2 class="text-muted-foreground text-xs font-semibold">MENU</h2>
                <div class="w-full flex flex-col gap-y-0">
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
            </div>

            <div class="w-full gap-y-6 flex flex-col mt-10">
                <h2 class="text-muted-foreground text-xs font-semibold">RECENT WORKSPACES</h2>
                <div class="w-full flex flex-col gap-y-0">
                    <!-- Dashboard -->

                    <NuxtLink to="/app/" class="w-full">
                        <UiButton class="pl-0 w-full justify-between text-muted-foreground" variant="link">
                            <div class="gap-x-5 flex items-center">
                                <CircleIcon></CircleIcon>
                                Tesla
                            </div>

                            <CrownIcon class="h-4 w-4" />

                        </UiButton>
                    </NuxtLink>

                    <NuxtLink to="/app/" class="w-full">
                        <UiButton class="pl-0 w-full justify-between text-muted-foreground" variant="link">
                            <div class="gap-x-5 flex items-center">
                                <CircleIcon></CircleIcon>
                                Apple
                            </div>

                            <ShieldIcon class="h-4 w-4" />

                        </UiButton>
                    </NuxtLink>

                    <NuxtLink to="/app/" class="w-full">
                        <UiButton class="pl-0 w-full justify-between text-muted-foreground" variant="link">
                            <div class="gap-x-5 flex items-center">
                                <CircleIcon></CircleIcon>
                                Nvidia
                            </div>

                            <PersonIcon />

                        </UiButton>
                    </NuxtLink>


                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ActivityLogIcon, BarChartIcon, CalendarIcon, CardStackIcon, CircleIcon, CubeIcon, EnvelopeClosedIcon, HomeIcon, InfoCircledIcon, LightningBoltIcon, PersonIcon, RocketIcon } from '@radix-icons/vue';
import { ShieldIcon } from 'lucide-vue-next';
import { CrownIcon } from 'lucide-vue-next';
</script>

<style scoped>
a {
    opacity: 0.5;
}

.router-link-exact-active {
    opacity: 1;
}
</style>
