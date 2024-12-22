<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ isEditMode ? 'Edit' : 'Create' }} Project</h2>
  
        <div class="form-group">
          <label for="name">Project Name:</label>
          <input
            type="text"
            id="name"
            v-model="project.name"
            placeholder="Enter project name"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea
            style="resize: none;"
            id="description"
            v-model="project.description"
            placeholder="Enter project description"
          ></textarea>
        </div>
  
        <div class="form-group">
          <label for="status">Status:</label>
          <select id="status" v-model="project.status" required>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
  
        <div class="form-actions">
          <button @click="submitForm">{{ isEditMode ? 'Update' : 'Create' }}</button>
          <button @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
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
      projectData: {
        type: Object,
        default: () => ({
          project_id: null,
          name: '',
          description: '',
          image_url: null,
          status: 'new',
        }),
      },
    },
    data() {
      return {
        project: { ...this.projectData }, // Duplicate data to prevent direct mutation
      };
    },
    methods: {
      closeModal() {
        this.project = { ...this.projectData }; // Reset project data
        this.$emit('close');
      },
      submitForm() {
        this.$emit('submit', this.project);
        this.closeModal();
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
  