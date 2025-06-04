// import Vue from "vue";
// import VueI18n from "vue-i18n";
// import enLocale from "element-ui/lib/locale/lang/en";
// import zhLocale from "element-ui/lib/locale/lang/zh-CN";
// import ElementLocale from "element-ui/lib/locale";

// Vue.use(VueI18n);

// export default ({ app, store }) => {
//   // Set i18n instance on app
//   // This way we can use it in middleware and pages asyncData/fetch
//   app.i18n = new VueI18n({
//     locale: store.state.locale,
//     fallbackLocale: "en",
//     messages: {
//       en: { ...require("@/locales/en.json"), ...enLocale },
//       zh: { ...require("@/locales/zh.json"), ...zhLocale },
//       // 'es': { ...require('~/locales/es.json'),  ...zhLocale },
//     },
//   });

//   app.i18n.path = (link) => {
//     if (app.i18n.locale === app.i18n.fallbackLocale) {
//       return `/${link}`;
//     }
//     return `/${app.i18n.locale}/${link}`;
//   };
//   // 配置element-ui的组件国际化
//   ElementLocale.i18n((key, value) => app.i18n.t(key, value));
// };
import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);
const messages = {
  en: require("~/components/i18n/home/en.js").default,
  zh: require("~/components/i18n/home/zh.js").default,
  ar: require("~/components/i18n/home/ar.js").default,
  mly: require("~/components/i18n/home/mly.js").default,
  de: require("~/components/i18n/home/de.js").default,
  fr: require("~/components/i18n/home/fr.js").default,
  ko: require("~/components/i18n/home/ko.js").default,
  jp: require("~/components/i18n/home/jp.js").default,
  // ... 其他语言
};

const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default ({ app }) => {
  app.i18n = i18n;
};
