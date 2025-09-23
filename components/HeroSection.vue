<template>
  <!-- 第一版-- 用简单的减肥计划改变你的生活：开始转型-->
  <div class="main-box">
    <header-global></header-global>

    <section class="hero">
      <div class="hero-content">
        <h1>{{ $t("hero.title") }}</h1>
        <p class="hero-subtitle">{{ $t("hero.subtitle") }}</p>
        <a :href="$t('hero.ctaLink')" class="cta-button">
          {{ $t("hero.ctaText") }}
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderGlobal from "./headerglobal.vue";

export default {
  components: {
    HeaderGlobal,
  },
};
</script>

<style scoped>

.hero {
  min-height: 100vh;
  background: #70e0c0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="rgba(255,255,255,.1)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient></defs><circle fill="url(%23a)" cx="10" cy="10" r="10"/><circle fill="url(%23a)" cx="30" cy="5" r="8"/><circle fill="url(%23a)" cx="60" cy="15" r="6"/><circle fill="url(%23a)" cx="80" cy="8" r="12"/></svg>')
    repeat; */
  /* animation: float 20s infinite linear; */
}

@keyframes float {
  0% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(100px);
  }
}

.hero-content {
  max-width: 800px;
  padding: 2rem;
  z-index: 2;
  position: relative;
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: slideInUp 1s ease-out;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  animation: slideInUp 1s ease-out 0.2s both;
}

.cta-button {
  display: inline-block;
  background:#5bccaa;

  color: white;
  padding: 1rem 2.5rem;
  text-decoration: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
  animation: slideInUp 1s ease-out 0.4s both;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(255, 107, 107, 0.6);
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }
}
</style>
