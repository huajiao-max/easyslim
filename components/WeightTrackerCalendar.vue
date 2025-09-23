<template>
  <div class="weight-tracker-calendar">
    <!-- 顶部控制栏 -->
    <div class="control-bar">
      <div class="month-selector">
        <button class="nav-btn" @click="previousMonth">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>

        <div class="month-display">
          <span class="month-text">{{ currentMonthText }}</span>
          <span class="year-text">{{ currentYear }}</span>
        </div>

        <button class="nav-btn" @click="nextMonth">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>

      <div class="action-buttons">
        <button
          class="compare-btn"
          :class="{ active: compareMode }"
          @click="toggleCompareMode"
        >
          {{ compareMode ? '取消对比' : '对比模式' }}
        </button>

        <button class="today-btn" @click="goToToday">
          今天
        </button>
      </div>
    </div>

    <!-- 对比选择提示 -->
    <div v-if="compareMode" class="compare-hint">
      <p v-if="selectedDates.length === 0">请选择要对比的日期</p>
      <p v-else-if="selectedDates.length === 1">已选择 {{ formatDate(selectedDates[0]) }}，请选择第二个日期进行对比</p>
      <p v-else>正在对比 {{ formatDate(selectedDates[0]) }} 和 {{ formatDate(selectedDates[1]) }}</p>
    </div>

    <!-- 日历表格 -->
    <div class="calendar-container">
      <div class="calendar-header">
        <div class="day-name" v-for="day in dayNames" :key="day">{{ day }}</div>
      </div>

      <div class="calendar-body">
        <div
          v-for="(week, weekIndex) in calendarWeeks"
          :key="weekIndex"
          class="calendar-week"
        >
          <div
            v-for="(day, dayIndex) in week"
            :key="dayIndex"
            class="calendar-day"
            :class="getDayClass(day)"
            @click="handleDayClick(day)"
          >
            <div class="day-number">{{ day.date }}</div>
            <div v-if="day.weight" class="day-weight">
              {{ day.weight }} kg
            </div>
            <div v-if="day.weightChange" class="weight-change" :class="day.weightChangeClass">
              {{ day.weightChange }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-cards" v-if="monthStats">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <div class="stat-value">{{ monthStats.totalRecords }}</div>
          <div class="stat-label">本月打卡</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">⚖️</div>
        <div class="stat-content">
          <div class="stat-value">{{ monthStats.averageWeight }} kg</div>
          <div class="stat-label">平均体重</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" :class="monthStats.changeClass">{{ monthStats.changeIcon }}</div>
        <div class="stat-content">
          <div class="stat-value" :class="monthStats.changeClass">{{ monthStats.totalChange }}</div>
          <div class="stat-label">月度变化</div>
        </div>
      </div>
    </div>

    <!-- 体重打卡弹窗 -->
    <weight-check-in-modal
      :visible="modalVisible"
      :selected-date="selectedDate"
      :existing-weight="existingWeight"
      @close="closeModal"
      @save="saveWeight"
    />

    <!-- 对比结果弹窗 -->
    <weight-compare-modal
      :visible="compareModalVisible"
      :compare-data="compareData"
      @close="closeCompareModal"
    />
  </div>
</template>

<script>
import WeightCheckInModal from './WeightCheckInModal.vue'
import WeightCompareModal from './WeightCompareModal.vue'

export default {
  name: 'WeightTrackerCalendar',
  components: {
    WeightCheckInModal,
    WeightCompareModal
  },
  data() {
    return {
      currentDate: new Date(),
      weightRecords: [],
      modalVisible: false,
      selectedDate: null,
      existingWeight: null,
      compareMode: false,
      selectedDates: [],
      compareModalVisible: false,
      compareData: null,
      dayNames: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  computed: {
    currentYear() {
      return this.currentDate.getFullYear()
    },
    currentMonth() {
      return this.currentDate.getMonth()
    },
    currentMonthText() {
      const months = [
        '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
      ]
      return months[this.currentMonth]
    },
    calendarWeeks() {
      const weeks = []
      const firstDay = new Date(this.currentYear, this.currentMonth, 1)
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0)

      // 获取第一天是星期几（0-6，0是星期日）
      const firstDayOfWeek = firstDay.getDay()

      // 计算需要显示的天数
      const daysInMonth = lastDay.getDate()

      let currentWeek = []

      // 填充月初空白
      for (let i = 0; i < firstDayOfWeek; i++) {
        const prevDate = new Date(this.currentYear, this.currentMonth, -(firstDayOfWeek - 1 - i))
        currentWeek.push({
          date: prevDate.getDate(),
          isCurrentMonth: false,
          fullDate: new Date(prevDate)
        })
      }

      // 填充当月日期
      for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(this.currentYear, this.currentMonth, day)
        const dayData = this.getDayData(dayDate)

        currentWeek.push({
          date: day,
          isCurrentMonth: true,
          fullDate: dayDate,
          ...dayData
        })

        // 如果是星期六或者是月末，开始新的一周
        if (currentWeek.length === 7) {
          weeks.push(currentWeek)
          currentWeek = []
        }
      }

      // 填充月末空白
      if (currentWeek.length > 0) {
        const remainingDays = 7 - currentWeek.length
        for (let i = 1; i <= remainingDays; i++) {
          const nextDate = new Date(this.currentYear, this.currentMonth + 1, i)
          currentWeek.push({
            date: i,
            isCurrentMonth: false,
            fullDate: nextDate
          })
        }
        weeks.push(currentWeek)
      }

      return weeks
    },
    monthStats() {
      const currentMonthRecords = this.weightRecords.filter(record => {
        const recordDate = new Date(record.date)
        return recordDate.getFullYear() === this.currentYear &&
               recordDate.getMonth() === this.currentMonth
      })

      if (currentMonthRecords.length === 0) return null

      const weights = currentMonthRecords.map(r => r.weight)
      const totalRecords = currentMonthRecords.length
      const averageWeight = (weights.reduce((sum, w) => sum + w, 0) / totalRecords).toFixed(1)

      // 计算月度变化
      const sortedRecords = currentMonthRecords.sort((a, b) => new Date(a.date) - new Date(b.date))
      const firstWeight = sortedRecords[0].weight
      const lastWeight = sortedRecords[sortedRecords.length - 1].weight
      const totalChange = (lastWeight - firstWeight).toFixed(1)

      let changeClass = ''
      let changeIcon = ''
      let changeText = totalChange

      if (parseFloat(totalChange) > 0) {
        changeClass = 'weight-increase'
        changeIcon = '📈'
        changeText = `+${totalChange} kg`
      } else if (parseFloat(totalChange) < 0) {
        changeClass = 'weight-decrease'
        changeIcon = '📉'
        changeText = `${totalChange} kg`
      } else {
        changeClass = 'weight-same'
        changeIcon = '➖'
        changeText = '无变化'
      }

      return {
        totalRecords,
        averageWeight,
        totalChange: changeText,
        changeClass,
        changeIcon
      }
    }
  },
  mounted() {
    this.loadRecords()
  },
  methods: {
    getDayData(date) {
      const dateStr = this.formatDateKey(date)
      const record = this.weightRecords.find(r => r.date === dateStr)

      if (!record) return { weight: null }

      // 计算体重变化
      const previousRecord = this.getPreviousRecord(date)
      if (previousRecord) {
        const change = record.weight - previousRecord.weight
        let weightChangeClass = ''
        let weightChange = ''

        if (change > 0) {
          weightChangeClass = 'increase'
          weightChange = `+${change.toFixed(1)}`
        } else if (change < 0) {
          weightChangeClass = 'decrease'
          weightChange = change.toFixed(1)
        }

        return {
          weight: record.weight,
          weightChange,
          weightChangeClass
        }
      }

      return { weight: record.weight }
    },

    getPreviousRecord(currentDate) {
      const currentDateStr = this.formatDateKey(currentDate)
      const sortedRecords = this.weightRecords
        .filter(r => r.date < currentDateStr)
        .sort((a, b) => new Date(b.date) - new Date(a.date))

      return sortedRecords[0] || null
    },

    getDayClass(day) {
      const classes = ['calendar-day-content']

      if (!day.isCurrentMonth) {
        classes.push('other-month')
      }

      if (this.isToday(day.fullDate)) {
        classes.push('today')
      }

      if (day.weight) {
        classes.push('has-record')
      }

      if (this.compareMode && this.isDateSelected(day.fullDate)) {
        classes.push('selected')
      }

      return classes
    },

    isToday(date) {
      const today = new Date()
      return date.toDateString() === today.toDateString()
    },

    isDateSelected(date) {
      return this.selectedDates.some(selected =>
        selected.toDateString() === date.toDateString()
      )
    },

    handleDayClick(day) {
      if (!day.isCurrentMonth) return

      if (this.compareMode) {
        this.handleCompareSelection(day.fullDate)
      } else {
        this.openModal(day.fullDate)
      }
    },

    handleCompareSelection(date) {
      const dateStr = this.formatDateKey(date)
      const hasRecord = this.weightRecords.some(r => r.date === dateStr)

      if (!hasRecord) {
        this.$message.warning('该日期没有体重记录')
        return
      }

      const isAlreadySelected = this.isDateSelected(date)

      if (isAlreadySelected) {
        // 移除已选择的日期
        this.selectedDates = this.selectedDates.filter(selected =>
          selected.toDateString() !== date.toDateString()
        )
      } else if (this.selectedDates.length < 2) {
        // 添加新的选择
        this.selectedDates.push(new Date(date))

        // 如果选择了两个日期，显示对比结果
        if (this.selectedDates.length === 2) {
          this.showCompareResult()
        }
      } else {
        // 替换第二个选择
        this.selectedDates[1] = new Date(date)
        this.showCompareResult()
      }
    },

    showCompareResult() {
      const [date1, date2] = this.selectedDates
      const record1 = this.weightRecords.find(r => r.date === this.formatDateKey(date1))
      const record2 = this.weightRecords.find(r => r.date === this.formatDateKey(date2))

      this.compareData = {
        date1: date1,
        date2: date2,
        weight1: record1.weight,
        weight2: record2.weight,
        difference: record2.weight - record1.weight,
        daysDiff: Math.abs(Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24)))
      }

      this.compareModalVisible = true
    },

    openModal(date) {
      this.selectedDate = date
      const dateStr = this.formatDateKey(date)
      const existingRecord = this.weightRecords.find(r => r.date === dateStr)
      this.existingWeight = existingRecord ? existingRecord.weight : null
      this.modalVisible = true
    },

    closeModal() {
      this.modalVisible = false
      this.selectedDate = null
      this.existingWeight = null
    },

    closeCompareModal() {
      this.compareModalVisible = false
      this.compareData = null
    },

    saveWeight(weightData) {
      const dateStr = this.formatDateKey(this.selectedDate)
      const existingIndex = this.weightRecords.findIndex(r => r.date === dateStr)

      const record = {
        date: dateStr,
        weight: weightData.weight,
        note: weightData.note || '',
        timestamp: new Date().getTime()
      }

      if (existingIndex >= 0) {
        this.weightRecords[existingIndex] = record
      } else {
        this.weightRecords.push(record)
      }

      this.saveRecords()
      this.closeModal()
    },

    toggleCompareMode() {
      this.compareMode = !this.compareMode
      this.selectedDates = []
      if (this.compareModalVisible) {
        this.closeCompareModal()
      }
    },

    previousMonth() {
      this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1)
    },

    nextMonth() {
      this.currentDate = new Date(this.currentYear, this.currentMonth + 1, 1)
    },

    goToToday() {
      this.currentDate = new Date()
    },

    formatDateKey(date) {
      return date.toISOString().split('T')[0]
    },

    formatDate(date) {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },

    saveRecords() {
      localStorage.setItem('weightRecords', JSON.stringify(this.weightRecords))
    },

    loadRecords() {
      const saved = localStorage.getItem('weightRecords')
      if (saved) {
        this.weightRecords = JSON.parse(saved)
      }
    }
  }
}
</script>

