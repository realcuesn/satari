// store/auth.ts
import { defineStore } from 'pinia'

interface UserData {
    _id?: string | null;
    username?: string | null;
    email?: string | null;
    ipAddress?: string | null;
    createdAt?: string | null;
    userUID?: string | null;
    tokenVersion?: number | null;
    avatar?: string | null;
    mfa_enabled?: boolean | null;
    global_name?: string | null;
    verified?: boolean | null;
}

export const useAuthStore = defineStore('authStore', () => {
    const user = ref<UserData | null>(null); // Use UserData type for user property

    function updateUser(value: UserData | null) {
        user.value = value;
    }

    return { updateUser, user };
});
