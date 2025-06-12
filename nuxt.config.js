// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  devServer: {
    port: 3001,
  },
  ssr: false,
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
  },
  nitro: {
    preset: "vercel",
    serveStatic: true,
  },
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
    apiBaseUrl: process.env.API_BASE_URL,
  },

  app: {
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
  modules: ["@nuxtjs/tailwindcss", "@element-plus/nuxt"],

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
});
