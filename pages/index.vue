<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-semibold mb-4">Pencarian Buku</h1>
        <SearchForm @search="searchBooks" />
        <div v-if="searchResults.length > 0" class="mt-8">
            <h2 class="text-xl font-semibold mb-4">Hasil Pencarian</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <BookCard v-for="book in searchResults" :key="book.file_id" :book="book" />
            </div>
        </div>
        <div v-else-if="searchQuery" class="mt-8">
            <p class="text-gray-500">Tidak ada hasil pencarian untuk "{{ searchQuery }}".</p>
        </div>
    </div>
</template>

<script setup>
defineOgImageComponent('NuxtSeo', {
theme: '#4285F4',
colorMode: 'light',
title: 'Referensi Kutub Mahzab Syafii dan Hanbali',
description: 'Akses file Google Drive dengan cepat menggunakan aplikasi ini',
siteName: 'Referensi Kutub Mahzab Syafii dan Hanbali',
});
useSeoMeta({
title: 'Referensi Kutub Mahzab Syafii dan Hanbalir',
ogTitle: 'Akses File Google Drive dengan Cepat',
description: 'Aplikasi Referensi Kutub Mahzab Syafii dan Hanbali memungkinkan Anda mengakses file di Google Drive dengan cepat menggunakan API Cloudflare Workers. Tidak perlu lagi menunggu lama saat membuka Google Drive yang lambat.',
ogDescription: 'Dengan Referensi Kutub Mahzab Syafii dan Hanbali, Anda dapat dengan mudah menelusuri dan menemukan file yang Anda butuhkan di Google Drive tanpa harus membuka langsung Google Drive yang lambat.',
});
useHead({
title: 'Referensi Kutub Mahzab Syafii dan Hanbalir',
meta: [
{
name: 'description',
content: 'Aplikasi untuk mengakses file Google Drive dengan cepat Referensi Kutub Mahzab Syafii dan Hanbali.'
},
],
});
import { ref } from 'vue';

const searchQuery = ref('');
const searchResults = ref([]);

const searchBooks = async (query) => {
    searchQuery.value = query;

    const { data } = await useFetch('/api/db', {
        query: { query: searchQuery },
        lazy: true,
    }); searchResults.value = data.value || [];
};
</script>