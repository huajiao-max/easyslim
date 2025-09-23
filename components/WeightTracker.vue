<template>
  <div class="weight-tracker">
    <h2 class="section-title">体重打卡记录</h2>

    <!-- 打卡表单 -->
    <div class="check-in-form">
      <h3>今日打卡</h3>
      <div class="form-group">
        <label for="weight">体重 (kg):</label>
        <input
          type="number"
          id="weight"
          v-model="currentWeight"
          step="0.1"
          placeholder="请输入当前体重"
          class="weight-input"
        />
      </div>
      <div class="form-group">
        <label for="date">日期:</label>
        <input
          type="date"
          id="date"
          v-model="currentDate"
          class="date-input"
        />
      </div>
      <button @click="addWeightRecord" class="check-in-btn" :disabled="!currentWeight">
        打卡记录
      </button>
    </div>

    <!-- 记录列表 -->
    <div class="records-section" v-if="weightRecords.length > 0">
      <h3>打卡记录</h3>
      <div class="records-list">
        <div
          v-for="(record, index) in sortedRecords"
          :key="index"
          class="record-item"
        >
          <div class="record-date">{{ formatDate(record.date) }}</div>
          <div class="record-weight">{{ record.weight }} kg</div>
          <div
            class="weight-change"
            :class="getWeightChangeClass(index)"
            v-if="index < sortedRecords.length - 1"
          >
            {{ getWeightChangeText(index) }}
          </div>
          <button @click="deleteRecord(index)" class="delete-btn">删除</button>
        </div>
      </div>

      <!-- 统计信息 -->
      <div class="statistics" v-if="weightRecords.length >= 2">
        <h4>统计信息</h4>
        <div class="stat-item">
          <span>起始体重: {{ getFirstWeight() }} kg</span>
        </div>
        <div class="stat-item">
          <span>当前体重: {{ getLatestWeight() }} kg</span>
        </div>
        <div class="stat-item">
          <span class="total-change" :class="getTotalChangeClass()">
            总变化: {{ getTotalChange() }}
          </span>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <p>还没有打卡记录，开始您的第一次打卡吧！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeightTracker',
  data() {
    return {
      currentWeight: '',
      currentDate: new Date().toISOString().split('T')[0],
      weightRecords: []
    }
  },
  computed: {
    sortedRecords() {
      return [...this.weightRecords].sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  },
  mounted() {
    this.loadRecords()
  },
  methods: {
    addWeightRecord() {
      if (!this.currentWeight || !this.currentDate) return

      const newRecord = {
        weight: parseFloat(this.currentWeight),
        date: this.currentDate,
        timestamp: new Date().getTime()
      }

      this.weightRecords.push(newRecord)
      this.saveRecords()
      this.currentWeight = ''
      this.currentDate = new Date().toISOString().split('T')[0]
    },

    deleteRecord(index) {
      const actualIndex = this.weightRecords.findIndex(
        record => record.timestamp === this.sortedRecords[index].timestamp
      )
      this.weightRecords.splice(actualIndex, 1)
      this.saveRecords()
    },

    getWeightChangeText(index) {
      const current = this.sortedRecords[index]
      const previous = this.sortedRecords[index + 1]
      const change = current.weight - previous.weight

      if (change > 0) {
        return `+${change.toFixed(1)} kg`
      } else if (change < 0) {
        return `${change.toFixed(1)} kg`
      } else {
        return '无变化'
      }
    },

    getWeightChangeClass(index) {
      const current = this.sortedRecords[index]
      const previous = this.sortedRecords[index + 1]
      const change = current.weight - previous.weight

      if (change > 0) {
        return 'weight-increase'
      } else if (change < 0) {
        return 'weight-decrease'
      } else {
        return 'weight-same'
      }
    },

    getTotalChange() {
      if (this.weightRecords.length < 2) return '0 kg'

      const first = this.getFirstWeight()
      const latest = this.getLatestWeight()
      const change = latest - first

      if (change > 0) {
        return `+${change.toFixed(1)} kg`
      } else if (change < 0) {
        return `${change.toFixed(1)} kg`
      } else {
        return '无变化'
      }
    },

    getTotalChangeClass() {
      if (this.weightRecords.length < 2) return ''

      const first = this.getFirstWeight()
      const latest = this.getLatestWeight()
      const change = latest - first

      if (change > 0) {
        return 'weight-increase'
      } else if (change < 0) {
        return 'weight-decrease'
      } else {
        return 'weight-same'
      }
    },

    getFirstWeight() {
      if (this.weightRecords.length === 0) return 0
      const firstRecord = this.weightRecords.reduce((earliest, current) => {
        return new Date(current.date) < new Date(earliest.date) ? current : earliest
      })
      return firstRecord.weight
    },

    getLatestWeight() {
      if (this.weightRecords.length === 0) return 0
      const latestRecord = this.weightRecords.reduce((latest, current) => {
        return new Date(current.date) > new Date(latest.date) ? current : latest
      })
      return latestRecord.weight
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
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
.weight-tracker {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.check-in-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.check-in-form h3 {
  margin-bottom: 1.5rem;
  color: #555;
  font-size: 1.3rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #666;
}

.weight-input, .date-input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e1e1e1;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.weight-input:focus, .date-input:focus {
  outline: none;
  border-color: #4CAF50;
}

.check-in-btn {
  background: #4CAF50;
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.check-in-btn:hover:not(:disabled) {
  background: #45a049;
}

.check-in-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.records-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.records-section h3 {
  margin-bottom: 1.5rem;
  color: #555;
  font-size: 1.3rem;
}

.records-list {
  max-height: 400px;
  overflow-y: auto;
}

.record-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  transition: background 0.3s;
}

.record-item:hover {
  background: #f5f5f5;
}

.record-item:last-child {
  border-bottom: none;
}

.record-date {
  font-weight: bold;
  color: #666;
  flex: 1;
}

.record-weight {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  flex: 1;
  text-align: center;
}

.weight-change {
  font-weight: bold;
  flex: 1;
  text-align: center;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
}

.weight-increase {
  color: #d32f2f;
  background: #ffebee;
}

.weight-decrease {
  color: #2e7d32;
  background: #e8f5e8;
}

.weight-same {
  color: #666;
  background: #f5f5f5;
}

.delete-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 0.3rem 0.8rem;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.3s;
}

.delete-btn:hover {
  background: #d32f2f;
}

.statistics {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2196F3;
}

.statistics h4 {
  margin-bottom: 1rem;
  color: #1976D2;
}

.stat-item {
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

.total-change {
  font-weight: bold;
  font-size: 1.2rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.empty-state p {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .weight-tracker {
    margin: 1rem;
    padding: 1rem;
  }

  .record-item {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .record-date, .record-weight, .weight-change {
    flex: none;
  }
}
</style>