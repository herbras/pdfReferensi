<template>
    <form @submit.prevent="searchBooks" class="flex gap-3 items-center">
        <UInput v-model="searchQuery"  color="primary" variant="outline" placeholder="Cari buku..." />
        <UButton label="Cari"  type="submit" />

    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const emit = defineEmits(['search']);
  const searchQuery = ref('');
  
  const searchBooks = () => {
    emit('search', searchQuery.value);
  };
  </script>