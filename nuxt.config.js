// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import path from "path";
export default defineNuxtConfig({
  devServer: {
    port: 3002,
    host: "0.0.0.0",
  },
  ssr: false,
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
    head: {
      title: "TinyMint | Simple Weight Loss Plans That Actually Work",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Start your weight loss journey with our simple diet plans, workout routines, and monthly tracking. Free tools including BMI calculator, calorie calculator, and personalized plans for lasting results.",
        },
        { name: "format-detection", content: "telephone=no" },
        { httpEquiv: "Content-Type", content: "text/html;charset=gb2312" },
        { name: "sogou_site_verification", content: "mXan3oISGM" },
        { name: "msvalidate.01", content: "9C1DEA3D90ADA14FDB750F862CEF56E8" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://www.easyslimstart.com/" },
      ],
      script: [
        // Temporarily disabled for debugging
        // {
        //   async: true,
        //   src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=2483469961",
        //   crossorigin: "anonymous",
        // },
      ],
    },
  },

  nitro: {
    preset: "vercel",
    serveStatic: true,
    compatibilityDate: "2025-06-22",
  },

  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
    apiBaseUrl: process.env.API_BASE_URL,
  },

  css: [
    "element-plus/dist/index.css",
    "@/assets/base.css",
    "@/assets/theme.css",
    "@/assets/css/tailwind.css",
  ],

  env: {
    API_BASE_URL: process.env.API_BASE_URL || "https://kieai.erweima.ai/api/v1",
    API_KEY: process.env.API_KEY,
  },

  serverMiddleware: [
    { path: "/api", handler: "~/server-middleware/api-proxy" },
  ],

  privateRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },

  plugins: [
    "~/plugins/axios",
    "~/plugins/firebase",
    "~/plugins/error",
    "~/plugins/google-analytics",
    "~/plugins/cors",
  ],

  components: true,
  //
  modules: ["@nuxtjs/tailwindcss", "@element-plus/nuxt", "@nuxtjs/i18n"],
  i18n: {
    langDir: "locales",
    locales: [
      { code: "en", file: "en.json", name: "English" },
      { code: "zh", file: "zh.json", name: "中文" },
    ],

    defaultLocale: "en",
    strategy: "prefix_except_default",
    lazy: false,
    // langDir: "i18n/locales",
    detectBrowserLanguage: false,
    warnOnMissingTranslations: true,
    hotReload: false,
    bundle: {
      optimizeTranslationDirective: false,
      runtimeOnly: true,
    },
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
    skipSettingLocaleOnNavigate: true,
  },

  // i18n: {
  //   vueI18n: "@/i18n/nuxt-i18n.js",
  //   locales: [
  //     { code: "en", file: "en.json" },
  //     { code: "zh", file: "zh-CN.json" },
  //     { code: "zh-TW", file: "zh-TW.json" },
  //     { code: "pt", file: "pt.json" },
  //     { code: "de", file: "de.json" },
  //     { code: "fr", file: "fr.json" },
  //     { code: "es", file: "es.json" },
  //     { code: "jp", file: "jp.json" },
  //     { code: "ko", file: "ko.json" },
  //   ],
  //   defaultLocale: "en",
  //   strategy: "prefix_except_default",
  //   lazy: true,
  //   langDir: "locales/languages/",
  //   skipSettingLocaleOnNavigate: true,
  //   baseUrl: process.env.BASE_URL || "http://localhost:3000",
  //   detectBrowserLanguage: {
  //     useCookie: true,
  //     cookieKey: "i18n_redirected",
  //     redirectOn: "root",
  //     alwaysRedirect: true,
  //   },
  //   compilation: {
  //     strictMessage: false,
  //     escapeHtml: false,
  //   },
  //   bundle: {
  //     fullInstall: false,
  //     runtimeOnly: true,
  //     optimizeTranslationDirective: false,
  //   },
  // },

  build: {
    transpile: [/^element-plus/],
    optimization: {
      splitChunks: {
        chunks: "all",
        automaticNameDelimiter: ".",
      },
    },
    analyze: false,
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        const ESLintPlugin = require("eslint-webpack-plugin");
        config.plugins.push(
          new ESLintPlugin({
            extensions: ["js", "vue"],
            fix: true,
            emitWarning: true,
          })
        );
      }
    },
  },

  generate: {
    fallback: true,
  },
  // postcss: {
  //   plugins: {
  //     tailwindcss: {}, // 如果你用 TailwindCSS
  //     autoprefixer: {},
  //     // 其他 PostCSS 插件...
  //   },
  // },
});