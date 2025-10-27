<template>
  <div>
    <!-- <hero-section :hero-data="$t('heroData')" /> -->
    <hero-section :hero-data="heroData" />
    <features-section :features="features" />
    <plans-section :plans="plans" />
    <tools-section :tools="tools" />
    <testimonial-section :testimonial="testimonial" />
    <!-- <final-cta-section :cta-data="ctaData" /> -->
    <keywords-section :keywords="keywords" />
    <footer-global></footer-global>
  </div>
</template>

<script>
import FooterGlobal from "@/components/footerglobal.vue";
import HeroSection from "@/components/HeroSection.vue";
import FeaturesSection from "@/components/FeaturesSection.vue";
import PlansSection from "@/components/PlansSection.vue";
import ToolsSection from "@/components/ToolsSection.vue";
import TestimonialSection from "@/components/TestimonialSection.vue";
import FinalCtaSection from "@/components/FinalCTASection.vue";
import KeywordsSection from "@/components/KeywordsSection.vue";
export default {
  components: {
    HeroSection,
    FeaturesSection,
    PlansSection,
    ToolsSection,
    TestimonialSection,
    FinalCtaSection,
    KeywordsSection,
    FooterGlobal,
  },
  head() {
    return {
      title:
        "Transform Your Life - Simple Weight Loss Plans That Actually Work",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Start your weight loss journey with our simple diet plans, workout routines, and monthly tracking. Free tools including BMI calculator, calorie calculator, and personalized plans for lasting results.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content:
            "Transform Your Life - Simple Weight Loss Plans That Actually Work",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Start your weight loss journey with our simple diet plans, workout routines, and monthly tracking.",
        },
      ],
    };
  },
  data() {
    return {
      heroData: {
        title: "Transform Your Life with Simple Weight Loss Plans",
        subtitle:
          "Start your journey today with personalized diet plans, workout routines, and monthly tracking. No complicated rules, just results that last.",
        ctaText: "Start Your Transformation →",
        ctaLink: "#plans",
      },
      features: [
        {
          icon: "🎯",
          title: "Simple Diet Plans for Weight Loss",
          description:
            "No complicated meal prep or expensive ingredients. Our simple diet plans focus on balanced nutrition with foods you already love, making weight loss sustainable and enjoyable.",
        },
        {
          icon: "💪",
          title: "Workout Plans for Weight Loss",
          description:
            "Specially designed workout plans for females and all fitness levels. From beginners to advanced, find routines that fit your lifestyle and help you burn calories effectively.",
        },
        {
          icon: "📊",
          title: "Free BMI & Calorie Calculator",
          description:
            "Track your progress with our built-in BMI calculator and calorie calculator. Know exactly where you stand and what you need to achieve your weight loss goals.",
        },
        {
          icon: "🗓️",
          title: "Monthly Progress Tracking",
          description:
            "Stay motivated with our visual monthly tracking system. Every small step counts, and we help you celebrate every milestone on your weight loss journey.",
        },
        {
          icon: "🧘‍♀️",
          title: "Holistic Wellness Approach",
          description:
            "More than just diet and exercise - we focus on your complete transformation, supporting your journey like Garden of Life supports natural wellness.",
        },
        {
          icon: "🍊",
          title: "Smart Nutrition Guidance",
          description:
            "Learn about calories in everyday foods - from orange calories to your favorite treats. Make informed choices without giving up the foods you love.",
        },
      ],
      plans: [
        {
          icon: "🥗",
          title: "Simple Diet Plan",
          features: [
            "Customizable meal plans",
            "Calorie tracking made easy",
            "Balanced nutrition guidelines",
            "Portion control tips",
            "Healthy recipe suggestions",
          ],
          description:
            "Perfect for those who want to lose weight through smart eating choices without complicated restrictions.",
        },
        {
          icon: "🏃‍♀️",
          title: "Workout Plan for Weight Loss",
          features: [
            "Female-focused routines",
            "Home and gym options",
            "Progressive difficulty levels",
            "Time-efficient workouts",
            "Cardio and strength training",
          ],
          description:
            "Designed specifically for women who want effective workout plans that fit into busy schedules.",
        },
        {
          icon: "💫",
          title: "Complete Transformation",
          features: [
            "Combined diet + exercise",
            "Monthly makeover challenges",
            "Progress photo tracking",
            "Lifestyle habit building",
            "Long-term success planning",
          ],
          description:
            'Your complete makeover solution - like a "mommy makeover" but focused on healthy lifestyle changes that last.',
        },
      ],
      tools: [
        {
          icon: "⚖️",
          title: "BMI Calculator",
          description:
            "Calculate your Body Mass Index and understand where you stand on your weight loss journey.",
        },
        {
          icon: "🔥",
          title: "Calorie Calculator",
          description:
            "Determine your daily calorie needs and create the perfect deficit for weight loss.",
        },
        {
          icon: "📈",
          title: "Progress Tracker",
          description:
            "Visual monthly tracking to keep you motivated and on track with your goals.",
        },
        {
         
"icon": "🎬",
"title": "Weight Loss Videos",
"description": "Explore a vast collection of weight loss videos, from high-intensity fat-burning workouts to healthy eating guides, providing comprehensive inspiration and solutions for your fitness journey."
        },
      ],
      testimonial: {
        text: '"I used to think weight loss was impossible with my busy schedule. But this simple approach changed everything. The monthly tracking kept me motivated, and the simple diet plans were actually doable. I learned that small consistent changes, like understanding calories in my favorite orange julius or choosing healthier versions of comfort foods, made all the difference. Now I keep holding on to these healthy habits because I know we\'ll make it through any challenge!"',
        author: "- Sarah M., Lost 35 lbs in 4 months",
      },
      ctaData: {
        title: "Ready to Start Your Transformation?",
        description:
          "Join thousands who have already started their journey. Your best summer transformation starts today!",
        buttonText: "Get Started Free Today",
        buttonLink: "weight_loss_planner_english.html",
      },
      keywords: [
        "simple diet plan for weight loss",
        "workout plan for weight loss female",
        "BMI calculator",
        "calorie calculator",
        "lose weight",
        "calories orange",
        "orange julius calories",
        "garden of life probiotics",
        "summer transformation",
        "mommy makeover",
        "monthly weight loss",
        "healthy lifestyle",
      ],
    };
  },
};
</script>

<style>
/* Global styles that apply to all components */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
}

/* Animation keyframes */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
