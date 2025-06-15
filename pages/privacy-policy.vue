<template>
  <div id="app" class="main-box">
    <HeaderGlobal :isshowAiimage="false"></HeaderGlobal>

    <div class="p-6 prose mx-auto div-markdown-color">
      <h1>Privacy Policy for EasySlimStart</h1>
      <p>Effective Date: May 27, 2025</p>
      <p>
        Welcome to EasySlimStart, your trusted online platform for personalized
        weight loss plans and wellness guidance. This privacy policy outlines
        the types of information we collect from our users, how we use it, and
        the steps we take to protect it.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        <strong>a. Personal Data</strong>: We collect personal data that you
        voluntarily provide to us, including your name, email address, age,
        weight, height, health conditions, dietary preferences, fitness goals,
        and payment information. This information is collected for the purpose
        of creating personalized weight loss plans and processing orders on
        EasySlimStart.
      </p>
      <p>
        <strong>b. Health and Fitness Data</strong>: We may collect information
        about your weight loss progress, exercise activities, meal preferences,
        and other health-related data to improve and customize your weight loss
        plan.
      </p>
      <p>
        <strong>c. Non-Personal Data</strong>: We also collect non-personal data
        through the use of web cookies. This includes information about your
        browsing behavior on our website, device information, and usage
        patterns.
      </p>

      <h2>2. Use of Your Information</h2>
      <p>
        The information we collect is used for creating personalized weight loss
        plans, tracking your progress, providing nutrition and fitness
        recommendations, processing your orders, and improving your experience
        on our site. We may also use your information to send you relevant
        health tips and updates about our services. We do not share your
        personal or health information with any third parties without your
        explicit consent.
      </p>

      <h2>3. Health Information Security</h2>
      <p>
        We understand the sensitive nature of health and fitness data. All
        health-related information is encrypted and stored securely. We
        implement strict access controls and regularly audit our security
        measures to ensure your health data remains confidential and protected.
      </p>

      <h2>4. Children's Privacy</h2>
      <p>
        EasySlimStart does not knowingly collect any personal information from
        children under 18 years of age. Our weight loss services are designed
        for adults only. If you believe that we have mistakenly or
        unintentionally collected such information, please contact us
        immediately so we can remove the information.
      </p>

      <h2>5. Data Protection</h2>
      <p>
        We take the security of your personal and health information seriously
        and use appropriate technical and organizational measures to protect
        your data against unauthorized access, theft, and misuse. This includes
        SSL encryption, secure servers, and regular security updates.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to access, update, or delete your personal
        information at any time. You can also opt out of promotional
        communications and request that we stop processing your data. To
        exercise these rights, please contact us using the information provided
        below.
      </p>

      <h2>7. Updates to This Privacy Policy</h2>
      <p>
        We may update this privacy policy from time to time to reflect changes
        in our practices or legal requirements. All updates will be posted on
        this page, and users will be notified of any significant changes via
        email.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions or concerns about our privacy policy or the
        data we hold about you, please contact us at monica@easyslimstart.com.
      </p>

      <p>Thank you for choosing EasySlimStart for your weight loss journey.</p>
    </div>
    <FooterGlobal></FooterGlobal>
  </div>
</template>

<script>
import HeaderGlobal from "@/components/headerglobal.vue";
import FooterGlobal from "@/components/footerglobal.vue";
export default {
  name: "",
  components: { HeaderGlobal, FooterGlobal },

  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.main-box {
  // background-color: #2b2f3a;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.p-6 {
  padding: 1.5rem;
}
.prose {
  max-width: 65ch;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.div-markdown-color {
  color: #fff;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
}
h1 {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1rem;
}
h2 {
  color: #fff;
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
p {
  margin-bottom: 1rem;
}
strong {
  font-weight: 600;
}
.p-6 {
  padding: 1.5rem;
}
.mx-auto {
  width: 40%;
  margin-left: auto;
  margin-right: auto;
}
.mt-6 {
  margin-top: 1.5rem;
}
.-z-10 {
  z-index: -10;
}
.top-0 {
  top: 0;
}
.right-0 {
  right: 0;
}
.left-0 {
  left: 0;
}
.bottom-auto {
  bottom: auto;
}
.absolute {
  position: absolute;
}
.h-full {
  height: 100%;
}
.my-8 {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.p-6 {
  padding: 1.5rem;
}
.prose :where(p):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
p,
h1,
h2 {
  text-align: left;
}
@media (min-width: 344px) and(max-width: 1285px) {
  .main-box {
    background-color: #2b2f3a;
    min-height: 100vh;
    font-size: 23px;
  }
}
</style>
