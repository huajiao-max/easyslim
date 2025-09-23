<template>
  <div class="progress-tracker-page">
    <header-global />

    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Weight Progress Tracker</h1>
        <p class="page-subtitle">Track your weight loss journey with our beautiful calendar view</p>
      </div>

      <weight-tracker-calendar />
    </div>

    <footer-global />
  </div>
</template>

<script>
import HeaderGlobal from "@/components/headerglobal.vue";
import FooterGlobal from "@/components/footerglobal.vue";
import WeightTrackerCalendar from "@/components/WeightTrackerCalendar.vue";

export default {
  name: 'ProgressTracker',
  components: {
    HeaderGlobal,
    FooterGlobal,
    WeightTrackerCalendar,
  },
  head() {
    return {
      title: "Weight Progress Tracker - Track Your Weight Loss Journey",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Track your daily weight progress with our intuitive calendar interface. Monitor your weight loss journey and see your progress over time.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Weight Progress Tracker - Track Your Weight Loss Journey",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Track your daily weight progress with our intuitive calendar interface.",
        },
      ],
    };
  },
}
</script>

<style scoped>
.progress-tracker-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 120px);
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #70e0c0 0%, #5bccaa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #718096;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }
}
</style>