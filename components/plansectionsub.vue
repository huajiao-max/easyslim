<template>
  <section class="plans" id="plans">
    <div class="container">
      <h2 class="section-title" style="color: #333">
        Choose Your Perfect Plan
      </h2>
      <div class="plans-grid">
        <div
          v-for="(plan, index) in plans"
          :key="index"
          class="plan-card"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <span class="plan-icon">{{ plan.icon }}</span>
          <h3>{{ plan.title }}</h3>
          <ul class="plan-features">
            <li v-for="(feature, fIndex) in plan.features" :key="fIndex">
              {{ feature }}
            </li>
          </ul>
          <p>{{ plan.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    plans: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.plans {
  padding: 5rem 0;
   background: linear-gradient(135deg, #a9c89a 0%, #caefa5 100%);

}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.plan-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  animation: slideInUp 0.6s ease forwards;
}

.plan-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.plan-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  display: block;
}

.plan-card h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.plan-features {
  list-style: none;
  margin-bottom: 2rem;
}

.plan-features li {
  padding: 0.5rem 0;
  color: #666;
  position: relative;
  padding-left: 1.5rem;
}

.plan-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4ecdc4;
  font-weight: bold;
}

@media (max-width: 768px) {
  .plans-grid {
    grid-template-columns: 1fr;
  }
}
</style>
