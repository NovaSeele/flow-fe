<template>
  <button 
    :style="{ backgroundColor: buttonColor, color: textColor }"
    class="custom-button"
  >
    {{ text }}
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  buttonColor: {
    type: String,
    default: "#3498db", // Default blue color
  },
  textColor: {
    type: String,
    default: "#ffffff", // Default white color
  },
});
</script>

<style scoped>
.custom-button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.custom-button:hover {
  opacity: 0.5;
}
</style>
