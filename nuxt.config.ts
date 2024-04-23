// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nitro-cloudflare-dev", "@nuxtjs/seo"],site: {
    url: 'https://referensi.sarbeh.com',
    name: 'Referensi Mazaahib',
    description: 'Aplikasi Referensi Mazaahib',
    defaultLocale: 'id',
  }
})