<template>
  <section class="plans" id="plans">
    <div class="container">
      <h2 class="section-title" style="color: white">
        Choose Your Weight Loss Plan 💪
      </h2>
      <div class="plans-grid">
        <div
          v-for="(plan, index) in planTypes"
          :key="index"
          class="plan-card"
          :style="`animation-delay: ${index * 0.1}s`"
          @click="openPlanModal(plan.type)"
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

      <!-- Saved Plans Section -->
      <div class="saved-plans-section" v-if="savedPlans.length > 0">
        <h2 class="section-title" style="color: white; margin-top: 3rem">
          📋 My Plan Collection
        </h2>
        <div class="saved-plans-grid">
          <div
            v-for="plan in savedPlans"
            :key="plan.id"
            class="saved-plan-card"
            @click="startPlan(plan.id)"
          >
            <h4>{{ plan.name }}</h4>
            <p><strong>Type:</strong> {{ getPlanTypeText(plan.type) }}</p>
            <p><strong>Details:</strong> {{ getPlanDetails(plan) }}</p>
            <p><strong>Created:</strong> {{ plan.createdAt }}</p>
            <div class="plan-actions">
              <button @click.stop="startPlan(plan.id)" class="start-btn">
                Start Plan
              </button>
              <button @click.stop="deletePlan(plan.id)" class="delete-btn">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Tracking Section -->
      <div
        class="tracking-section"
        v-if="currentPlan"
        :class="{ active: showTracking }"
      >
        <h2 style="color: white; margin-bottom: 1rem">
          📅 Monthly Progress Tracker
        </h2>
        <p style="color: white; margin-bottom: 2rem">
          Click on dates to mark your progress. Let's stay consistent together!
          💪
        </p>
        <div class="calendar" ref="calendar">
          <div v-for="day in weekDays" :key="day" class="calendar-header">
            {{ day }}
          </div>
          <div
            v-for="day in calendarDays"
            :key="day.key"
            class="calendar-day"
            :class="{ completed: day.completed, empty: day.empty }"
            @click="!day.empty && toggleDay(day)"
          >
            <div v-if="!day.empty" class="day-number">{{ day.day }}</div>
            <div v-if="!day.empty" class="day-emoji">
              {{ day.completed ? "🎉" : "🌟" }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="dialogBeforeClose"
    >
      <div>
        <!-- Exercise Plan Modal modal-overlay-->
        <div class="" v-if="activeModal === 'exercise'" @click="closeModal">
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeModal">×</button>
            <h3>🏃‍♀️ Create Exercise Plan</h3>

            <div class="inspiration-text">
              <p><strong>💡 Gentle Reminder:</strong></p>
              <p>
                Don't add overly strict exercise routines or set unrealistic
                workout durations. Choose activities that fit naturally into
                your daily life - even a 30-minute walk after dinner counts as a
                win!
              </p>
              <p>
                Moderate daily exercise helps us stay consistent. If we exhaust
                ourselves from the start, it might have the opposite effect.
                Remember, consistency beats intensity! 🌟
              </p>
            </div>

            <div class="modal-body">
              <div class="options-group">
                <h4>🎯 Choose Exercise Type</h4>
                <div class="options-list">
                  <div
                    v-for="type in exerciseTypes"
                    :key="type"
                    class="option-tag"
                    :class="{ selected: currentConfig.exerciseType === type }"
                    @click="selectExerciseType(type)"
                  >
                    {{ type }}
                  </div>
                </div>
                <div class="add-option">
                  <input
                    v-model="newExerciseType"
                    type="text"
                    class="add-input"
                    placeholder="Add new exercise type..."
                    @keyup.enter="addExerciseType"
                  />
                  <button @click="addExerciseType" class="add-btn">Add</button>
                </div>
              </div>

              <div class="options-group">
                <h4>⏰ Choose Exercise Duration</h4>
                <div class="options-list">
                  <div
                    v-for="duration in exerciseDurations"
                    :key="duration"
                    class="option-tag"
                    :class="{
                      selected: currentConfig.exerciseDuration === duration,
                    }"
                    @click="selectExerciseDuration(duration)"
                  >
                    {{ duration }} min
                  </div>
                </div>
                <div class="add-option">
                  <input
                    v-model.number="newExerciseDuration"
                    type="number"
                    class="add-input"
                    placeholder="Add duration (minutes)"
                    min="5"
                    max="120"
                    @keyup.enter="addExerciseDuration"
                  />
                  <button @click="addExerciseDuration" class="add-btn">
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div class="save-section">
              <h3>💾 Save Your Exercise Plan</h3>
              <input
                v-model="planName"
                type="text"
                class="plan-name-input"
                placeholder="Give your exercise plan a cute name~"
              />
              <br />
              <button @click="saveExercisePlan" class="save-btn">
                Save Plan ✨
              </button>
            </div>
          </div>
        </div>
        <!-- Diet Plan Modal modal-overlay-->
        <div class="" v-if="activeModal === 'diet'" @click="closeModal">
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeModal">×</button>
            <h3>🍽️ Create Diet Plan</h3>

            <div class="inspiration-text">
              <p><strong>💡 Diet Tips:</strong></p>
              <p>
                Balanced nutrition is more important than extreme dieting. Our
                goal is to build sustainable eating habits, not short-term
                extreme restrictions.
              </p>
              <p>
                Choose an appropriate level of fullness and maintain nutritional
                balance. Let every meal become part of your healthy lifestyle!
                🥗
              </p>
            </div>

            <div class="modal-body">
              <div class="options-group">
                <h4>🍽️ Meal Settings</h4>
                <div class="options-list">
                  <div
                    v-for="meal in mealTypes"
                    :key="meal"
                    class="option-tag"
                    :class="{
                      selected: currentConfig.selectedMeals.includes(meal),
                    }"
                    @click="toggleMealType(meal)"
                  >
                    {{ meal }}
                  </div>
                </div>
              </div>

              <div
                v-for="meal in currentConfig.selectedMeals"
                :key="meal"
                class="meal-config"
              >
                <h5>🍽️ {{ meal }}</h5>
                <div class="options-group">
                  <label>Diet Description:</label>
                  <div class="options-list">
                    <div
                      v-for="desc in dietDescriptions"
                      :key="desc"
                      class="option-tag"
                      :class="{
                        selected:
                          currentConfig.mealConfigs[meal]?.description === desc,
                      }"
                      @click="selectMealOption(meal, 'description', desc)"
                    >
                      {{ desc }}
                    </div>
                  </div>
                </div>
                <div class="options-group">
                  <label>Fullness Level:</label>
                  <div class="options-list">
                    <div
                      v-for="level in fullnessLevels"
                      :key="level"
                      class="option-tag"
                      :class="{
                        selected:
                          currentConfig.mealConfigs[meal]?.fullness === level,
                      }"
                      @click="selectMealOption(meal, 'fullness', level)"
                    >
                      {{ level }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="meal-result">
                <h4>📋 Your Diet Plan Preview</h4>
                <div class="meal-summary">
                  <div
                    v-if="Object.keys(currentConfig.mealConfigs).length === 0"
                  >
                    Please configure your meal settings...
                  </div>
                  <div v-else>
                    <div
                      v-for="(config, meal) in currentConfig.mealConfigs"
                      :key="meal"
                    >
                      <strong>{{ meal }}:</strong> {{ config.description }}
                      {{ config.fullness }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="save-section">
              <h3>💾 Save Your Diet Plan</h3>
              <input
                v-model="planName"
                type="text"
                class="plan-name-input"
                placeholder="Give your diet plan a cute name~"
              />
              <br />
              <button @click="saveDietPlan" class="save-btn">
                Save Plan ✨
              </button>
            </div>
          </div>
        </div>
        <!-- Combined Plan Modal modal-overlay-->

        <div class="" v-if="activeModal === 'combined'" @click="closeModal">
          <div class="modal-content large-modal" @click.stop>
            <button class="modal-close" @click="closeModal">×</button>
            <h3>💫 Create Combined Plan</h3>

            <div class="inspiration-text">
              <p><strong>💡 Combined Plan Tips:</strong></p>
              <p>
                Combining exercise with diet is the most effective weight loss
                approach. But remember, don't put too much pressure on yourself
                - choose a plan that fits your lifestyle rhythm.
              </p>
              <p>
                Take it step by step, let change become a natural part of your
                life, not a burden! 💪
              </p>
            </div>

            <div class="modal-body combined-body">
              <div class="exercise-section">
                <h4>🏃‍♀️ Exercise Section</h4>
                <div class="options-group">
                  <h5>Exercise Type</h5>
                  <div class="options-list">
                    <div
                      v-for="type in exerciseTypes"
                      :key="type"
                      class="option-tag"
                      :class="{ selected: currentConfig.exerciseType === type }"
                      @click="selectExerciseType(type)"
                    >
                      {{ type }}
                    </div>
                  </div>
                </div>
                <div class="options-group">
                  <h5>Exercise Duration</h5>
                  <div class="options-list">
                    <div
                      v-for="duration in exerciseDurations"
                      :key="duration"
                      class="option-tag"
                      :class="{
                        selected: currentConfig.exerciseDuration === duration,
                      }"
                      @click="selectExerciseDuration(duration)"
                    >
                      {{ duration }} min
                    </div>
                  </div>
                </div>
              </div>

              <div class="diet-section">
                <h4>🍽️ Diet Section</h4>
                <div
                  v-for="meal in currentConfig.selectedMeals"
                  :key="meal"
                  class="meal-config"
                >
                  <h5>🍽️ {{ meal }}</h5>
                  <div class="options-group">
                    <label>Diet Description:</label>
                    <div class="options-list">
                      <div
                        v-for="desc in dietDescriptions"
                        :key="desc"
                        class="option-tag"
                        :class="{
                          selected:
                            currentConfig.mealConfigs[meal]?.description ===
                            desc,
                        }"
                        @click="selectMealOption(meal, 'description', desc)"
                      >
                        {{ desc }}
                      </div>
                    </div>
                  </div>
                  <div class="options-group">
                    <label>Fullness Level:</label>
                    <div class="options-list">
                      <div
                        v-for="level in fullnessLevels"
                        :key="level"
                        class="option-tag"
                        :class="{
                          selected:
                            currentConfig.mealConfigs[meal]?.fullness === level,
                        }"
                        @click="selectMealOption(meal, 'fullness', level)"
                      >
                        {{ level }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="meal-result">
              <h4>📋 Your Combined Plan Preview</h4>
              <div class="meal-summary">
                <div
                  v-if="
                    currentConfig.exerciseType && currentConfig.exerciseDuration
                  "
                >
                  <strong>🏃‍♀️ Exercise:</strong>
                  {{ currentConfig.exerciseType }}
                  {{ currentConfig.exerciseDuration }} min<br /><br />
                </div>
                <div>
                  <strong>🍽️ Diet:</strong><br />
                  <div
                    v-for="(config, meal) in currentConfig.mealConfigs"
                    :key="meal"
                  >
                    {{ meal }}: {{ config.description }} {{ config.fullness }}
                  </div>
                </div>
              </div>
            </div>

            <div class="save-section">
              <h3>💾 Save Your Combined Plan</h3>
              <input
                v-model="planName"
                type="text"
                class="plan-name-input"
                placeholder="Give your combined plan a cute name~"
              />
              <br />
              <button @click="saveCombinedPlan" class="save-btn">
                Save Plan ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeModal: null,
      planName: "",
      newExerciseType: "",
      newExerciseDuration: null,
      currentPlan: null,
      showTracking: false,
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

      planTypes: [
        {
          type: "exercise",
          icon: "🏃‍♀️",
          title: "Exercise Plan",
          features: [
            "Burn calories effectively",
            "Boost metabolism",
            "Perfect for fitness enthusiasts",
          ],
          description:
            "Burn calories and boost metabolism through regular exercise. Perfect for fitness enthusiasts!",
        },
        {
          type: "diet",
          icon: "🥗",
          title: "Diet Plan",
          features: [
            "Control calorie intake",
            "Balanced nutrition",
            "Sustainable eating habits",
          ],
          description:
            "Control calorie intake with balanced nutrition. Start changing with every meal!",
        },
        {
          type: "combined",
          icon: "💫",
          title: "Exercise + Diet",
          features: [
            "Best of both worlds",
            "Maximum effectiveness",
            "Comprehensive approach",
          ],
          description:
            "Best of both worlds! Combined approach for more effective results!",
        },
      ],

      exerciseTypes: [
        "Jogging",
        "Brisk Walking",
        "Stair Climbing",
        "Swimming",
        "Yoga",
        "Dancing",
        "Walking",
        "Cycling",
      ],
      exerciseDurations: [10, 20, 30, 45, 60, 90],
      mealTypes: ["Breakfast", "Lunch", "Dinner"],
      dietDescriptions: [
        "Light",
        "Moderate",
        "Heavy",
        "Balanced",
        "Vegetarian",
        "Skip",
      ],
      fullnessLevels: [
        "Stay Hungry",
        "50% Full",
        "60% Full",
        "70% Full",
        "80% Full",
        "90% Full",
        "100% Full",
      ],

      currentConfig: {
        exerciseType: "",
        exerciseDuration: "",
        selectedMeals: ["Breakfast", "Lunch", "Dinner"],
        mealConfigs: {},
      },

      savedPlans: [],
      completedDays: [],
      dialogVisible: false,
    };
  },

  computed: {
    calendarDays() {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();

      const days = [];

      // Add empty cells for days before the month starts
      for (let i = 0; i < firstDay; i++) {
        days.push({ empty: true, key: `empty-${i}` });
      }

      // Add days of the current month
      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
        days.push({
          day,
          key: dateKey,
          completed: this.completedDays.includes(dateKey),
          empty: false,
        });
      }

      return days;
    },
  },

  mounted() {
    this.loadSavedData();
  },

  methods: {
    openPlanModal(type) {
      console.log(type, "type--001");
      this.dialogVisible = true;
      this.activeModal = type;
      this.planName = "";
      this.resetCurrentConfig();
      document.body.style.overflow = "hidden";
    },
    dialogBeforeClose() {
      this.dialogVisible = false;
    },
    closeModal() {
      this.activeModal = null;
      document.body.style.overflow = "auto";
    },

    resetCurrentConfig() {
      this.currentConfig = {
        exerciseType: "",
        exerciseDuration: "",
        selectedMeals: [...this.mealTypes],
        mealConfigs: {},
      };
    },

    selectExerciseType(type) {
      this.currentConfig.exerciseType =
        this.currentConfig.exerciseType === type ? "" : type;
    },

    selectExerciseDuration(duration) {
      this.currentConfig.exerciseDuration =
        this.currentConfig.exerciseDuration === duration ? "" : duration;
    },

    toggleMealType(meal) {
      const index = this.currentConfig.selectedMeals.indexOf(meal);
      if (index > -1) {
        this.currentConfig.selectedMeals.splice(index, 1);
        delete this.currentConfig.mealConfigs[meal];
      } else {
        this.currentConfig.selectedMeals.push(meal);
      }
    },

    selectMealOption(meal, type, value) {
      if (!this.currentConfig.mealConfigs[meal]) {
        this.$set(this.currentConfig.mealConfigs, meal, {});
      }
      this.$set(this.currentConfig.mealConfigs[meal], type, value);
    },

    addExerciseType() {
      const value = this.newExerciseType.trim();
      if (value && !this.exerciseTypes.includes(value)) {
        this.exerciseTypes.push(value);
        this.newExerciseType = "";
      }
    },

    addExerciseDuration() {
      const value = this.newExerciseDuration;
      if (
        value &&
        value >= 5 &&
        value <= 120 &&
        !this.exerciseDurations.includes(value)
      ) {
        this.exerciseDurations.push(value);
        this.exerciseDurations.sort((a, b) => a - b);
        this.newExerciseDuration = null;
      } else if (value > 120) {
        alert("Exercise duration cannot exceed 2 hours! 😊");
      }
    },

    saveExercisePlan() {
      if (!this.planName.trim()) {
        alert("Please give your plan a name! 🌸");
        return;
      }

      if (
        !this.currentConfig.exerciseType ||
        !this.currentConfig.exerciseDuration
      ) {
        alert("Please select exercise type and duration! 💕");
        return;
      }

      const planData = {
        id: Date.now(),
        name: this.planName,
        type: "exercise",
        createdAt: new Date().toLocaleDateString(),
        details: {
          exerciseType: this.currentConfig.exerciseType,
          exerciseDuration: this.currentConfig.exerciseDuration,
        },
      };

      this.savedPlans.push(planData);
      this.savePlansToStorage();

      alert(`Exercise plan "${this.planName}" saved successfully! 🎉`);
      this.closeModal();
    },

    saveDietPlan() {
      if (!this.planName.trim()) {
        alert("Please give your plan a name! 🌸");
        return;
      }

      if (Object.keys(this.currentConfig.mealConfigs).length === 0) {
        alert("Please configure at least one meal! 💕");
        return;
      }

      const planData = {
        id: Date.now(),
        name: this.planName,
        type: "diet",
        createdAt: new Date().toLocaleDateString(),
        details: {
          mealConfigs: { ...this.currentConfig.mealConfigs },
        },
      };

      this.savedPlans.push(planData);
      this.savePlansToStorage();

      alert(`Diet plan "${this.planName}" saved successfully! 🎉`);
      this.closeModal();
    },

    saveCombinedPlan() {
      if (!this.planName.trim()) {
        alert("Please give your plan a name! 🌸");
        return;
      }

      if (
        !this.currentConfig.exerciseType ||
        !this.currentConfig.exerciseDuration ||
        Object.keys(this.currentConfig.mealConfigs).length === 0
      ) {
        alert("Please complete both exercise and diet configurations! 💕");
        return;
      }

      const planData = {
        id: Date.now(),
        name: this.planName,
        type: "combined",
        createdAt: new Date().toLocaleDateString(),
        details: {
          exerciseType: this.currentConfig.exerciseType,
          exerciseDuration: this.currentConfig.exerciseDuration,
          mealConfigs: { ...this.currentConfig.mealConfigs },
        },
      };

      this.savedPlans.push(planData);
      this.savePlansToStorage();

      alert(`Combined plan "${this.planName}" saved successfully! 🎉`);
      this.closeModal();
    },

    startPlan(planId) {
      this.currentPlan = this.savedPlans.find((plan) => plan.id === planId);
      if (!this.currentPlan) return;

      this.showTracking = true;
      this.$nextTick(() => {
        this.$refs.calendar?.scrollIntoView({ behavior: "smooth" });
      });
    },

    deletePlan(planId) {
      if (confirm("Are you sure you want to delete this plan?")) {
        this.savedPlans = this.savedPlans.filter((plan) => plan.id !== planId);
        this.savePlansToStorage();
      }
    },

    toggleDay(day) {
      const index = this.completedDays.indexOf(day.key);
      if (index > -1) {
        this.completedDays.splice(index, 1);
      } else {
        this.completedDays.push(day.key);
      }
      this.saveCompletedDaysToStorage();
    },

    getPlanTypeText(type) {
      const types = {
        exercise: "🏃‍♀️ Exercise Plan",
        diet: "🥗 Diet Plan",
        combined: "💫 Exercise + Diet",
      };
      return types[type] || type;
    },

    getPlanDetails(plan) {
      if (plan.type === "exercise") {
        return `${plan.details.exerciseType} ${plan.details.exerciseDuration} min`;
      } else if (plan.type === "diet") {
        const meals = Object.keys(plan.details.mealConfigs);
        return `Includes ${meals.length} meal configurations`;
      } else if (plan.type === "combined") {
        const meals = Object.keys(plan.details.mealConfigs);
        return `${plan.details.exerciseType} + ${meals.length} meal configurations`;
      }
      return "";
    },

    savePlansToStorage() {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(
          "weightLossPlans",
          JSON.stringify(this.savedPlans)
        );
      }
    },

    saveCompletedDaysToStorage() {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(
          "completedDays",
          JSON.stringify(this.completedDays)
        );
      }
    },

    loadSavedData() {
      if (typeof localStorage !== "undefined") {
        this.savedPlans = JSON.parse(
          localStorage.getItem("weightLossPlans") || "[]"
        );
        this.completedDays = JSON.parse(
          localStorage.getItem("completedDays") || "[]"
        );
      }
    },
  },
};
</script>

