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
          @click="handleToolClick(tool.title)"
        >
          <span class="tool-icon">{{ tool.icon }}</span>
          <h3>{{ tool.title }}</h3>
          <p>{{ tool.description }}</p>
        </div>
      </div>

      <!-- Dialog for BMI Calculator -->
      <el-dialog
        v-model="bmiDialogVisible"
        title="BMI Calculator"
        width="500px"
      >
        <div class="calculator">
          <h3>📏 BMI Calculator</h3>
          <div class="form-group">
            <label>Unit System:</label>
            <select v-model="bmiUnit">
              <option value="metric">Metric (kg/cm)</option>
              <option value="imperial">Imperial (lb/in)</option>
            </select>
          </div>

          <div v-if="bmiUnit === 'metric'">
            <div class="form-row">
              <div class="form-group">
                <label>Weight (kg):</label>
                <input
                  type="number"
                  v-model="weightKg"
                  placeholder="70"
                  step="0.1"
                />
              </div>
              <div class="form-group">
                <label>Height (cm):</label>
                <input
                  type="number"
                  v-model="heightCm"
                  placeholder="170"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          <div v-else>
            <div class="form-row">
              <div class="form-group">
                <label>Weight (lb):</label>
                <input
                  type="number"
                  v-model="weightLb"
                  placeholder="154"
                  step="0.1"
                />
              </div>
              <div class="form-group">
                <label>Height (in):</label>
                <input
                  type="number"
                  v-model="heightIn"
                  placeholder="67"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          <button class="calculate-btn" @click="calculateBMI">
            Calculate BMI
          </button>

          <div v-if="bmiResult" class="result">
            <h4>Your BMI Result</h4>
            <p>BMI: {{ bmiValue.toFixed(1) }}</p>
            <p>
              <span :class="['bmi-category', bmiCategory.class]">
                {{ bmiCategory.text }}
              </span>
            </p>
          </div>
        </div>
      </el-dialog>

      <!-- Dialog for Calorie Calculator -->
      <el-dialog
        v-model="calorieDialogVisible"
        title="Calorie Calculator"
        width="500px"
      >
        <div class="calculator">
          <div class="tabs">
            <div
              class="tab"
              :class="{ active: activeTab === 'food' }"
              @click="activeTab = 'food'"
            >
              Food Calories
            </div>
            <div
              class="tab"
              :class="{ active: activeTab === 'exercise' }"
              @click="activeTab = 'exercise'"
            >
              Exercise Calories
            </div>
          </div>

          <!-- Food Calorie Calculator -->
          <div v-if="activeTab === 'food'" class="tab-content">
            <div class="form-group">
              <label>Food Item:</label>
              <select v-model="selectedFood">
                <option value="">Select Food</option>
                <option
                  v-for="(calories, food) in foodCalories"
                  :key="food"
                  :value="food"
                >
                  {{ getFoodName(food) }} ({{ calories }} cal)
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                v-model="foodQuantity"
                placeholder="1"
                step="0.1"
                min="0.1"
              />
            </div>
            <button class="calculate-btn" @click="calculateFoodCalories">
              Calculate Food Calories
            </button>

            <div v-if="calorieResult && activeTab === 'food'" class="result">
              <h4>Calorie Result</h4>
              <p>{{ calorieResult.value }}</p>
              <p>{{ calorieResult.details }}</p>
            </div>
          </div>

          <!-- Exercise Calorie Calculator -->
          <div v-if="activeTab === 'exercise'" class="tab-content">
            <div class="form-group">
              <label>Body Weight (kg):</label>
              <input
                type="number"
                v-model="bodyWeight"
                placeholder="70"
                step="0.1"
              />
            </div>
            <div class="form-group">
              <label>Exercise Type:</label>
              <select v-model="selectedExercise">
                <option value="">Select Exercise</option>
                <option
                  v-for="(met, exercise) in exerciseMET"
                  :key="exercise"
                  :value="exercise"
                >
                  {{ getExerciseName(exercise) }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Duration (minutes):</label>
              <input
                type="number"
                v-model="exerciseDuration"
                placeholder="30"
                step="1"
                min="1"
              />
            </div>
            <button class="calculate-btn" @click="calculateExerciseCalories">
              Calculate Exercise Calories
            </button>
          </div>
        </div>
      </el-dialog>

      <!-- Dialog for Meal Planner -->
      <el-dialog v-model="mealDialogVisible" title="Meal Planner" width="800px">
        <div class="meal-planner">
          <h3>🍽️ Meal Planner</h3>
          <div class="food-categories">
            <div
              v-for="category in foodCategories"
              :key="category"
              class="food-category"
            >
              <h4>{{ category }}</h4>
              <div class="food-scroller">
                <div
                  v-for="food in getFoodsByCategory(category)"
                  :key="food.id"
                  class="food-card"
                  @click="selectFood(food)"
                >
                  <img
                    :src="food.image || '/placeholder-food.png'"
                    :alt="food.name"
                  />
                  <h5>{{ food.name }}</h5>
                  <p>{{ food.calories }} cal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        v-model="calorieDeficitDialogVisible"
        title="Calorie Deficit Calculator"
        width="500px"
      >
        <div class="calculator">
          <div class="tabs">
            <div
              class="tab"
              :class="{ active: activeTab === 'deficit' }"
              @click="activeTab = 'deficit'"
            >
              Deficit Calculator
            </div>
            <div
              class="tab"
              :class="{ active: activeTab === 'tracker' }"
              @click="activeTab = 'tracker'"
            >
              Daily Tracker
            </div>
          </div>

          <!-- Calorie Deficit Calculator -->
          <div v-if="activeTab === 'deficit'" class="tab-content">
            <div class="form-group">
              <label>Gender:</label>
              <select v-model="userGender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div class="form-group">
              <label>Age:</label>
              <input
                type="number"
                v-model="userAge"
                placeholder="30"
                min="15"
                max="100"
              />
            </div>

            <div class="form-group">
              <label>Height (cm):</label>
              <input
                type="number"
                v-model="userHeight"
                placeholder="170"
                min="100"
                max="250"
              />
            </div>

            <div class="form-group">
              <label>Weight (kg):</label>
              <input
                type="number"
                v-model="userWeight"
                placeholder="70"
                min="30"
                max="200"
              />
            </div>

            <div class="form-group">
              <label>Activity Level:</label>
              <select v-model="userActivity">
                <option value="1.2">Sedentary (little or no exercise)</option>
                <option value="1.375">
                  Lightly active (light exercise 1-3 days/week)
                </option>
                <option value="1.55">
                  Moderately active (moderate exercise 3-5 days/week)
                </option>
                <option value="1.725">
                  Very active (hard exercise 6-7 days/week)
                </option>
                <option value="1.9">
                  Extra active (very hard exercise & physical job)
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Goal:</label>
              <select v-model="userGoal">
                <option value="-250">Mild weight loss (0.25 kg/week)</option>
                <option value="-500">Moderate weight loss (0.5 kg/week)</option>
                <option value="-750">Fast weight loss (0.75 kg/week)</option>
                <option value="-1000">
                  Aggressive weight loss (1 kg/week)
                </option>
              </select>
            </div>

            <button class="calculate-btn" @click="calculateDeficit">
              Calculate My Deficit
            </button>

            <div v-if="deficitResult" class="result">
              <h4>Your Calorie Needs</h4>
              <p>
                <strong>Maintenance:</strong>
                {{ deficitResult.maintenance }} kcal/day
              </p>
              <p>
                <strong>Target Intake:</strong>
                {{ deficitResult.target }} kcal/day
              </p>
              <p>
                <strong>Weekly Deficit:</strong>
                {{ Math.abs(deficitResult.weeklyDeficit) }} kcal
              </p>
              <p>
                <strong>Projected Weight Loss:</strong>
                {{ deficitResult.projectedLoss }} kg/week
              </p>
            </div>
          </div>

          <!-- Daily Calorie Tracker -->
          <div v-if="activeTab === 'tracker'" class="tab-content">
            <div class="form-group">
              <label>Daily Calorie Budget:</label>
              <input type="number" v-model="dailyBudget" placeholder="1800" />
            </div>

            <div class="form-group">
              <label>Food Consumed (kcal):</label>
              <input type="number" v-model="foodConsumed" placeholder="0" />
            </div>

            <div class="form-group">
              <label>Exercise Calories Burned (kcal):</label>
              <input type="number" v-model="exerciseBurned" placeholder="0" />
            </div>

            <button class="calculate-btn" @click="calculateDailyBalance">
              Calculate Daily Balance
            </button>

            <div v-if="dailyResult" class="result">
              <h4>Daily Summary</h4>
              <p>
                <strong>Remaining Calories:</strong>
                {{ dailyResult.remaining }} kcal
              </p>
              <p>
                <strong>Current Deficit:</strong> {{ dailyResult.deficit }} kcal
              </p>
              <p>
                <strong>Projected Weekly Deficit:</strong>
                {{ dailyResult.weeklyProjection }} kcal
              </p>
            </div>
          </div>
        </div>
      </el-dialog>
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
  data() {
    return {
      bmiDialogVisible: false,
      calorieDialogVisible: false,
      mealDialogVisible: false,
      activeTab: "food",

      // BMI Calculator data
      bmiUnit: "metric",
      weightKg: null,
      heightCm: null,
      weightLb: null,
      heightIn: null,
      bmiValue: null,
      bmiResult: false,

      // Calorie Calculator data
      selectedFood: "",
      foodQuantity: 1,
      bodyWeight: null,
      selectedExercise: "",
      exerciseDuration: null,
      calorieResult: null,

      // Food data
      foodCalories: {
        apple: 52,
        banana: 89,
        rice: 205,
        chicken: 165,
        bread: 79,
        egg: 70,
        milk: 150,
        pasta: 220,
      },

      exerciseMET: {
        walking: 3.8,
        running: 8.0,
        cycling: 6.8,
        swimming: 6.0,
        yoga: 2.5,
        weightlifting: 3.0,
      },

      foodCategories: ["Fruits", "Vegetables", "Meat", "Dairy", "Grains"],
      foods: [
        {
          id: 1,
          name: "Apple",
          category: "Fruits",
          calories: 52,
          image: "/apple.png",
        },
        {
          id: 2,
          name: "Banana",
          category: "Fruits",
          calories: 89,
          image: "/banana.png",
        },
        {
          id: 3,
          name: "Orange",
          category: "Fruits",
          calories: 47,
          image: "/orange.png",
        },
        {
          id: 4,
          name: "Broccoli",
          category: "Vegetables",
          calories: 34,
          image: "/broccoli.png",
        },
        {
          id: 5,
          name: "Carrot",
          category: "Vegetables",
          calories: 41,
          image: "/carrot.png",
        },
        {
          id: 6,
          name: "Chicken Breast",
          category: "Meat",
          calories: 165,
          image: "/chicken.png",
        },
        {
          id: 7,
          name: "Beef",
          category: "Meat",
          calories: 250,
          image: "/beef.png",
        },
        {
          id: 8,
          name: "Milk",
          category: "Dairy",
          calories: 150,
          image: "/milk.png",
        },
        {
          id: 9,
          name: "Cheese",
          category: "Dairy",
          calories: 402,
          image: "/cheese.png",
        },
        {
          id: 10,
          name: "Rice",
          category: "Grains",
          calories: 205,
          image: "/rice.png",
        },
        {
          id: 11,
          name: "Bread",
          category: "Grains",
          calories: 79,
          image: "/bread.png",
        },
      ],
      calorieDeficitDialogVisible: false,
      // Deficit Calculator
      userGender: "male",
      userAge: 30,
      userHeight: 170,
      userWeight: 70,
      userActivity: "1.55",
      userGoal: "-500",
      deficitResult: null,

      // Daily Tracker
      dailyBudget: 1800,
      foodConsumed: 0,
      exerciseBurned: 0,
      dailyResult: null,
    };
  },
  computed: {
    bmiCategory() {
      if (!this.bmiValue) return null;

      if (this.bmiValue < 18.5) {
        return { text: "Underweight", class: "underweight" };
      } else if (this.bmiValue < 25) {
        return { text: "Normal Weight", class: "normal" };
      } else if (this.bmiValue < 30) {
        return { text: "Overweight", class: "overweight" };
      } else {
        return { text: "Obese", class: "obese" };
      }
    },
  },
  methods: {
    handleToolClick(toolName) {
      switch (toolName) {
        case "BMI Calculator":
          this.bmiDialogVisible = true;
          break;
        case "Calorie Calculator":
          this.calorieDialogVisible = true;
          break;
        case "Meal Planner":
          // TODO: Implement later

          // this.mealDialogVisible = true;
          break;

        case "Progress Tracker":
          this.$router.push('/progress-tracker');
          break;
        case "Calorie Deficit Calculator":
          this.calorieDeficitDialogVisible = true;
          break;
      }
    },

    calculateBMI() {
      let bmi;

      if (this.bmiUnit === "metric") {
        if (!this.weightKg || !this.heightCm) {
          this.$message.error("Please enter valid weight and height values.");
          return;
        }
        const heightM = this.heightCm / 100;
        bmi = this.weightKg / (heightM * heightM);
      } else {
        if (!this.weightLb || !this.heightIn) {
          this.$message.error("Please enter valid weight and height values.");
          return;
        }
        bmi = (this.weightLb / (this.heightIn * this.heightIn)) * 703;
      }

      this.bmiValue = bmi;
      this.bmiResult = true;
    },

    calculateFoodCalories() {
      if (!this.selectedFood || !this.foodQuantity) {
        this.$message.error("Please select a food item and enter quantity.");
        return;
      }

      const calories = this.foodCalories[this.selectedFood] * this.foodQuantity;
      const foodName = this.getFoodName(this.selectedFood);

      this.calorieResult = {
        value: `${calories.toFixed(0)} calories`,
        details: `${this.foodQuantity} × ${foodName}`,
      };
    },

    calculateExerciseCalories() {
      if (
        !this.bodyWeight ||
        !this.selectedExercise ||
        !this.exerciseDuration
      ) {
        this.$message.error("Please fill in all exercise fields.");
        return;
      }

      const met = this.exerciseMET[this.selectedExercise];
      const hours = this.exerciseDuration / 60;
      const calories = met * this.bodyWeight * hours;
      const exerciseName = this.getExerciseName(this.selectedExercise);

      this.calorieResult = {
        value: `${calories.toFixed(0)} calories burned`,
        details: `${this.exerciseDuration} min of ${exerciseName}`,
      };
    },

    getFoodName(foodKey) {
      const names = {
        apple: "Apple (medium)",
        banana: "Banana (medium)",
        rice: "Rice (1 cup cooked)",
        chicken: "Chicken Breast (100g)",
        bread: "White Bread (1 slice)",
        egg: "Egg (large)",
        milk: "Milk (1 cup)",
        pasta: "Pasta (1 cup cooked)",
      };
      return names[foodKey] || foodKey;
    },

    getExerciseName(exerciseKey) {
      const names = {
        walking: "Walking (moderate pace)",
        running: "Running (8 km/h)",
        cycling: "Cycling (moderate)",
        swimming: "Swimming (moderate)",
        yoga: "Yoga",
        weightlifting: "Weight Lifting",
      };
      return names[exerciseKey] || exerciseKey;
    },

    getFoodsByCategory(category) {
      return this.foods.filter((food) => food.category === category);
    },

    selectFood(food) {
      this.$message.success(`Added ${food.name} to your meal plan`);
      // TODO: Implement meal plan logic
    },
    calculateDeficit() {
      // Calculate BMR using Mifflin-St Jeor Equation
      let bmr;
      if (this.userGender === "male") {
        bmr =
          10 * this.userWeight + 6.25 * this.userHeight - 5 * this.userAge + 5;
      } else {
        bmr =
          10 * this.userWeight +
          6.25 * this.userHeight -
          5 * this.userAge -
          161;
      }

      // Calculate TDEE (Total Daily Energy Expenditure)
      const tdee = bmr * parseFloat(this.userActivity);
      const target = tdee + parseInt(this.userGoal);
      const weeklyDeficit = parseInt(this.userGoal) * 7;
      const projectedLoss = Math.abs(weeklyDeficit / 7700).toFixed(2); // 7700 kcal ≈ 1kg fat

      this.deficitResult = {
        maintenance: Math.round(tdee),
        target: Math.round(target),
        weeklyDeficit,
        projectedLoss,
      };
    },

    calculateDailyBalance() {
      const remaining = this.dailyBudget - this.foodConsumed;
      const deficit = remaining + this.exerciseBurned;
      const weeklyProjection = deficit * 7;

      this.dailyResult = {
        remaining,
        deficit,
        weeklyProjection,
      };
    },
  },
};
</script>

