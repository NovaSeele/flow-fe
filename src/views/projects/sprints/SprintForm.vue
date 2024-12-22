<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ isEditMode ? 'Edit' : 'Create' }} Sprint</h2>
  
        <div class="form-group">
          <label for="title">Sprint Title:</label>
          <input
            type="text"
            id="title"
            v-model="sprints.title"
            placeholder="Enter sprints title"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea
            style="resize: none;"
            id="description"
            v-model="sprints.description"
            placeholder="Enter sprints description"
          ></textarea>
        </div>
  
        <div class="form-group">
          <label for="status">Status:</label>
          <select id="status" v-model="sprints.status" required>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div class="form-group">
            <label for="start_time">Start Time</label>
            <input type="datetime-local" v-model="sprints.start_time" id="start_time" />
        </div>

        <div class="form-group">
            <label for="end_time">End Time</label>
            <input type="datetime-local" v-model="sprints.end_time" id="end_time" />
        </div>
  
        <div class="form-actions">
          <button @click="submitForm">{{ isEditMode ? 'Update' : 'Create' }}</button>
          <button @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { useAuthStore } from '@/stores/auth';

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    sprintsData: {
      type: Object,
      default: () => ({
        sprint_id: null,
        title: '',
        description: '',
        status: 'new',
        start_time: null,
        end_time: null,
        created_by: useAuthStore().userId,
      }),
    },
  },
  data() {
    return {
      sprints: { ...this.sprintsData }, // Duplicate data to prevent direct mutation
      errors: {}, // To store validation errors
    };
  },
  methods: {
    closeModal() {
      this.sprints = { ...this.sprintsData }; // Reset sprints data
      this.errors = {}; // Clear errors
      this.$emit('close');
    },
    validateForm() {
      const errors = {};
      if (!this.sprints.title) {
        errors.title = 'Sprint title is required.';
      }
      if (!this.sprints.status) {
        errors.status = 'Status is required.';
      }
      if (!this.sprints.start_time) {
        errors.start_time = 'Start time is required.';
      }
      if (!this.sprints.end_time) {
        errors.end_time = 'End time is required.';
      }
      this.errors = errors;

      return Object.keys(errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        this.$emit('submit', this.sprints);
        this.closeModal();
      } else {
        let message = '';
        for (const key in this.errors) {
            message += `${this.errors[key]}\n`;
        }
        window.alert(message);
      }
    },
  },
};
</script>

  
  <style scoped>
  /* Modal Overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  /* Modal Content */
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* Form Group Styling */
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  /* Action Buttons */
  .form-actions {
    display: flex;
    justify-content: space-between;
  }
  
  button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    opacity: 0.8;
  }
  
  /* Submit button */
  button:first-child {
    background-color: #4CAF50;
    color: white;
  }
  
  button:last-child {
    background-color: #f44336;
    color: white;
  }
  </style>
  