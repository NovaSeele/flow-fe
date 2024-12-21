<template>
  <div class="dropdown">
    <button class="dropdown-button" :style="{ backgroundColor: selectedColor }" @click="toggleDropdown">
      {{ selectedItem || 'Select an option' }}
    </button>
    <ul v-if="isOpen" class="dropdown-menu">
      <li
        v-for="(item, index) in content"
        :key="index"
        class="dropdown-item"
        :style="{ backgroundColor: itemColors[index] || '#fff' }"
        @click="selectItem(item, index)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps({
  content: {
    type: Array,
    required: true,
  },
  defaultValue: {
    type: String,
    default: null, // Default to null if no value is provided
  },
  itemColors: {
    type: Array,
    default: () => [], // Array of colors for each item
  },
});

const emit = defineEmits();
const isOpen = ref(false);
const selectedItem = ref(null);
const selectedColor = ref('#fff');

onMounted(() => {
  // Initialize selectedItem with the defaultValue if provided
  if (props.defaultValue) {
    const defaultIndex = props.content.indexOf(props.defaultValue);
    selectedItem.value = props.defaultValue;
    selectedColor.value = props.itemColors[defaultIndex] || '#fff';
  }
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectItem = (item, index) => {
  selectedItem.value = item;
  selectedColor.value = props.itemColors[index] || '#fff';
  isOpen.value = false;
  emit("select", item); // Emit the selected item
};
</script>

<style scoped>
.dropdown {
  position: relative; /* Ensure dropdown menu is positioned relative to this container */
  display: inline-block;
  border: 2px solid transparent;
  border-radius: 10px; /* Make the 4 borders circular */
}

.dropdown-button {
  padding: 10px 15px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  border-radius: 10px; /* Match border radius with the parent */
}

.dropdown-menu {
  position: absolute; /* Ensures the dropdown positions relative to its nearest positioned parent */
  top: 100%; /* Position dropdown below the button */
  left: 0;
  background-color: #ccc;
  border: 1px solid #ccc;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 2000; /* Ensure it's above everything else */
  overflow: visible; /* Prevent dropdown content from being clipped */
  border-radius: 10px; /* Match border radius with the parent */
}

.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  text-align: left;
  box-sizing: border-box;
  white-space: nowrap;
  z-index: 3000; /* High enough to layer above other content */
}

.dropdown-item:hover {
  opacity: 0.5;
}
</style>