<style scoped>
.food-categories {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.food-scroller {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 0;
}

.food-card {
  min-width: 120px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.food-card:hover {
  transform: scale(1.05);
}

.food-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}

.food-card h5 {
  margin: 5px 0;
}

.food-card p {
  color: #666;
  font-size: 0.9em;
}

.tools {
  padding: 5rem 0;
  background: #fff;
  color: #333;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.tool-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
  animation: slideInUp 0.6s ease forwards;
  cursor: pointer;
}

.tool-card:hover {
  background: #e9ecef;
  transform: translateY(-5px);
  border-color: #6aa4c3;
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
.calculator-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.calculator {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.calculator h3 {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 1.3em;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #6aa4c3;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.calculate-btn {
  width: 100%;
  padding: 12px;
  background: #6aa4c3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 15px 0;
}

.calculate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(106, 164, 195, 0.4);
}

.result {
  background: #f0f8f0;
  border: 2px solid #6aa4c3;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
  text-align: center;
}

.result.hidden {
  display: none;
}

.result h4 {
  color: #2d5a27;
  margin-bottom: 10px;
  font-size: 1.2em;
}

.result p {
  color: #555;
  margin-bottom: 5px;
}

.bmi-category {
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 15px;
  color: white;
  display: inline-block;
  margin-top: 10px;
}

.underweight {
  background: #3498db;
}
.normal {
  background: #27ae60;
}
.overweight {
  background: #f39c12;
}
.obese {
  background: #e74c3c;
}

.tabs {
  display: flex;
  margin-bottom: 25px;
  background: #f8f8f8;
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab {
  flex: 1;
  padding: 12px 15px;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1.05em;
  color: #555;
}

.tab.active {
  background: #6aa4c3;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.tab-content {
  padding: 15px 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-size: 1.05em;
  color: #444;
}

.form-group input,
.form-group select {
  padding: 12px;
  font-size: 1.05em;
}

.calculate-btn {
  margin-top: 25px;
  padding: 14px;
  font-size: 1.1em;
}

.result {
  margin-top: 25px;
  padding: 20px;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .calculator-grid {
    grid-template-columns: 1fr;
  }
}
</style>
