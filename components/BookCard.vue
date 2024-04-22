<template>
    <UCard>
        <template #header>
            <Icon name="lucide:book-key" color="white" />
        </template>

        <h3 class="text-lg font-semibold">{{ book.name }}</h3>
        <template #footer>


            <ULink to="book.download_url" class="flex gap-2" active-class="text-primary" target="_blank"
                inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <Icon name="lucide:download" color="white" />

                Unduh
            </ULink>
        </template>

    </UCard>

</template>

<script setup>
defineProps({
    book: {
        type: Object,
        required: true,
    },
});
</script>