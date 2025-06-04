<template>
    <div class="weight-loss-planner">
      <!-- Plan Selection Section -->
      <section class="section">
        <h2>Choose Your Weight Loss Plan1 💪</h2>
        <div class="plan-types">
          <div
            class="plan-card"
            @click="openModal('exercise')"
            :class="{ selected: selectedPlan === 'exercise' }"
          >
            <h3>
              <span class="emoji">🏃‍♀️</span>
              Exercise Plan
            </h3>
            <p>
              Burn calories and boost metabolism through regular exercise. Perfect
              for fitness enthusiasts!
            </p>
          </div>
  
          <div
            class="plan-card"
            @click="openModal('diet')"
            :class="{ selected: selectedPlan === 'diet' }"
          >
            <h3>
              <span class="emoji">🥗</span>
              Diet Plan
            </h3>
            <p>
              Control calorie intake with balanced nutrition. Start changing with
              every meal!
            </p>
          </div>
  
          <div
            class="plan-card"
            @click="openModal('combined')"
            :class="{ selected: selectedPlan === 'combined' }"
          >
            <h3>
              <span class="emoji">💫</span>
              Exercise + Diet
            </h3>
            <p>
              Best of both worlds! Combined approach for more effective results!
            </p>
          </div>
        </div>
      </section>
  
      <!-- Exercise Plan Modal -->
      <div
        v-if="activeModal === 'exercise'"
        class="modal-overlay"
        @click="closeModal"
      >
        <div class="modal" @click.stop>
          <button class="modal-close" @click="closeModal">×</button>
          <h3>🏃‍♀️ Create Exercise Plan</h3>
  
          <div class="inspiration-text">
            <p>💡 <strong>Gentle Reminder:</strong></p>
            <p>
              Don't add overly strict exercise routines or set unrealistic workout
              durations. Choose activities that fit naturally into your daily life
              - even a 30-minute walk after dinner counts as a win!
            </p>
            <p>
              Moderate daily exercise helps us stay consistent. If we exhaust
              ourselves from the start, it might have the opposite effect.
              Remember, consistency beats intensity! 🌟
            </p>
          </div>
  
          <div class="modal-content">
            <div class="options-group">
              <h4>🎯 Choose Exercise Type</h4>
              <div class="options-list">
                <div
                  v-for="type in exerciseTypes"
                  :key="type"
                  class="option-tag"
                  :class="{ selected: selectedExerciseType === type }"
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
                  @keydown.enter="addExerciseType"
                />
                <button class="add-btn" @click="addExerciseType">Add</button>
              </div>
            </div>
  
            <div class="options-group">
              <h4>⏰ Choose Exercise Duration</h4>
              <div class="options-list">
                <div
                  v-for="duration in exerciseDurations"
                  :key="duration"
                  class="option-tag"
                  :class="{ selected: selectedExerciseDuration === duration }"
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
                  @keydown.enter="addExerciseDuration"
                />
                <button class="add-btn" @click="addExerciseDuration">Add</button>
              </div>
            </div>
          </div>
  
          <div class="save-section">
            <h3>💾 Save Your Exercise Plan</h3>
            <input
              v-model="exercisePlanName"
              type="text"
              class="plan-name-input"
              placeholder="Give your exercise plan a cute name~"
            />
            <br />
            <button class="save-btn" @click="saveExercisePlan">
              Save Plan ✨
            </button>
          </div>
        </div>
      </div>
  
      <!-- Diet Plan Modal -->
      <div
        v-if="activeModal === 'diet'"
        class="modal-overlay"
        @click="closeModal"
      >
        <div class="modal" @click.stop>
          <button class="modal-close" @click="closeModal">×</button>
          <h3>🍽️ Create Diet Plan</h3>
  
          <div class="inspiration-text">
            <p>💡 <strong>Diet Tips:</strong></p>
            <p>
              Balanced nutrition is more important than extreme dieting. Our goal
              is to build sustainable eating habits, not short-term extreme
              restrictions.
            </p>
            <p>
              Choose an appropriate level of fullness and maintain nutritional
              balance. Let every meal become part of your healthy lifestyle! 🥗
            </p>
          </div>
  
          <div class="modal-content">
            <div class="options-group">
              <h4>🍽️ Meal Settings</h4>
              <div class="options-list">
                <div
                  v-for="meal in mealTypes"
                  :key="meal"
                  class="option-tag"
                  :class="{ selected: selectedMeals.includes(meal) }"
                  @click="toggleMealSelection(meal)"
                >
                  {{ meal }}
                </div>
              </div>
              <div class="add-option">
                <input
                  v-model="newMealType"
                  type="text"
                  class="add-input"
                  placeholder="Add new meal type..."
                  @keydown.enter="addMealType"
                />
                <button class="add-btn" @click="addMealType">Add</button>
              </div>
            </div>
  
            <div class="options-group">
              <h4>🥘 Diet Descriptions</h4>
              <div class="options-list">
                <div
                  v-for="desc in dietDescriptions"
                  :key="desc"
                  class="option-tag"
                >
                  {{ desc }}
                </div>
              </div>
              <div class="add-option">
                <input
                  v-model="newDietDescription"
                  type="text"
                  class="add-input"
                  placeholder="Add new diet description..."
                  @keydown.enter="addDietDescription"
                />
                <button class="add-btn" @click="addDietDescription">Add</button>
              </div>
            </div>
  
            <div class="options-group">
              <h4>🍯 Fullness Level Settings</h4>
              <div class="options-list">
                <div
                  v-for="level in fullnessLevels"
                  :key="level"
                  class="option-tag"
                >
                  {{ level }}
                </div>
              </div>
            </div>
  
            <div class="meal-configs">
              <div
                v-for="meal in selectedMealsList"
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
                          mealConfigs[meal] &&
                          mealConfigs[meal].description === desc,
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
                          mealConfigs[meal] &&
                          mealConfigs[meal].fullness === level,
                      }"
                      @click="selectMealOption(meal, 'fullness', level)"
                    >
                      {{ level }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="meal-result">
              <h4>📋 Your Diet Plan Preview</h4>
              <div class="meal-summary" v-html="dietSummary"></div>
            </div>
          </div>
  
          <div class="save-section">
            <h3>💾 Save Your Diet Plan</h3>
            <input
              v-model="dietPlanName"
              type="text"
              class="plan-name-input"
              placeholder="Give your diet plan a cute name~"
            />
            <br />
            <button class="save-btn" @click="saveDietPlan">Save Plan ✨</button>
          </div>
        </div>
      </div>
  
      <!-- Combined Plan Modal -->
      <div
        v-if="activeModal === 'combined'"
        class="modal-overlay"
        @click="closeModal"
      >
        <div class="modal" @click.stop>
          <button class="modal-close" @click="closeModal">×</button>
          <h3>💫 Create Combined Plan</h3>
  
          <div class="inspiration-text">
            <p>💡 <strong>Combined Plan Tips:</strong></p>
            <p>
              Combining exercise with diet is the most effective weight loss
              approach. But remember, don't put too much pressure on yourself -
              choose a plan that fits your lifestyle rhythm.
            </p>
            <p>
              Take it step by step, let change become a natural part of your life,
              not a burden! 💪
            </p>
          </div>
  
          <div class="modal-content combined-content">
            <div class="exercise-section">
              <h4>🏃‍♀️ Exercise Section</h4>
              <div class="options-group">
                <h5>Exercise Type</h5>
                <div class="options-list">
                  <div
                    v-for="type in exerciseTypes"
                    :key="type"
                    class="option-tag"
                    :class="{ selected: selectedCombinedExerciseType === type }"
                    @click="selectCombinedExerciseType(type)"
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
                      selected: selectedCombinedExerciseDuration === duration,
                    }"
                    @click="selectCombinedExerciseDuration(duration)"
                  >
                    {{ duration }} min
                  </div>
                </div>
              </div>
            </div>
  
            <div class="diet-section">
              <h4>🍽️ Diet Section</h4>
              <div class="meal-configs">
                <div
                  v-for="meal in selectedCombinedMealsList"
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
                            combinedMealConfigs[meal] &&
                            combinedMealConfigs[meal].description === desc,
                        }"
                        @click="
                          selectCombinedMealOption(meal, 'description', desc)
                        "
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
                            combinedMealConfigs[meal] &&
                            combinedMealConfigs[meal].fullness === level,
                        }"
                        @click="selectCombinedMealOption(meal, 'fullness', level)"
                      >
                        {{ level }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="meal-result">
            <h4>📋 Your Combined Plan Preview</h4>
            <div class="meal-summary" v-html="combinedSummary"></div>
          </div>
  
          <div class="save-section">
            <h3>💾 Save Your Combined Plan</h3>
            <input
              v-model="combinedPlanName"
              type="text"
              class="plan-name-input"
              placeholder="Give your combined plan a cute name~"
            />
            <br />
            <button class="save-btn" @click="saveCombinedPlan">
              Save Plan ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "WeightLossPlanSelector",
    data() {
      return {
        // Modal state
        activeModal: null,
        selectedPlan: null,
  
        // Preset data
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
  
        // Exercise plan data
        selectedExerciseType: "",
        selectedExerciseDuration: "",
        newExerciseType: "",
        newExerciseDuration: "",
        exercisePlanName: "",
  
        // Diet plan data
        selectedMeals: [],
        mealConfigs: {},
        newMealType: "",
        newDietDescription: "",
        dietPlanName: "",
  
        // Combined plan data
        selectedCombinedExerciseType: "",
        selectedCombinedExerciseDuration: "",
        combinedMealConfigs: {},
        combinedPlanName: "",
  
        // Saved plans
        savedPlans: [],
      };
    },
  
    computed: {
      selectedMealsList() {
        return this.selectedMeals.length > 0
          ? this.selectedMeals
          : this.mealTypes;
      },
  
      selectedCombinedMealsList() {
        return this.mealTypes;
      },
  
      dietSummary() {
        let summary = "";
        Object.keys(this.mealConfigs).forEach((meal) => {
          const config = this.mealConfigs[meal];
          if (config && config.description && config.fullness) {
            summary += `${meal}: ${config.description} ${config.fullness}<br>`;
          }
        });
        return summary || "Please configure your meal settings...";
      },
  
      combinedSummary() {
        let summary = "";
  
        // Exercise section
        if (
          this.selectedCombinedExerciseType &&
          this.selectedCombinedExerciseDuration
        ) {
          summary += `<strong>🏃‍♀️ Exercise:</strong> ${this.selectedCombinedExerciseType} ${this.selectedCombinedExerciseDuration} min<br><br>`;
        }
  
        // Diet section
        summary += "<strong>🍽️ Diet:</strong><br>";
        Object.keys(this.combinedMealConfigs).forEach((meal) => {
          const config = this.combinedMealConfigs[meal];
          if (config && config.description && config.fullness) {
            summary += `${meal}: ${config.description} ${config.fullness}<br>`;
          }
        });
  
        return summary || "Please configure your exercise and diet plan...";
      },
    },
  
    mounted() {
      // Initialize selected meals with all meal types for diet plan
      this.selectedMeals = [...this.mealTypes];
  
      // Load saved plans from localStorage if available
      this.loadSavedPlans();
  
      // Add keyboard event listener
      document.addEventListener("keydown", this.handleKeydown);
    },
  
    beforeDestroy() {
      // Clean up event listener
      document.removeEventListener("keydown", this.handleKeydown);
    },
  
    methods: {
      // Modal methods
      openModal(type) {
        this.activeModal = type;
        this.selectedPlan = type;
        this.resetCurrentConfig();
  
        // Prevent body scrolling
        document.body.style.overflow = "hidden";
  
        // Initialize default selections for diet and combined plans
        if (type === "diet" || type === "combined") {
          this.selectedMeals = [...this.mealTypes];
        }
      },
  
      closeModal() {
        this.activeModal = null;
        this.selectedPlan = null;
        document.body.style.overflow = "auto";
      },
  
      handleKeydown(e) {
        if (e.key === "Escape" && this.activeModal) {
          this.closeModal();
        }
      },
  
      resetCurrentConfig() {
        this.selectedExerciseType = "";
        this.selectedExerciseDuration = "";
        this.exercisePlanName = "";
        this.selectedMeals = [];
        this.mealConfigs = {};
        this.dietPlanName = "";
        this.selectedCombinedExerciseType = "";
        this.selectedCombinedExerciseDuration = "";
        this.combinedMealConfigs = {};
        this.combinedPlanName = "";
      },
  
      // Exercise plan methods
      selectExerciseType(type) {
        this.selectedExerciseType =
          this.selectedExerciseType === type ? "" : type;
      },
  
      selectExerciseDuration(duration) {
        this.selectedExerciseDuration =
          this.selectedExerciseDuration === duration ? "" : duration;
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
          this.newExerciseDuration = "";
        } else if (value > 120) {
          alert("Exercise duration cannot exceed 2 hours! 😊");
        }
      },
  
      saveExercisePlan() {
        if (!this.exercisePlanName.trim()) {
          alert("Please give your plan a name! 🌸");
          return;
        }
  
        if (!this.selectedExerciseType || !this.selectedExerciseDuration) {
          alert("Please select exercise type and duration! 💕");
          return;
        }
  
        const planData = {
          id: Date.now(),
          name: this.exercisePlanName,
          type: "exercise",
          createdAt: new Date().toLocaleDateString(),
          details: {
            exerciseType: this.selectedExerciseType,
            exerciseDuration: this.selectedExerciseDuration,
          },
        };
  
        this.savedPlans.push(planData);
        this.savePlansToStorage();
  
        alert(`Exercise plan "${this.exercisePlanName}" saved successfully! 🎉`);
        this.closeModal();
  
        // Emit event to parent component
        this.$emit("plan-saved", planData);
      },
  
      // Diet plan methods
      toggleMealSelection(meal) {
        const index = this.selectedMeals.indexOf(meal);
        if (index > -1) {
          this.selectedMeals.splice(index, 1);
          // Remove meal config when meal is deselected
          this.$delete(this.mealConfigs, meal);
        } else {
          this.selectedMeals.push(meal);
        }
      },
  
      addMealType() {
        const value = this.newMealType.trim();
        if (value && !this.mealTypes.includes(value)) {
          this.mealTypes.push(value);
          this.newMealType = "";
        }
      },
  
      addDietDescription() {
        const value = this.newDietDescription.trim();
        if (value && !this.dietDescriptions.includes(value)) {
          this.dietDescriptions.push(value);
          this.newDietDescription = "";
        }
      },
  
      selectMealOption(meal, type, value) {
        if (!this.mealConfigs[meal]) {
          this.$set(this.mealConfigs, meal, {});
        }
        this.$set(this.mealConfigs[meal], type, value);
      },
  
      saveDietPlan() {
        if (!this.dietPlanName.trim()) {
          alert("Please give your plan a name! 🌸");
          return;
        }
  
        if (Object.keys(this.mealConfigs).length === 0) {
          alert("Please configure at least one meal! 💕");
          return;
        }
  
        const planData = {
          id: Date.now(),
          name: this.dietPlanName,
          type: "diet",
          createdAt: new Date().toLocaleDateString(),
          details: {
            mealConfigs: { ...this.mealConfigs },
          },
        };
  
        this.savedPlans.push(planData);
        this.savePlansToStorage();
  
        alert(`Diet plan "${this.dietPlanName}" saved successfully! 🎉`);
        this.closeModal();
  
        // Emit event to parent component
        this.$emit("plan-saved", planData);
      },
  
      // Combined plan methods
      selectCombinedExerciseType(type) {
        this.selectedCombinedExerciseType =
          this.selectedCombinedExerciseType === type ? "" : type;
      },
  
      selectCombinedExerciseDuration(duration) {
        this.selectedCombinedExerciseDuration =
          this.selectedCombinedExerciseDuration === duration ? "" : duration;
      },
  
      selectCombinedMealOption(meal, type, value) {
        if (!this.combinedMealConfigs[meal]) {
          this.$set(this.combinedMealConfigs, meal, {});
        }
        this.$set(this.combinedMealConfigs[meal], type, value);
      },
  
      saveCombinedPlan() {
        if (!this.combinedPlanName.trim()) {
          alert("Please give your plan a name! 🌸");
          return;
        }
  
        if (
          !this.selectedCombinedExerciseType ||
          !this.selectedCombinedExerciseDuration ||
          Object.keys(this.combinedMealConfigs).length === 0
        ) {
          alert("Please complete both exercise and diet configurations! 💕");
          return;
        }
  
        const planData = {
          id: Date.now(),
          name: this.combinedPlanName,
          type: "combined",
          createdAt: new Date().toLocaleDateString(),
          details: {
            exerciseType: this.selectedCombinedExerciseType,
            exerciseDuration: this.selectedCombinedExerciseDuration,
            mealConfigs: { ...this.combinedMealConfigs },
          },
        };
  
        this.savedPlans.push(planData);
        this.savePlansToStorage();
  
        alert(`Combined plan "${this.combinedPlanName}" saved successfully! 🎉`);
        this.closeModal();
  
        // Emit event to parent component
        this.$emit("plan-saved", planData);
      },
  
      // Storage methods
      savePlansToStorage() {
        // In Nuxt, you might want to use a different storage method
        // For now, using localStorage as in the original code
        if (process.client) {
          localStorage.setItem(
            "weightLossPlans",
            JSON.stringify(this.savedPlans)
          );
        }
      },
  
      loadSavedPlans() {
        if (process.client) {
          const saved = localStorage.getItem("weightLossPlans");
          if (saved) {
            this.savedPlans = JSON.parse(saved);
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .features {
    padding: 5rem 0;
    background: #f8f9fa;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .feature-card {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
    animation: slideInUp 0.6s ease forwards;
  }
  
  .feature-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: left 0.5s ease;
  }
  
  .feature-card:hover::before {
    left: 0;
  }
  
  .feature-card:hover {
    transform: translateY(-10px);
  }
  
  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  .feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .feature-card p {
    color: #666;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
  /* ------------------ */
  .weight-loss-planner {
    font-family: "Comic Sans MS", cursive, sans-serif;
  }
  
  .section {
    margin-bottom: 40px;
    padding: 30px;
    background: #f8f9fa;
    border-radius: 15px;
    border: 3px dashed #74b9ff;
    position: relative;
  }
  
  .section::before {
    content: "📝";
    position: absolute;
    top: -15px;
    left: 20px;
    font-size: 30px;
    background: #fff;
    padding: 5px 10px;
    border-radius: 50%;
  }
  
  .section h2 {
    color: #2d3436;
    margin-bottom: 20px;
    font-size: 1.8em;
    margin-left: 40px;
  }
  
  /* Plan cards */
  .plan-types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .plan-card {
    background: linear-gradient(135deg, #fff, #f1f2f6);
    border: 2px solid #ddd;
    border-radius: 15px;
    padding: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .plan-card::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(116, 185, 255, 0.1) 0%,
      transparent 70%
    );
    transform: scale(0);
    transition: transform 0.5s ease;
  }
  
  .plan-card:hover::before {
    transform: scale(1);
  }
  
  .plan-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    border-color: #74b9ff;
  }
  
  .plan-card.selected {
    border-color: #00b894;
    background: linear-gradient(135deg, #a8e6cf, #dcedc1);
  }
  
  .plan-card h3 {
    font-size: 1.5em;
    margin-bottom: 15px;
    color: #2d3436;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .plan-card p {
    color: #636e72;
    line-height: 1.6;
  }
  
  .emoji {
    font-size: 1.5em;
  }
  
  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background: #fff;
    border-radius: 20px;
    padding: 30px;
    max-width: 800px;
    max-height: 90vh;
    width: 90%;
    overflow-y: auto;
    position: relative;
    animation: modalSlideIn 0.3s ease;
  }
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-50px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .modal-close {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #636e72;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  .modal-close:hover {
    background: #f8f9fa;
    color: #2d3436;
  }
  
  .modal h3 {
    color: #2d3436;
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.8em;
  }
  
  .modal-content {
    margin-bottom: 30px;
  }
  
  .combined-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  </style>
  