<template>
  <!-- 免费减肥工具 -->
  <section class="tools">
    <div class="container">
      <h2 class="section-title">Free Weight Loss Tools</h2>
      <div class="tools-grid">
        <div
          v-for="(tool, index) in tools"
          :key="index"
          class="tool-card"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <span class="tool-icon">{{ tool.icon }}</span>
          <h3>{{ tool.title }}</h3>
          <p>{{ tool.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    tools: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.tools {
  padding: 5rem 0;
  background: #2c3e50;
  color: white;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.tool-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
  animation: slideInUp 0.6s ease forwards;
}

.tool-card:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
}

.tool-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
