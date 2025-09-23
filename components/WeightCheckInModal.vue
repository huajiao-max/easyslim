<template>
  <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">
          <span class="date-icon">📅</span>
          {{ formatDate(selectedDate) }}
        </h3>
        <button class="close-btn" @click="$emit('close')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <div class="weight-input-section">
          <label class="input-label">
            <span class="label-text">体重 (kg)</span>
            <span class="label-required">*</span>
          </label>

          <div class="weight-input-container">
            <input
              type="number"
              v-model="weight"
              step="0.1"
              min="20"
              max="300"
              placeholder="请输入体重"
              class="weight-input"
              :class="{ error: showError && !weight }"
              @blur="validateWeightRange"
              @keyup.enter="handleSave"
            />
            <span class="input-unit">kg</span>
          </div>

          <div v-if="showError && !weight" class="error-message">
            请输入有效的体重数值
          </div>
        </div>

        <div class="note-section">
          <label class="input-label">
            <span class="label-text">备注</span>
            <span class="label-optional">(可选)</span>
          </label>

          <textarea
            v-model="note"
            placeholder="记录今日感受、饮食或运动情况..."
            class="note-textarea"
            rows="3"
            maxlength="200"
          ></textarea>

          <div class="char-count">{{ note.length }}/200</div>
        </div>

        <!-- 历史记录提示 -->
        <div v-if="existingWeight" class="history-hint">
          <div class="hint-icon">💡</div>
          <div class="hint-content">
            <p class="hint-text">之前记录：{{ existingWeight }} kg</p>
            <p class="hint-subtext">更新将覆盖原有记录</p>
          </div>
        </div>

        <!-- 快速输入按钮 -->
        <div class="quick-actions">
          <div class="quick-actions-label">快速调整</div>
          <div class="quick-buttons">
            <button
              v-for="adjustment in quickAdjustments"
              :key="adjustment.value"
              class="quick-btn"
              @click="applyQuickAdjustment(adjustment.value)"
              :disabled="!weight"
            >
              {{ adjustment.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="cancel-btn" @click="$emit('close')">
          取消
        </button>
        <button
          class="save-btn"
          @click="handleSave"
          :disabled="!weight || isNaN(parseFloat(weight))"
          :class="{ saving: isSaving }"
        >
          <span v-if="isSaving" class="loading-spinner"></span>
          {{ isSaving ? '保存中...' : (existingWeight ? '更新记录' : '保存记录') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeightCheckInModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    selectedDate: {
      type: Date,
      default: null
    },
    existingWeight: {
      type: Number,
      default: null
    }
  },
  emits: ['close', 'save'],
  data() {
    return {
      weight: '',
      note: '',
      showError: false,
      isSaving: false,
      quickAdjustments: [
        { label: '-0.5', value: -0.5 },
        { label: '-0.1', value: -0.1 },
        { label: '+0.1', value: 0.1 },
        { label: '+0.5', value: 0.5 }
      ]
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.resetForm()
        this.$nextTick(() => {
          const input = this.$el.querySelector('.weight-input')
          if (input) input.focus()
        })
      }
    },
    existingWeight(newVal) {
      if (newVal) {
        this.weight = newVal.toString()
      }
    }
  },
  methods: {
    resetForm() {
      this.weight = this.existingWeight ? this.existingWeight.toString() : ''
      this.note = ''
      this.showError = false
      this.isSaving = false
    },

    validateInput() {
      this.showError = false
    },

    validateWeightRange() {
      // 只在失去焦点时验证和修正范围
      const weightNum = parseFloat(this.weight)
      if (this.weight && !isNaN(weightNum)) {
        if (weightNum < 20) {
          this.weight = '20'
          this.$message.warning('体重不能低于20kg，已自动调整为20kg')
        } else if (weightNum > 300) {
          this.weight = '300'
          this.$message.warning('体重不能超过300kg，已自动调整为300kg')
        }
      }
    },

    applyQuickAdjustment(adjustment) {
      if (!this.weight) return

      const currentWeight = parseFloat(this.weight)
      const newWeight = Math.max(20, Math.min(300, currentWeight + adjustment))
      this.weight = newWeight.toFixed(1)
    },

    async handleSave() {
      if (!this.weight || isNaN(parseFloat(this.weight))) {
        this.showError = true
        return
      }

      this.isSaving = true

      try {
        // 模拟保存延迟
        await new Promise(resolve => setTimeout(resolve, 300))

        const weightData = {
          weight: parseFloat(this.weight),
          note: this.note.trim()
        }

        this.$emit('save', weightData)
      } catch (error) {
        console.error('Save error:', error)
      } finally {
        this.isSaving = false
      }
    },

    handleOverlayClick() {
      this.$emit('close')
    },

    formatDate(date) {
      if (!date) return ''

      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      })
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
  max-width: 500px;
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

.date-icon {
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
  max-height: 60vh;
  overflow-y: auto;
}

.weight-input-section {
  margin-bottom: 2rem;
}

.input-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #2d3748;
}

.label-text {
  font-size: 1rem;
}

.label-required {
  color: #e53e3e;
  font-size: 0.9rem;
}

.label-optional {
  color: #718096;
  font-size: 0.85rem;
  font-weight: 400;
}

.weight-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.weight-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  background: #f7fafc;
  transition: all 0.3s ease;
}

