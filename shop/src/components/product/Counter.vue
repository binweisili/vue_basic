<template>
    <div class="counter">
      <button class="counter-btn decrease" @click="decrease" :disabled="value <= min">-</button>
      <input type="number" class="counter-input" v-model.number="inputValue" :min="min" :max="max" @blur="handleBlur">
      <button class="counter-btn increase" @click="increase" :disabled="value >= max">+</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Counter',
    props: {
      value: {
        type: Number,
        required: true
      },
      min: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: 99
      }
    },
    computed: {
      inputValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    },
    methods: {
      decrease() {
        if (this.value > this.min) {
          this.$emit('input', this.value - 1)
        }
      },
      increase() {
        if (this.value < this.max) {
          this.$emit('input', this.value + 1)
        }
      },
      handleBlur() {
        let value = parseInt(this.inputValue)
        if (isNaN(value)) {
          value = this.min
        } else {
          if (value < this.min) value = this.min
          if (value > this.max) value = this.max
        }
        this.$emit('input', value)
      }
    }
  }
  </script>
  
  <style scoped>
  .counter {
    display: flex;
    align-items: center;
    height: 30px;
  }
  .counter-input {
    width: 40px;
    height: 100%;
    text-align: center;
    border: 1px solid #dcdfe6;
    border-left: none;
    border-right: none;
    -moz-appearance: textfield;
  }
  .counter-input::-webkit-outer-spin-button,
  .counter-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .counter-btn {
    width: 30px;
    height: 100%;
    background-color: #f5f7fa;
    border: 1px solid #dcdfe6;
    cursor: pointer;
    font-size: 18px;
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .decrease {
    border-radius: 4px 0 0 4px;
  }
  .increase {
    border-radius: 0 4px 4px 0;
  }
  .counter-btn:disabled {
    cursor: not-allowed;
    color: #c0c4cc;
  }
  </style>
  