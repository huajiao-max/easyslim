<template>
  <section class="success">
    <div class="container">
      <h2 class="section-title">Real Results, Real People</h2>
      <div class="testimonial">
        <p class="testimonial-text">{{ testimonial.text }}</p>
        <p class="testimonial-author">{{ testimonial.author }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    testimonial: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.success {
  padding: 5rem 0;
  background: #fff;
}

.testimonial {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 3rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 20px;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  animation: slideInUp 0.6s ease forwards;
}

.testimonial::before {
  content: '"';
  font-size: 5rem;
  position: absolute;
  top: -1rem;
  left: 2rem;
  opacity: 0.3;
}

.testimonial-text {
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  font-style: italic;
}

.testimonial-author {
  font-weight: 600;
  font-size: 1.1rem;
}
</style>
