<template>
    <div>
        <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
                <UiAvatar class="block h-6 w-6 cursor-pointer">
                    <UiAvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                    <UiAvatarFallback class="h-full w-full grid place-content-center">CN</UiAvatarFallback>
                </UiAvatar>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent :align="'end'" class="w-56">
                <UiDropdownMenuLabel>My Account</UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuGroup>
                    <UiDropdownMenuItem>
                        <User class="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <UiDropdownMenuShortcut>⇧⌘P</UiDropdownMenuShortcut>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <CreditCard class="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <UiDropdownMenuShortcut>⌘B</UiDropdownMenuShortcut>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <Settings class="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <UiDropdownMenuShortcut>⌘S</UiDropdownMenuShortcut>
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                        <Keyboard class="mr-2 h-4 w-4" />
                        <span>Keyboard shortcuts</span>
                        <UiDropdownMenuShortcut>⌘K</UiDropdownMenuShortcut>
                    </UiDropdownMenuItem>
                </UiDropdownMenuGroup>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuGroup>
                    <NuxtLink to="/app/team">
                        <UiDropdownMenuItem>
                            <Users class="mr-2 h-4 w-4" />
                            <span>Team</span>
                        </UiDropdownMenuItem>
                    </NuxtLink>

                    <AppHeaderUserAddMember></AppHeaderUserAddMember>
                </UiDropdownMenuGroup>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem>
                    <Github class="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                </UiDropdownMenuItem>
                <UiDropdownMenuItem>
                    <LifeBuoy class="mr-2 h-4 w-4" />
                    <span>Support</span>
                </UiDropdownMenuItem>
                <UiDropdownMenuItem disabled>
                    <Cloud class="mr-2 h-4 w-4" />
                    <span>API</span>
                </UiDropdownMenuItem>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem @click="handleLogout">
                    <LogOut class="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <UiDropdownMenuShortcut>⇧⌘Q</UiDropdownMenuShortcut>
                </UiDropdownMenuItem>
            </UiDropdownMenuContent>
        </UiDropdownMenu>
    </div>
</template>

<script setup lang="ts">
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Plus,
    Settings,
    User,
    Users,
} from "lucide-vue-next";
const authStore = useAuthStore();
const workspacesStore = useWorkspacesStore();
const handleLogout = async () => {
    const router = useRouter();
    localStorage.removeItem("token");
    localStorage.removeItem("selectedWorkspace");
    authStore.updateUser(null);
    authStore.updateUser(null);
    workspacesStore.selectWorkspace(null);
    await router.push("/auth/login");
};
</script>