.weight-input:focus {
  outline: none;
  border-color: #70e0c0;
  background: white;
  box-shadow: 0 0 0 3px rgba(112, 224, 192, 0.1);
}

.weight-input.error {
  border-color: #e53e3e;
  background: #fed7d7;
}

.input-unit {
  position: absolute;
  right: 1rem;
  color: #718096;
  font-weight: 600;
  font-size: 1rem;
  pointer-events: none;
}

.error-message {
  color: #e53e3e;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  font-weight: 500;
}

.note-section {
  margin-bottom: 2rem;
}

.note-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: #f7fafc;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  transition: all 0.3s ease;
}

.note-textarea:focus {
  outline: none;
  border-color: #70e0c0;
  background: white;
  box-shadow: 0 0 0 3px rgba(112, 224, 192, 0.1);
}

.char-count {
  text-align: right;
  color: #718096;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.history-hint {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #ebf8ff;
  border: 1px solid #bee3f8;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.hint-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.hint-content {
  flex: 1;
}

.hint-text {
  font-weight: 600;
  color: #2b6cb0;
  margin: 0 0 0.25rem 0;
}

.hint-subtext {
  color: #4299e1;
  font-size: 0.85rem;
  margin: 0;
}

.quick-actions {
  margin-bottom: 1rem;
}

.quick-actions-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.75rem;
}

.quick-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.quick-btn {
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  color: #4a5568;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.quick-btn:hover:not(:disabled) {
  border-color: #70e0c0;
  background: #edf2f7;
  transform: translateY(-1px);
}

.quick-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem 2rem;
  background: #f7fafc;
}

.cancel-btn, .save-btn {
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

.cancel-btn {
  background: #edf2f7;
  color: #4a5568;
}

.cancel-btn:hover {
  background: #e2e8f0;
}

.save-btn {
  background: linear-gradient(135deg, #70e0c0 0%, #5bccaa 100%);
  color: white;
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(112, 224, 192, 0.3);
}

.save-btn:disabled {
  background: #cbd5e0;
  color: #a0aec0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.save-btn.saving {
  pointer-events: none;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
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

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .modal-container {
    width: 95%;
    margin: 1rem;
  }

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .modal-title {
    font-size: 1.1rem;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .modal-footer {
    padding: 1rem 1.5rem 1.5rem;
    flex-direction: column;
  }

  .quick-buttons {
    justify-content: center;
  }
}
</style>