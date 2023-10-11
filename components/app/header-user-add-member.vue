<template>
    <UiAlertDialog>
        <UiAlertDialogTrigger class="w-full">
            <UiButton class="w-full px-2" variant="ghost">
                <Plus class="mr-2 h-4 w-4" />
                <span>Add New Member</span>
                <UiDropdownMenuShortcut>⌘+T</UiDropdownMenuShortcut>
            </UiButton>
        </UiAlertDialogTrigger>
        <UiAlertDialogContent class="w-[calc(100%-16px)] mx-auto rounded-md">
            <UiAlertDialogHeader>
                <UiAlertDialogTitle>Manage Team Members</UiAlertDialogTitle>
                <UiAlertDialogDescription>
                    You can add or remove team members and managers here.
                </UiAlertDialogDescription>
            </UiAlertDialogHeader>
            <UiTabs default-value="manager" v-model="selectedType" class="w-full">
                <UiTabsList class="grid w-full grid-cols-2">
                    <UiTabsTrigger value="manager">Manager</UiTabsTrigger>
                    <UiTabsTrigger value="member">Member</UiTabsTrigger>
                </UiTabsList>

                <UiTabsContent value="manager">
                    <UiCardHeader class="px-0 !text-left">
                        <UiCardTitle>Add a Manager</UiCardTitle>
                        <UiCardDescription>
                            Enter the username of the workspace manager.
                        </UiCardDescription>
                    </UiCardHeader>
                    <UiCardContent class="space-y-2 px-0">
                        <div class="space-y-1">
                            <UiLabel for="manager-username">Username</UiLabel>
                            <!-- Use v-model to bind username to the input value -->
                            <UiInput id="manager-username" v-model="username" />
                        </div>
                    </UiCardContent>
                </UiTabsContent>

                <UiTabsContent value="member">
                    <UiCardHeader class="px-0">
                        <UiCardTitle>Add a Member</UiCardTitle>
                        <UiCardDescription>
                            Enter the username of a workspace member.
                        </UiCardDescription>
                    </UiCardHeader>
                    <UiCardContent class="gap-y-2 px-0">
                        <div class="space-y-1">
                            <UiLabel for="member-username">Username</UiLabel>
                            <!-- Use v-model to bind username to the input value -->
                            <UiInput id="member-username" v-model="username" />
                        </div>
                    </UiCardContent>
                </UiTabsContent>
                <UiAlertDialogFooter class="grid grid-cols-2 gap-x-2">
                    <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
                    <UiAlertDialogAction @click="handleSubmit" v-show="username.length > 2">Add</UiAlertDialogAction>
                </UiAlertDialogFooter>
            </UiTabs>

        </UiAlertDialogContent>
    </UiAlertDialog>
</template>

<script setup>
import { Plus } from "lucide-vue-next";

const selectedType = ref("manager"); // Initialize with a default value
const username = ref("");
const workspacesStore = useWorkspacesStore();

const handleSubmit = async () => {
    try {
        const token = localStorage.getItem("token");
        const workspaceId = workspacesStore.selectedWorkspace.workspaceId;

        if (!token) {
            throw new Error("Token not found in local storage");
        }

        if (selectedType.value === "manager") {

            // Prepare the data to be sent in the request for adding a manager
            const addManagerData = {
                token,
                workspaceId,
                managerUsername: username.value,
            };

            // Make the API request to add a manager
            const managerResponse = await requestPostAddManagerToWorkspace(addManagerData);

            username.value = ""

            workspacesStore.selectWorkspace(managerResponse.workspace)
        } else if (selectedType.value === "member") {

            // Prepare the data to be sent in the request for adding a member
            const addMemberData = {
                token,
                workspaceId,
                memberUsername: username.value,
            };

            // Make the API request to add a member
            const memberResponse = await requestPostAddMemberToWorkspace(addMemberData);

            // Check the response status and handle accordingly
            if (memberResponse.message === "Success") {
                // Member successfully added, you can handle success here
                console.log("Member added successfully.");

                // Clear the input field after successful addition
                username.value = "";

                // Close the dialog or perform other actions as needed
                // You can use this to close the dialog:
                // workspacesStore.closeAddMemberDialog();
            } else {
                // Handle any potential error scenarios for adding a member here
                console.error("Error adding member:", memberResponse.message);
            }
        } else {
            throw new Error("Invalid type selected");
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
};
</script>


