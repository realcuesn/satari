<template>
    <div class="w-full p-3 lg:p-10 h-full overflow-y-auto">
        <div class="w-full max-w-7xl mx-auto overflow-y-auto">
            <FormHeader></FormHeader>
            <FormTest></FormTest>
            <div class="w-full h-fit mt-4">
                <UiAccordion type="single" class="w-full" collapsible>
                    <UiAccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
                        <UiAccordionTrigger>{{ item.title }}</UiAccordionTrigger>
                        <UiAccordionContent>
                            {{ item.content }}
                        </UiAccordionContent>
                    </UiAccordionItem>
                </UiAccordion>
            </div>


        </div>
    </div>
</template>

<script setup>
const accordionItems = [
    { value: 'item-1', title: 'What is a Forms Collector?', content: 'A Forms Collector is a tool designed to gather various forms from different sources and consolidate them into one location. It simplifies the process of collecting data from multiple channels and organizing it for further use.' },
    { value: 'item-2', title: 'Why use a Forms Collector?', content: 'Forms Collectors are essential for efficiently gathering data from diverse locations. They provide a structured platform for collecting forms, whether from websites, social media, or other sources, and ensure that the data is organized and accessible.' },
    { value: 'item-3', title: 'How to create one?', content: 'Creating a Forms Collector is straightforward. Simply configure the settings for the collector, including the sources from which it should gather forms and the data structure. Once configured, the Forms Collector will start collecting forms automatically.' },
    { value: 'item-4', title: 'Collector roles?', content: 'Forms Collector roles allow you to assign specific responsibilities and permissions to team members. Whether you need administrators, collectors, or viewers, roles help you maintain control and structure within your Forms Collector environment.' },
    { value: 'item-5', title: 'Can one organization have multiple Forms Collectors?', content: 'Yes, each organization can have multiple Forms Collectors. This enables different teams or departments within the organization to collect forms independently, and each Forms Collector can be customized to meet specific data collection needs.' },
    // Add more questions and answers as needed
];

</script>
