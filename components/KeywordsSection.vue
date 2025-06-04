<template>
  <section class="keywords">
    <div class="container">
      <h3 style="margin-bottom: 2rem; color: #666">Popular Searches</h3>
      <div class="keyword-cloud">
        <span
          v-for="(keyword, index) in keywords"
          :key="index"
          class="keyword"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          {{ keyword }}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    keywords: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.keywords {
  background: #f8f9fa;
  padding: 3rem 0;
  text-align: center;
}

.keyword-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
}

.keyword {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  animation: float 3s ease-in-out infinite alternate;
}

.keyword:hover {
  opacity: 1;
}
</style>