<style scoped>
.plans {
  padding: 5rem 0;
  background: linear-gradient(135deg, #74ebd5, #acb6e5);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-weight: 700;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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
  cursor: pointer;
  overflow: hidden;
}

.plan-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.plan-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s ease;
}

.plan-card:hover::before {
  left: 100%;
}

.plan-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  display: block;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.plan-card h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 600;
}

.plan-features {
  list-style: none;
  margin-bottom: 2rem;
  padding: 0;
}

.plan-features li {
  padding: 0.5rem 0;
  color: #666;
  position: relative;
  padding-left: 1.5rem;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.plan-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4ecdc4;
  font-weight: bold;
  font-size: 1.1rem;
}

.plan-card p {
  color: #777;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.plan-cta {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: auto;
}

.plan-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(78, 205, 196, 0.3);
  background: linear-gradient(135deg, #44a08d, #4ecdc4);
}

.plan-card.featured {
  border: 3px solid #4ecdc4;
  transform: scale(1.05);
  z-index: 2;
}

.plan-card.featured::after {
  content: "MOST POPULAR";
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* .modal-content {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  transform: scale(0.8) translateY(50px);
  transition: all 0.3s ease;
  position: relative;
}

.modal-overlay.active .modal-content {
  transform: scale(1) translateY(0);
} */

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  transition: color 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.modal-close:hover {
  color: #333;
  background: #f5f5f5;
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  display: block;
}

.modal-title {
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 700;
}

.modal-subtitle {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
}

.modal-features {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.modal-features li {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  position: relative;
  padding-left: 2rem;
  color: #555;
  font-size: 1.05rem;
}

.modal-features li:last-child {
  border-bottom: none;
}

.modal-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4ecdc4;
  font-weight: bold;
  font-size: 1.3rem;
}

.modal-cta {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  color: white;
  border: none;
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 2rem;
}

.modal-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(78, 205, 196, 0.4);
  background: linear-gradient(135deg, #44a08d, #4ecdc4);
}

.modal-price {
  text-align: center;
  margin: 2rem 0;
  font-size: 1.1rem;
  color: #666;
}

.modal-price .price-highlight {
  font-size: 2rem;
  font-weight: 700;
  color: #4ecdc4;
  display: block;
  margin: 0.5rem 0;
}

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

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.plan-card.featured {
  animation: pulse 2s infinite;
}

/* Responsive Design */
@media (max-width: 768px) {
  .plans-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  .plan-card {
    padding: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .modal-content {
    padding: 2rem;
    margin: 1rem;
  }

  .modal-title {
    font-size: 1.8rem;
  }

  .modal-icon {
    font-size: 4rem;
  }
}

@media (max-width: 480px) {
  .plans {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .plan-card {
    padding: 1.5rem;
  }

  .plan-icon {
    font-size: 3rem;
  }

  .plan-card h3 {
    font-size: 1.5rem;
  }
}
/* tanchuang */
.inspiration-text {
  background: linear-gradient(135deg, #a8e6cf, #dcedc1);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 25px;
  border-left: 5px solid #00b894;
}

.inspiration-text p {
  color: #2d3436;
  line-height: 1.6;
  margin-bottom: 10px;
}

.options-group {
  margin-bottom: 25px;
}

.options-group h4 {
  color: #2d3436;
  margin-bottom: 15px;
  font-size: 1.3em;
  display: flex;
  align-items: center;
  gap: 10px;
}

.options-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.option-tag {
  background: #f8f9fa;
  border: 2px solid #ddd;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.option-tag:hover {
  border-color: #74b9ff;
  background: #e8f4fd;
}

.option-tag.selected {
  background: #74b9ff;
  color: white;
  border-color: #74b9ff;
}

.option-tag .remove-btn {
  display: none;
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff7675;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  cursor: pointer;
}

.option-tag:hover .remove-btn {
  display: block;
}

.add-option {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.add-input {
  flex: 1;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-family: inherit;
}

.add-btn {
  background: #00b894;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: #00a085;
  transform: translateY(-2px);
}

.meal-config {
  background: #fff5f5;
  border: 2px solid #ff7675;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
}

.meal-config h5 {
  color: #2d3436;
  margin-bottom: 15px;
  font-size: 1.1em;
}

.meal-result {
  background: #e8f5e8;
  border: 2px solid #00b894;
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
}

.meal-result h4 {
  color: #00b894;
  margin-bottom: 10px;
}

.meal-summary {
  color: #2d3436;
  line-height: 1.6;
}

.save-section {
  text-align: center;
  padding: 25px;
  background: linear-gradient(135deg, #a8e6cf, #dcedc1);
  border-radius: 15px;
  margin-top: 20px;
}

.plan-name-input {
  width: 100%;
  max-width: 400px;
  padding: 15px;
  border: 3px solid #fff;
  border-radius: 25px;
  margin: 15px 0;
  font-size: 1.1em;
  text-align: center;
  font-family: inherit;
}

.save-btn {
  background: linear-gradient(135deg, #00b894, #00cec9);
  color: white;
  padding: 15px 40px;
  border: none;
  border-radius: 25px;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  margin: 10px;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 185, 148, 0.3);
}

.saved-plans {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.saved-plan {
  background: linear-gradient(135deg, #a8e6cf, #dcedc1);
  border: 2px solid #00b894;
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.saved-plan:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 185, 148, 0.2);
}

.tracking-section {
  display: none;
  background: linear-gradient(135deg, #fdcb6e, #e17055);
  border-radius: 15px;
  padding: 30px;
  margin-top: 30px;
  color: white;
}

.tracking-section.active {
  display: block;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.calendar-day {
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.calendar-day:hover {
  background: rgba(255, 255, 255, 0.3);
}

.calendar-day.completed {
  background: #00b894;
  border-color: #00b894;
}

.calendar-day.completed::after {
  content: "✓";
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 16px;
  color: white;
}

.emoji {
  font-size: 1.5em;
}

@keyframes celebration {
  0% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.1) rotate(5deg);
  }
  50% {
    transform: scale(1.2) rotate(-5deg);
  }
  75% {
    transform: scale(1.1) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

@media (max-width: 768px) {
  .plan-types {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2em;
  }

  .main-content {
    padding: 20px;
  }

  .section {
    padding: 20px;
  }

  .modal {
    width: 95%;
    padding: 20px;
  }
}
</style>
