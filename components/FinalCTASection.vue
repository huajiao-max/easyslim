<template>
  <section class="final-cta">
    <div class="container">
      <h2>{{ ctaData.title }}</h2>
      <p>{{ ctaData.description }}</p>
      <a :href="ctaData.buttonLink" class="big-button">{{
        ctaData.buttonText
      }}</a>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    ctaData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.final-cta {
  padding: 5rem 0;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  text-align: center;
  color: white;
}

.final-cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.final-cta p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.big-button {
  display: inline-block;
  background: white;
  color: #ff6b6b;
  padding: 1.5rem 3rem;
  text-decoration: none;
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.big-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}
</style>
