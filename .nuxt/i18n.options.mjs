
// @ts-nocheck
import locale_en_46json_e4bdebe4 from "#nuxt-i18n/e4bdebe4";
import locale_zh_46json_b7c21a8a from "#nuxt-i18n/b7c21a8a";

export const localeCodes =  [
  "en",
  "zh"
]

export const localeLoaders = {
  en: [
    {
      key: "locale_en_46json_e4bdebe4",
      load: () => Promise.resolve(locale_en_46json_e4bdebe4),
      cache: true
    }
  ],
  zh: [
    {
      key: "locale_zh_46json_b7c21a8a",
      load: () => Promise.resolve(locale_zh_46json_b7c21a8a),
      cache: true
    }
  ]
}

export const vueI18nConfigs = []

export const nuxtI18nOptions = {
  restructureDir: "i18n",
  experimental: {
    localeDetector: "",
    switchLocalePathLinkSSR: false,
    autoImportTranslationFunctions: false,
    typedPages: true,
    typedOptionsAndMessages: false,
    generatedLocaleFilePathFormat: "absolute",
    alternateLinkCanonicalQueries: false,
    hmr: true
  },
  bundle: {
    compositionOnly: true,
    runtimeOnly: true,
    fullInstall: true,
    dropMessageCompiler: false,
    optimizeTranslationDirective: false
  },
  compilation: {
    strictMessage: false,
    escapeHtml: false
  },
  customBlocks: {
    defaultSFCLang: "json",
    globalSFCScope: false
  },
  locales: [
    {
      code: "en",
      name: "English",
      files: [
        {
          path: "D:/mycommonCode/2025/easyslim/i18n/locales/en.json",
          cache: undefined
        }
      ]
    },
    {
      code: "zh",
      name: "中文",
      files: [
        {
          path: "D:/mycommonCode/2025/easyslim/i18n/locales/zh.json",
          cache: undefined
        }
      ]
    }
  ],
  defaultLocale: "en",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  trailingSlash: false,
  defaultLocaleRouteNameSuffix: "default",
  strategy: "prefix_except_default",
  lazy: false,
  langDir: "locales",
  rootRedirect: undefined,
  detectBrowserLanguage: false,
  differentDomains: false,
  baseUrl: "",
  customRoutes: "page",
  pages: {},
  skipSettingLocaleOnNavigate: true,
  types: "composition",
  debug: false,
  parallelPlugin: false,
  multiDomainLocales: false,
  warnOnMissingTranslations: true,
  hotReload: false,
  i18nModules: []
}

export const normalizedLocales = [
  {
    code: "en",
    name: "English",
    files: [
      {
        path: "D:/mycommonCode/2025/easyslim/i18n/locales/en.json",
        cache: undefined
      }
    ]
  },
  {
    code: "zh",
    name: "中文",
    files: [
      {
        path: "D:/mycommonCode/2025/easyslim/i18n/locales/zh.json",
        cache: undefined
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false
export const hasPages = true

export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
/** client **/
if(import.meta.hot) {

function deepEqual(a, b, ignoreKeys = []) {
  // Same reference?
  if (a === b) return true

  // Check if either is null or not an object
  if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  // Get top-level keys, excluding ignoreKeys
  const keysA = Object.keys(a).filter(k => !ignoreKeys.includes(k))
  const keysB = Object.keys(b).filter(k => !ignoreKeys.includes(k))

  // Must have the same number of keys (after ignoring)
  if (keysA.length !== keysB.length) {
    return false
  }

  // Check each property
  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false
    }

    const valA = a[key]
    const valB = b[key]

    // Compare functions stringified
    if (typeof valA === 'function' && typeof valB === 'function') {
      if (valA.toString() !== valB.toString()) {
        return false
      }
    }
    // If nested, do a normal recursive check (no ignoring at deeper levels)
    else if (typeof valA === 'object' && typeof valB === 'object') {
      if (!deepEqual(valA, valB)) {
        return false
      }
    }
    // Compare primitive values
    else if (valA !== valB) {
      return false
    }
  }

  return true
}



async function loadCfg(config) {
  const nuxt = useNuxtApp()
  const { default: resolver } = await config()
  return typeof resolver === 'function' ? await nuxt.runWithContext(() => resolver()) : resolver
}


  import.meta.hot.accept("../i18n/locales/en.json", async mod => {
    localeLoaders["en"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("en")
  })

  import.meta.hot.accept("../i18n/locales/zh.json", async mod => {
    localeLoaders["zh"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("zh")
  })



}
/** client-end **/