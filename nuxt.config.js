export default {
  target: "static",
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
    apiBaseUrl: process.env.API_BASE_URL,
  },

  head: {
    title: "Ghibli AI Generator | Turn Photos into Studio Ghibli Style",
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
          "Transform your photos into stunning Studio Ghibli-style art with our AI generator.",
      },
      { name: "format-detection", content: "telephone=no" },
      { httpEquiv: "Content-Type", content: "text/html;charset=gb2312" },
      { name: "sogou_site_verification", content: "mXan3oISGM" },
      { name: "msvalidate.01", content: "9C1DEA3D90ADA14FDB750F862CEF56E8" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=2483469961",
        crossorigin: "anonymous",
      },
    ],
  },

  css: [
    "element-ui/lib/theme-chalk/index.css",
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
    "@/plugins/element-ui",
    { src: "@/plugins/axios", ssr: false },
    { src: "@/plugins/firebase", ssr: false },
    { src: "@/plugins/error", ssr: false },
    { src: "@/plugins/google-analytics.js", mode: "client" },
    { src: "@/plugins/cors.js", ssr: false },
  ],

  components: true,
  buildModules: [],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/robots",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
  ],

  i18n: {
    locales: [
      { code: "en", name: "English" },
      { code: "zh", name: "中文" },
    ],
    defaultLocale: "en",
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en: require("./locales/en.json"),
        zh: require("./locales/zh.json"),
      },
    },
  },

  robots: {
    UserAgent: "*",
    Allow: "*",
  },

  build: {
    transpile: [/^element-ui/],
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
};
