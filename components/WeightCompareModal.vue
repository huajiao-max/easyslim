<template>
  <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">
          <span class="compare-icon">⚖️</span>
          体重对比结果
        </h3>
        <button class="close-btn" @click="$emit('close')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body" v-if="compareData">
        <!-- 日期对比 -->
        <div class="date-comparison">
          <div class="date-card start-date">
            <div class="date-label">起始日期</div>
            <div class="date-value">{{ formatDate(compareData.date1) }}</div>
            <div class="weight-value">{{ compareData.weight1 }} kg</div>
          </div>

          <div class="arrow-container">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </div>

          <div class="date-card end-date">
            <div class="date-label">结束日期</div>
            <div class="date-value">{{ formatDate(compareData.date2) }}</div>
            <div class="weight-value">{{ compareData.weight2 }} kg</div>
          </div>
        </div>

        <!-- 对比结果 -->
        <div class="comparison-results">
          <div class="result-card main-result" :class="changeClass">
            <div class="result-icon">{{ changeIcon }}</div>
            <div class="result-content">
              <div class="result-label">体重变化</div>
              <div class="result-value">{{ formatWeightChange() }}</div>
              <div class="result-subtitle">{{ getChangeDescription() }}</div>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">📅</div>
              <div class="stat-content">
                <div class="stat-value">{{ compareData.daysDiff }}</div>
                <div class="stat-label">天数</div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">📊</div>
              <div class="stat-content">
                <div class="stat-value">{{ getDailyAverage() }}</div>
                <div class="stat-label">日均变化</div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">🎯</div>
              <div class="stat-content">
                <div class="stat-value">{{ getWeeklyProjection() }}</div>
                <div class="stat-label">周预测</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 进度可视化 -->
        <div class="progress-visualization">
          <div class="progress-header">
            <span class="progress-label">变化趋势</span>
            <span class="progress-percentage">{{ getPercentageChange() }}</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="progressBarStyle"></div>
          </div>
          <div class="progress-labels">
            <span>{{ compareData.weight1 }} kg</span>
            <span>{{ compareData.weight2 }} kg</span>
          </div>
        </div>

        <!-- 健康提示 -->
        <div class="health-tips" :class="tipClass">
          <div class="tip-icon">{{ tipIcon }}</div>
          <div class="tip-content">
            <div class="tip-title">{{ tipTitle }}</div>
            <div class="tip-text">{{ tipMessage }}</div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="close-btn-footer" @click="$emit('close')">
          关闭
        </button>
        <button class="share-btn" @click="shareResult">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16,6 12,2 8,6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          分享结果
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeightCompareModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    compareData: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  computed: {
    changeClass() {
      if (!this.compareData) return ''

      if (this.compareData.difference > 0) {
        return 'weight-increase'
      } else if (this.compareData.difference < 0) {
        return 'weight-decrease'
      } else {
        return 'weight-same'
      }
    },

    changeIcon() {
      if (!this.compareData) return '➖'

      if (this.compareData.difference > 0) {
        return '📈'
      } else if (this.compareData.difference < 0) {
        return '📉'
      } else {
        return '➖'
      }
    },

    progressBarStyle() {
      if (!this.compareData) return {}

      const maxWeight = Math.max(this.compareData.weight1, this.compareData.weight2)
      const minWeight = Math.min(this.compareData.weight1, this.compareData.weight2)
      const range = maxWeight - minWeight || 1

      const startWeight = this.compareData.weight1
      const endWeight = this.compareData.weight2

      let width = Math.abs(endWeight - startWeight) / range * 100
      width = Math.min(100, Math.max(5, width))

      let backgroundColor = '#4facfe'
      if (this.compareData.difference > 0) {
        backgroundColor = '#ff6b6b'
      } else if (this.compareData.difference < 0) {
        backgroundColor = '#4ecdc4'
      }

      return {
        width: `${width}%`,
        backgroundColor,
        transform: this.compareData.difference < 0 ? 'scaleX(-1)' : 'scaleX(1)'
      }
    },

    tipClass() {
      if (!this.compareData) return ''

      const absChange = Math.abs(this.compareData.difference)
      const dailyChange = absChange / this.compareData.daysDiff

      if (dailyChange > 0.5) {
        return 'tip-warning'
      } else if (this.compareData.difference < 0) {
        return 'tip-success'
      } else {
        return 'tip-info'
      }
    },

    tipIcon() {
      const absChange = Math.abs(this.compareData?.difference || 0)
      const dailyChange = absChange / (this.compareData?.daysDiff || 1)

      if (dailyChange > 0.5) {
        return '⚠️'
      } else if (this.compareData?.difference < 0) {
        return '✅'
      } else {
        return 'ℹ️'
      }
    },

    tipTitle() {
      const absChange = Math.abs(this.compareData?.difference || 0)
      const dailyChange = absChange / (this.compareData?.daysDiff || 1)

      if (dailyChange > 0.5) {
        return '变化较快'
      } else if (this.compareData?.difference < 0) {
        return '减重成功'
      } else if (this.compareData?.difference > 0) {
        return '体重增加'
      } else {
        return '保持稳定'
      }
    },

    tipMessage() {
      const absChange = Math.abs(this.compareData?.difference || 0)
      const dailyChange = absChange / (this.compareData?.daysDiff || 1)

      if (dailyChange > 0.5) {
        return '体重变化较快，建议关注饮食和运动的平衡，避免过度节食或暴饮暴食。'
      } else if (this.compareData?.difference < 0) {
        return '恭喜你的减重成果！继续保持健康的生活方式，稳步朝目标前进。'
      } else if (this.compareData?.difference > 0) {
        return '体重有所增加，可以适当调整饮食结构，增加运动量来控制体重。'
      } else {
        return '体重保持稳定，继续维持现有的健康生活方式。'
      }
    }
  },
  methods: {
    formatDate(date) {
      return date.toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric'
      })
    },

    formatWeightChange() {
      if (!this.compareData) return '0 kg'

      const change = this.compareData.difference
      if (change > 0) {
        return `+${change.toFixed(1)} kg`
      } else if (change < 0) {
        return `${change.toFixed(1)} kg`
      } else {
        return '无变化'
      }
    },

    getChangeDescription() {
      if (!this.compareData) return ''

      const change = this.compareData.difference
      if (change > 0) {
        return '体重增加了'
      } else if (change < 0) {
        return '体重减少了'
      } else {
        return '体重无变化'
      }
    },

    getDailyAverage() {
      if (!this.compareData || this.compareData.daysDiff === 0) return '0 kg'

      const dailyChange = this.compareData.difference / this.compareData.daysDiff
      if (dailyChange > 0) {
        return `+${dailyChange.toFixed(2)} kg`
      } else if (dailyChange < 0) {
        return `${dailyChange.toFixed(2)} kg`
      } else {
        return '0 kg'
      }
    },

    getWeeklyProjection() {
      if (!this.compareData || this.compareData.daysDiff === 0) return '0 kg'

      const dailyChange = this.compareData.difference / this.compareData.daysDiff
      const weeklyChange = dailyChange * 7

      if (weeklyChange > 0) {
        return `+${weeklyChange.toFixed(1)} kg`
      } else if (weeklyChange < 0) {
        return `${weeklyChange.toFixed(1)} kg`
      } else {
        return '0 kg'
      }
    },

    getPercentageChange() {
      if (!this.compareData) return '0%'

      const percentage = (this.compareData.difference / this.compareData.weight1) * 100
      if (percentage > 0) {
        return `+${percentage.toFixed(1)}%`
      } else if (percentage < 0) {
        return `${percentage.toFixed(1)}%`
      } else {
        return '0%'
      }
    },

    shareResult() {
      if (!this.compareData) return

      const shareText = `体重对比结果：
起始：${this.formatDate(this.compareData.date1)} ${this.compareData.weight1}kg
结束：${this.formatDate(this.compareData.date2)} ${this.compareData.weight2}kg
变化：${this.formatWeightChange()}
天数：${this.compareData.daysDiff}天`

      if (navigator.share) {
        navigator.share({
          title: '体重对比结果',
          text: shareText
        })
      } else {
        navigator.clipboard.writeText(shareText).then(() => {
          this.$message.success('结果已复制到剪贴板')
        })
      }
    },

    handleOverlayClick() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-container {
  background: white;
  border-radius: 24px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  background: linear-gradient(135deg, #70e0c0 0%, #5bccaa 100%);
  color: white;
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.compare-icon {
  font-size: 1.5rem;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.modal-body {
  padding: 2rem;
  max-height: 70vh;
  overflow-y: auto;
}

.date-comparison {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
}

.date-card {
  flex: 1;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
}

.start-date {
  border-color: #ffa8a8;
  background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
}

.end-date {
  border-color: #9ae6b4;
  background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%);
}

.date-label {
  font-size: 0.85rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.date-value {
  font-size: 1rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.75rem;
}

.weight-value {
  font-size: 1.3rem;
  font-weight: 800;
  color: #4a5568;
}

.arrow-container {
  color: #cbd5e0;
  flex-shrink: 0;
}

.comparison-results {
  margin-bottom: 2rem;
}

.result-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.main-result.weight-increase {
  background: linear-gradient(135deg, #fed7d7 0%, #fbb6ce 100%);
  border: 2px solid #f56565;
}

.main-result.weight-decrease {
  background: linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%);
  border: 2px solid #48bb78;
}

.main-result.weight-same {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%);
  border: 2px solid #a0aec0;
}

.result-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.result-content {
  flex: 1;
}

.result-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.result-value {
  font-size: 2rem;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.result-subtitle {
  font-size: 1rem;
  color: #4a5568;
  font-weight: 500;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-item:hover {
  border-color: #70e0c0;
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.progress-visualization {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.progress-label {
  font-weight: 600;
  color: #4a5568;
}

.progress-percentage {
  font-weight: 700;
  color: #70e0c0;
  font-size: 1.1rem;
}

.progress-bar-container {
  background: #e2e8f0;
  border-radius: 10px;
  height: 8px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 10px;
  transition: all 0.5s ease;
  background: linear-gradient(90deg, #70e0c0 0%, #5bccaa 100%);
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.health-tips {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 16px;
  border: 2px solid;
}

.tip-success {
  background: #f0fff4;
  border-color: #9ae6b4;
}

.tip-warning {
  background: #fffaf0;
  border-color: #fbd38d;
}

.tip-info {
  background: #ebf8ff;
  border-color: #90cdf4;
}

.tip-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.tip-title {
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.tip-text {
  color: #4a5568;
  line-height: 1.6;
  font-size: 0.95rem;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem 2rem;
  background: #f7fafc;
}

.close-btn-footer, .share-btn {
  flex: 1;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.close-btn-footer {
  background: #edf2f7;
  color: #4a5568;
}

.close-btn-footer:hover {
  background: #e2e8f0;
}

.share-btn {
  background: linear-gradient(135deg, #70e0c0 0%, #5bccaa 100%);
  color: white;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(112, 224, 192, 0.3);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 768px) {
  .modal-container {
    width: 95%;
    margin: 1rem;
  }

  .date-comparison {
    flex-direction: column;
  }

  .arrow-container {
    transform: rotate(90deg);
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .modal-footer {
    flex-direction: column;
  }

  .result-card {
    padding: 1.5rem;
  }

  .result-value {
    font-size: 1.5rem;
  }
}
</style>