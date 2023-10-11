<template>
    <UiDialog>
        <UiDialogTrigger as-child>
            <UiButton variant="default" size="icon">
                <FilePlusIcon></FilePlusIcon>
            </UiButton>
        </UiDialogTrigger>
        <UiDialogContent class="sm:max-w-[425px] max-h-full h-fit overflow-x-clip" @escape-key-down.prevent>
            <div class="w-full h-fit max-h-full overflow-y-auto p-5">
                <UiDialogHeader class="py-2">
                    <UiDialogTitle>Create Data Collector</UiDialogTitle>
                    <UiDialogDescription>
                        Customize your data collector by adding form fields
                    </UiDialogDescription>
                    <UiLabel class="text-left"> Form Name </UiLabel>
                    <UiInput v-model="formName" placeholder="Form Name"></UiInput>

                    <UiLabel class="text-left"> Allowed Domains </UiLabel>
                    <div class="w-full flex gap-x-2">
                        <UiInput v-model="newDomainInput" placeholder="example.com"></UiInput>
                        <UiButton @click="handleAddDomain" variant="outline">
                            <PlusCircledIcon> </PlusCircledIcon>
                        </UiButton>
                    </div>

                    <div class="w-full flex items-center gap-x-2 overflow-x-auto">
                        <UiBadge variant="secondary" v-for="domain in allowedDomains" :key="domain">
                            {{ domain }}
                        </UiBadge>
                    </div>
                    <UiLabel class="text-left"> Form Fields </UiLabel>
                </UiDialogHeader>
                <div class="h-fit w-full overflow-clip">
                    <div class="flex flex-col gap-y-4 w-full h-fit max-h-60 min-h-[5rem] overflow-y-auto">
                        <!-- Iterate through the fields array and generate input fields -->
                        <div v-for="(field, index) in formFields" :key="index" class="flex gap-x-3 items-center">
                            <UiInput :id="field.name" v-model="field.name" :placeholder="field.name" class="" />
                            <UiSelect class="w-full">
                                <UiSelectTrigger>
                                    <UiSelectValue v-model="field.type" :placeholder="field.type" />
                                </UiSelectTrigger>
                                <UiSelectContent>
                                    <UiSelectGroup>
                                        <UiSelectItem value="string">String</UiSelectItem>
                                        <UiSelectItem value="number">Number</UiSelectItem>
                                        <UiSelectItem value="array">Array</UiSelectItem>
                                    </UiSelectGroup>
                                </UiSelectContent>
                            </UiSelect>

                            <UiButton @click="removeField(index)" size="sm" variant="secondary">
                                <TrashIcon></TrashIcon>
                            </UiButton>
                        </div>
                    </div>
                </div>

                <UiDialogFooter>
                    <UiButton @click="handleReset" variant="outline" type="submit">
                        Reset
                    </UiButton>
                    <UiButton @click="handleCreateNewField" variant="secondary" type="submit">
                        Add Field
                    </UiButton>

                    <UiButton @click="handleSubmit" type="submit">
                        Save changes
                    </UiButton>
                </UiDialogFooter>
            </div>
        </UiDialogContent>
    </UiDialog>
</template>

<script setup>
import { FilePlusIcon, TrashIcon, PlusCircledIcon } from "@radix-icons/vue";
const workspacesStore = useWorkspacesStore();
const formName = ref("");
const allowedDomains = ref([]);
const newDomainInput = ref("");
const formFields = ref([
    {
        name: "example",
        type: "string",
    },

]);

const handleReset = () => {

}

const handleAddDomain = () => {
    // Check if the domainInput is not empty
    const newDomain = newDomainInput.value.trim();

    // Define a regular expression to validate the domain format
    const domainFormatRegex = /^(https?:\/\/)?(([\w-]+\.)*[\w-]+)(:\d+)?(\/\S*)?$/i;



    if (
        newDomain &&
        !allowedDomains.value.includes(newDomain) &&
        domainFormatRegex.test(newDomain)
    ) {
        allowedDomains.value.push(newDomain);
        newDomainInput.value = ""; // Clear the input field
    } else {
        // Display an error message or provide feedback to the user
        // For example, you can set an error message:
        // errorMessage.value = "Invalid domain format or duplicate domain.";
    }
};

const handleSubmit = async () => {
    try {
        // Validate form fields before submitting
        if (!formName.value.trim()) {
            throw new Error("Form name is required");
        }

        if (allowedDomains.value.length === 0) {
            throw new Error("At least one allowed domain is required");
        }

        // Call your createCollector function to submit the data
        const collectorResponse = await requestPostCreateCollector({
            token: localStorage.getItem("token"),
            collectorData: {
                workspaceId: workspacesStore.$state.selectedWorkspace.workspaceId,
                sourceType: "Website",
                name: formName.value,
                allowedDomains: allowedDomains.value,
                formStructure: {
                    fields: formFields.value,
                },
            },
        });
        const collectorsResponse = await requestFetchCollectors({
            token: localStorage.getItem('token'),
            workspaceId: workspacesStore.$state.selectedWorkspace.workspaceId
        })

        workspacesStore.updateCollectors(collectorsResponse.collectors)
        // Handle the response (collectorResponse) as needed
        console.log("Collector created successfully:", collectorResponse);

        // Optionally, reset the form fields after successful submission
        formName.value = "";
        allowedDomains.value = [];
        formFields.value = [];


        // Close the dialog or perform other actions
    } catch (error) {
        console.error("Error during form submission:", error);

        // Handle specific errors and provide appropriate error messages to the user
        // For example, you can set an errorMessage ref to display the error message in your template
        // errorMessage.value = error.message;
    }
};


const handleCreateNewField = () => {
    // Create a new field object with default values
    const newField = {
        name: "New Field",
        type: "string",
        value: "",
    };

    // Add the new field to the fields array
    formFields.value.push(newField);
};

const removeField = (index) => {
    // Remove the field at the specified index
    formFields.value.splice(index, 1);
};
</script>