<style scoped>
.weight-tracker-calendar {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #70e0c0 0%, #5bccaa 100%);
  color: white;
}

.month-selector {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.month-display {
  text-align: center;
  min-width: 200px;
}

.month-text {
  font-size: 2rem;
  font-weight: 700;
  display: block;
}

.year-text {
  font-size: 1rem;
  opacity: 0.8;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.compare-btn, .today-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.compare-btn:hover, .today-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.compare-btn.active {
  background: rgba(255, 255, 255, 0.9);
  color: #70e0c0;
}

.compare-hint {
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
  padding: 1rem 2rem;
  color: #1976d2;
  font-weight: 500;
}

.calendar-container {
  padding: 2rem;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  margin-bottom: 1rem;
}

.day-name {
  text-align: center;
  font-weight: 700;
  color: #666;
  padding: 1rem;
  background: #f8f9fa;
  font-size: 0.9rem;
}

.calendar-body {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.calendar-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.calendar-day {
  aspect-ratio: 1;
  background: #fff;
  border: 2px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.calendar-day:hover {
  border-color: #70e0c0;
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(112, 224, 192, 0.2);
}

.calendar-day-content {
  padding: 0.75rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.other-month {
  opacity: 0.3;
  pointer-events: none;
}

.today {
  background: linear-gradient(135deg, #70e0c0 0%, #5bccaa 100%);
  color: white;
  border-color: #70e0c0;
}

.has-record {
  background: linear-gradient(135deg, #70e0c0 0%, #5bccaa 100%);
  color: white;
  border-color: #70e0c0;
}

.selected {
  border-color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  border-width: 3px;
}

.day-number {
  font-weight: 700;
  font-size: 1.1rem;
}

.day-weight {
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 0.25rem;
}

.weight-change {
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
  border-radius: 10px;
  margin-top: 0.25rem;
  text-align: center;
  font-weight: 600;
}

.weight-change.increase {
  background: rgba(244, 67, 54, 0.2);
  color: #d32f2f;
}

.weight-change.decrease {
  background: rgba(76, 175, 80, 0.2);
  color: #388e3c;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  background: #f8f9fa;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #70e0c0 0%, #5bccaa 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon.weight-increase {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
}

.stat-icon.weight-decrease {
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.stat-value.weight-increase {
  color: #e53e3e;
}

.stat-value.weight-decrease {
  color: #38a169;
}

.stat-label {
  color: #718096;
  font-size: 0.9rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .control-bar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .month-display {
    min-width: auto;
  }

  .month-text {
    font-size: 1.5rem;
  }

  .action-buttons {
    width: 100%;
    justify-content: center;
  }

  .calendar-container {
    padding: 1rem;
  }

  .calendar-day {
    aspect-ratio: 0.8;
  }

  .day-number {
    font-size: 0.9rem;
  }

  .day-weight {
    font-size: 0.75rem;
  }

  .weight-change {
    font-size: 0.7rem;
  }

  .stats-cards {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}
</style>