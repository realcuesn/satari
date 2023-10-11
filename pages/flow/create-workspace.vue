<template>
    <div class="w-full min-h-screen flex items-center justify-center p-4">
        <UiCard class="w-full max-w-6xl">
            <UiCardHeader>
                <UiCardTitle>Create Workspace</UiCardTitle>
                <UiCardDescription>Empower each company with a dedicated workspace for managing, analyzing, and efficient
                    communication.</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="w-full">
                <form @submit.prevent="handleSubmit" class="grid w-full items-center gap-4">
                    <div class="flex flex-col space-y-1.5">
                        <UiLabel for="name">Name</UiLabel>
                        <UiInput required id="name" v-model="formName" placeholder="Name of your Workspace" />
                    </div>
                    <div class="grid w-full gap-1.5">
                        <UiLabel for="message-2">Workspace Description</UiLabel>
                        <UiTextarea rows="5" v-model="description" placeholder="Type your Description here."
                            id="message-2" />
                        <p class="text-sm text-muted-foreground flex gap-x-2 items-center mt-2">
                            <InfoCircledIcon></InfoCircledIcon> You can always change this later.
                        </p>
                        <UiButton class="sm:w-fit lg:block sm:ml-auto mt-2" type="submit">Create Workspace</UiButton>
                    </div>
                </form>
            </UiCardContent>
            <UiCardFooter>
                <UiAccordion type="single" class="w-full" collapsible>
                    <UiAccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
                        <UiAccordionTrigger>{{ item.title }}</UiAccordionTrigger>
                        <UiAccordionContent>
                            {{ item.content }}
                        </UiAccordionContent>
                    </UiAccordionItem>
                </UiAccordion>
            </UiCardFooter>
        </UiCard>
    </div>
</template>



<script setup>
import { InfoCircledIcon } from '@radix-icons/vue';
//request import
const formName = ref('');
const description = ref('');
const workspacesStore = useWorkspacesStore()
const router = useRouter()
const accordionItems = [
    { value: 'item-1', title: 'What is a workspace?', content: 'A workspace is a digital environment that centralizes team collaboration, task management, and project organization. It simplifies your workflow and enhances productivity.' },
    { value: 'item-2', title: 'Why use a workspace?', content: 'Workspaces are essential for optimizing teamwork and streamlining organizational tasks. They provide a structured platform for managing projects efficiently, boosting team collaboration, and maintaining clear communication.' },
    { value: 'item-3', title: 'How to create one?', content: 'Creating your first workspace is easy. Simply fill out the required details and click "Create Workspace." You can always create additional workspaces from your dashboard to organize different projects or teams.' },
    { value: 'item-4', title: 'Workspace roles?', content: 'Workspace roles allow you to assign specific responsibilities and permissions to team members. Whether you need administrators, members, or guests, roles help you maintain control and structure within your workspace.' },
    { value: 'item-5', title: 'Each organization has one?', content: 'Yes, each organization can have its dedicated workspace. This ensures that different organizations or business units can manage their projects independently within their own workspace environments.' },
    // Add more questions and answers as needed
];

const handleSubmit = async () => {
    // Check if the 'name' field is empty
    if (formName.value.trim() === '') {
        // You can display an error message to the user or prevent form submission
        console.error('Workspace name cannot be empty.');
        return;
    }

    try {
        const response = await requestPostCreateWorkspace({
            token: localStorage.getItem('token'), // Replace with your authentication token
            workspaceName: formName.value,
            workspaceDescription: description.value,
        });

        // Handle success, you can show a success message or redirect to the created workspace
        console.log('Workspace created successfully:', response.message);
        // Optionally, you can redirect to the created workspace page or show a success message to the user.
        // Fetch user workspaces using the token
        const token = localStorage.getItem('token')
        const workspacesResponse = await requestFetchUserWorkspaces({
            token
        })
        console.log(workspacesResponse.workspaces)
        // Update the workspaces in the store
        workspacesStore.updateWorkspaces(workspacesResponse.workspaces)
        const firstOwnerWorkspace = workspacesResponse.workspaces.find(({ role }) => role === 'Owner');
        // Select the owner workspace and navigate to the appropriate route
        workspacesStore.selectWorkspace(firstOwnerWorkspace);
        await router.push('/app')
    } catch (error) {
        // Handle error, you can display an error message to the user or log the error
        console.error('Error creating workspace:', error.message);
        // Optionally, you can show an error message to the user or perform other error handling actions.
    }
};
</script>
