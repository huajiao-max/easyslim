export default {
  mode: "universal",
  target: "static",
  modules: ["@nuxtjs/tailwindcss"],
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY, // 仅在服务端可用
    apiBaseUrl: process.env.API_BASE_URL,
  },
  // modules: ["@nuxtjs/i18n"],

  // i18n: {
  //   locales: ["en", "zh"],
  //   defaultLocale: "en",
  //   vueI18n: {
  //     fallbackLocale: "en",
  //     messages: {
  //       en: require("./components/i18n/home/en.js"),
  //       zh: require("./components/i18n/home/zh.js"),
  //     },
  //   },
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head
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
          "Transform your photos into stunning Studio Ghibli-style art with our AI generator. Experience the magic of hand-drawn animation aesthetics in just minutes.",
      },
      {
        hid: "keywords",
        name: "keywords",
        content: " ",
      },
      { name: "format-detection", content: "telephone=no" },
      { httpEquiv: "Content-Type", content: "text/html;charset=gb2312" }, // 添加你的 Content-Type 标签
      { name: "sogou_site_verification", content: "mXan3oISGM" }, // 添加搜狗站点验证标签
      { name: "msvalidate.01", content: "9C1DEA3D90ADA14FDB750F862CEF56E8" }, // 添加搜狗站点验证标签
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    // link: [{ rel: "canonical", href: "http://Ghibli ai/" }],
    script: [
      {
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=2483469961",
        crossorigin: "anonymous",
      },
    ],
    // script: [
    //   // 添加 Google Tag Manager 的脚本
    //   {
    //     src: "https://www.googletagmanager.com/gtag/js?id=G-CHMETTXTD6",
    //     async: true,
    //   },
    //   // 由于 GTM 脚本是异步加载的，下面的脚本需要确保在 GTM 脚本之后执行
    //   // 因此，我们使用内联脚本，并将其放在 GTM 脚本的后面
    //   {
    //     innerHTML: `
    //     window.dataLayer = window.dataLayer || [];
    //     function gtag(){dataLayer.push(arguments);}
    //     gtag('js', new Date());

    //     gtag('config', 'G-CHMETTXTD6');
    //   `,
    //     type: "text/javascript",
    //   },
    // ],
    __dangerouslyDisableSanitizers: ["opengraph", "twitter"],
    meta: [
      // Open Graph 标签
      { property: "og:title", content: "ghibli Generate" },
      { property: "og:description", content: "Generate the pictures by text" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "http://Ghibli ai/" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "ghibli" },
      { property: "og:image", content: "/assets/image/idea3.png" },
      // Twitter Card 标签
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "ghibli Generate" },
      { name: "twitter:description", content: "Generate the pictures by text" },
      { name: "twitter:image", content: "/assets/image/idea3.png" },
      // 其他 Twitter Card 标签...
      // 其他 Open Graph 标签...
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "@/assets/base.css",
    "@/assets/base.less",
    "@/assets/theme.css",
    "@/assets/css/tailwind.css",
  ],
  // api: {
  //   routes: {
  //     "/uploadImage": { handler: "~/api/uploadImage.js" },
  //   },
  // },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  env: {
    API_BASE_URL: process.env.API_BASE_URL || "https://kieai.erweima.ai/api/v1",
    API_KEY: process.env.API_KEY,
  },
  serverMiddleware: [
    { path: "/api", handler: "~/server-middleware/api-proxy" },
  ],
  privateRuntimeConfig: {
    // 私密配置
    apiKey: process.env.API_KEY,
  },

  plugins: [
    "@/plugins/element-ui",
    { src: "@/plugins/axios", ssr: false },
    { src: "@/plugins/firebase", ssr: false },
    { src: "@/plugins/error", ssr: false },
    { src: "@/plugins/google-analytics.js", mode: "client" },
    { src: "@/plugins/cors.js", ssr: false },

    "@/plugins/i18n.js",
  ],

  // axios: {
  //   proxy: true,
  //   prefix: "/api", // baseURL
  //   credentials: true,
  //   withCredentials: true,
  // },
  // proxy: {
  //   "/api": {
  //     target: "https://z.mp3drink.cc", // 代理地址
  //     changeOrigin: true,
  //     pathRewrite: {
  //       "^/api": "", //将 /api 替换掉
  //     },
  //   },
  // },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy", "@nuxtjs/robots"],

  robots: {
    UserAgent: "*",
    Allow: "*",
  },

  build: {
    transpile: [/^element-ui/],
    extractCSS: { allChunks: true },
    vendor: ["axios"], //为防止重复打包
    // 生产环境优化
    analyze: false,
    extractCSS: true,
  },

  generate: {
    fallback: true,
  },
};
