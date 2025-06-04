export { default as FeaturesSection } from '../..\\components\\FeaturesSection.vue'
export { default as FinalCTASection } from '../..\\components\\FinalCTASection.vue'
export { default as Footerglobal } from '../..\\components\\footerglobal.vue'
export { default as Headerglobal } from '../..\\components\\headerglobal.vue'
export { default as HeroSection } from '../..\\components\\HeroSection.vue'
export { default as KeywordsSection } from '../..\\components\\KeywordsSection.vue'
export { default as Plansectionsub } from '../..\\components\\plansectionsub.vue'
export { default as PlansSection } from '../..\\components\\PlansSection.vue'
export { default as Test } from '../..\\components\\test.vue'
export { default as TestimonialSection } from '../..\\components\\TestimonialSection.vue'
export { default as ToolsSection } from '../..\\components\\ToolsSection.vue'
export { default as I18nHomeAr } from '../..\\components\\i18n\\home\\ar.js'
export { default as I18nHomeDe } from '../..\\components\\i18n\\home\\de.js'
export { default as I18nHomeEn } from '../..\\components\\i18n\\home\\en.js'
export { default as I18nHomeEs } from '../..\\components\\i18n\\home\\es.js'
export { default as I18nHomeFr } from '../..\\components\\i18n\\home\\fr.js'
export { default as I18nHomeJp } from '../..\\components\\i18n\\home\\jp.js'
export { default as I18nHomeKo } from '../..\\components\\i18n\\home\\ko.js'
export { default as I18nHomeMly } from '../..\\components\\i18n\\home\\mly.js'
export { default as I18nHomeZh } from '../..\\components\\i18n\\home\\zh.js'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
