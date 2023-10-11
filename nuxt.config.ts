export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css', '~/assets/fonts/fonts.css'],
  ssr: false,
  modules: ['@pinia/nuxt', '@formkit/auto-animate/nuxt', '@nuxtjs/color-mode', '@vueuse/nuxt',],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    classSuffix: ''
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3030/api/'
    }
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  imports: {
    dirs: ['stores']
  },
  components: [

    {
      path: '~/components/',
      // this is required else Nuxt will autoImport `.ts` file
      extensions: ['.vue'],
      // prefix for your components, eg: UiButton
    },
    {
      path: '~/components/ui',
      // this is required else Nuxt will autoImport `.ts` file
      extensions: ['.vue'],
      // prefix for your components, eg: UiButton
      prefix: 'Ui'
    },

    {
      path: '~/components/home',
      // this is required else Nuxt will autoImport `.ts` file
      extensions: ['.vue'],
      // prefix for your components, eg: UiButton
      prefix: 'Home'
    },

    {
      path: '~/components/app/overview',
      // this is required else Nuxt will autoImport `.ts` file
      extensions: ['.vue'],
      // prefix for your components, eg: UiButton
      prefix: 'Overview'
    },

    {
      path: '~/components/app/forms',
      // this is required else Nuxt will autoImport `.ts` file
      extensions: ['.vue'],
      // prefix for your components, eg: UiButton
      prefix: 'Form'
    },

    {
      path: '~/components/app',
      // this is required else Nuxt will autoImport `.ts` file
      extensions: ['.vue'],
      // prefix for your components, eg: UiButton
      prefix: 'App'
    },
  ],
})