<template>
    <div v-if="visible" :class="['notification-popup', typeClass]">
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  const props = defineProps({
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info', // Default type is 'info'
      validator: (value) => ['info', 'success', 'error', 'danger'].includes(value),
    },
    duration: {
      type: Number,
      default: 3000, // Auto-close after 3 seconds
    },
  });
  
  const visible = ref(true);
  
  const close = () => {
    visible.value = false;
  };
  
  // Compute the class based on the type
  const typeClass = computed(() => {
    return `notification-${props.type}`;
  });
  
  // Automatically close after the specified duration
  onMounted(() => {
    if (props.duration > 0) {
      setTimeout(close, props.duration);
    }
  });
  </script>
  
  <style scoped>
  .notification-popup {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    color: white;
    font-size: 16px;
  }
  
  .notification-info {
    background-color: #2196f3; /* Blue */
  }
  
  .notification-success {
    background-color: #4caf50; /* Green */
  }
  
  .notification-error {
    background-color: #f44336; /* Red */
  }
  
  .notification-danger {
    background-color: #ff9800; /* Orange */
  }
  
  button {
    background: none;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-left: 10px;
  }
  button:hover {
    text-decoration: underline;
  }
  </style>
  