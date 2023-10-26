// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],

  app: {
    head: {
      link: [
      { rel: "stylesheet", href:
      "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" }
      ],
    }
    },
  

  pwa:{
    manifest:{
      name: 'Berkah Bersama Alta',
      short_name: 'Berkah Bersama Alta',
      theme_color: '#fff',
      background_color: '#fff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
        }
      ]
    },
    devOptions: {
      enabled:true
    }
  }
})