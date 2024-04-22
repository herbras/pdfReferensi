<template>
    <div class="container">
      <h1>PDF Downloader</h1>
      <input type="url" v-model="pdfUrl" placeholder="Enter PDF URL here" class="url-input"/>
      <input type="number" v-model.number="startPage" placeholder="Start Page" class="page-input" />
      <input type="number" v-model.number="endPage" placeholder="End Page" class="page-input" />

      <button @click="downloadSelectedPages" :disabled="!validRange">
        Download Selected Pages
      </button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>

  <script setup>
  import { ref, computed } from 'vue';
  import { PDFDocument } from 'pdf-lib';

  const pdfUrl = ref('');
  const startPage = ref(null);
  const endPage = ref(null);
  const errorMessage = ref('');

  const validRange = computed(() => {
    return startPage.value > 0 && endPage.value >= startPage.value;
  });

  async function downloadPDF(start, end) {
    try {
      const response = await fetch(pdfUrl.value);
      const pdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const newPdfDoc = await PDFDocument.create();

      for (let i = start - 1; i < end; i++) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
        newPdfDoc.addPage(copiedPage);
      }

      const newPdfBytes = await newPdfDoc.save();
      const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `pages_${start}-${end}.pdf`;
      link.click();
    } catch (error) {
      errorMessage.value = 'Error downloading PDF. Please check the URL and page numbers.';
    }
  }

  function downloadSelectedPages() {
    if (validRange.value) {
      downloadPDF(startPage.value, endPage.value);
      errorMessage.value = '';
    } else {
      errorMessage.value = 'Invalid page range. Please check your inputs.';
    }
  }
  </script>

  <style scoped>
  .container {
    padding: 20px;
  }
  .url-input, .page-input {
    width: 100%;
    margin-bottom: 10px;
  }
  .error {
    color: red;
  }
  </style>
