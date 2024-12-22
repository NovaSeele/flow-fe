<template>
    <div class="issue-form-overlay">
      <div class="issue-form">
        <div class="issue-header">
          <h2>{{ props.isCreateForm ? "Create Issue" : "Edit Issue" }}</h2>
          <div>
            <button
              @click="closeForm"
              style="background: none; border: none; padding: 0; cursor: pointer"
            >
              <img
                src="../../../assets/closeButton.svg"
                alt="Close"
                style="width: 32px; height: 32px"
              />
            </button>
          </div>
        </div>
  
        <div class="issue-body">
          <div class="issue-content">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="issue.title" required />
          </div>
          
          <form @submit.prevent="submitForm">
            <div class="issue-content">
              <label for="description">Description:</label>
              <textarea
                style="resize: none; border-radius: 10px;"
                id="description"
                class="description-issue"
                v-model="issue.description"
                required
              ></textarea>
            </div>
          </form>

          <div class="issue-content">
            <label for="status">Status</label>
            <select id="status" v-model="issue.status" required>
                <option v-for="status in statusOptions" :value="status.value">
                    {{ status.label }}
                </option>
            </select>
          </div>
  
          <div class="issue-content">
            <label for="assignee">Assignee</label>
            <select id="assignee" v-model="issue.assignee" required>
                <option v-for="assignee in assigneOptions" :value="assignee">
                    {{ assignee }}
                </option>
            </select>
          </div>
  
          <div class="issue-content">
            <label for="sprint">Sprint</label>
            <select id="sprint" v-model="issue.sprint" required>
                <option v-for="sprint in sprintOptions" :value="sprint">
                    {{ sprint }}
                </option>
            </select>
          </div>
          
          <div class="submit-button">
            <CustomButton
              text="Cancel"
              buttonColor="#ccc"
              textColor="black"
              @click="closeForm"
            />
            <CustomButton
              text="Submit"
              buttonColor="#546FFF"
              textColor="#ffffff"
              @click="submitForm"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  import CustomButton from "@/components/props/Button.vue";
  import { useAuthStore } from "@/stores/auth";
    import { issueApi } from "@/api/issueApi";
  
  // Define props for default values, options, and the title
  const props = defineProps({
    projectId: Number,
    isCreateForm: {
        type: Boolean,
        default: true,
    },
    issue: {
        type: Object,
        default: null,
    },
  });
  const emit = defineEmits(["close", "created"]);
  const statusOptions = [
    {
        value: 'todo',
        label: 'To Do',
    }, {
        value: 'in_progress',
        label: 'In Progress',
    }, {
        value: 'in_review',
        label: 'In Review',
    }, {
        value: 'testing',
        label: 'Testing',
    }, {
        value: 'done',
        label: 'Done',
    }
  ];
  const assigneOptions = ["User 1", "User 2", "User 3", "User 4"];
  const sprintOptions = ["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4"];
  const issue = ref({
    title: "",
    description: "",
    status: "todo",
    assignee: null,
    sprint: null,
  });

  if (props.issue) {
    issue.value = { ...props.issue };
  }
  
  const closeForm = () => {
    emit("close"); // Emit the close event
  };

  const createIssue = async (issue) => {
    try {
        const token = useAuthStore().token;
        issue.created_by = useAuthStore().userId;
        const response = await issueApi.createIssue(token, props.projectId, issue);
        if (response.error) {
            throw new Error("Failed to create issue");
        }
        console.log("Issue created:", response);
        
        emit("created");
    } catch (error) {
        console.error(error);
    }
    };

  const updateIssue = async (issue) => {
    try {
        const token = useAuthStore().token;
        const response = await issueApi.updateIssue(token, issue.issue_id, issue);
        if (response.error) {
            throw new Error("Failed to update issue");
        }
        console.log("Issue updated:", response);
        
        emit("updated");
    } catch (error) {
        console.error(error);
    }
  };
  
  const validateForm = () => {
    const errors = {};
    if (!issue.value.title) {
      errors.title = "Title is required.";
    }
    return errors;
  };

  const submitForm = () => { 
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      window.alert("Please fill in all required fields.");
      return;
    }
    if (props.isCreateForm) {
      createIssue(issue.value);
    } else {
        updateIssue(issue.value);
    }
    closeForm();
  };
  </script>
  
  <style scoped>
  .issue-form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
    z-index: 3000;
  }
  
  .issue-form {
    position: relative;
    overflow: hidden; /* Hide the scrollbar */
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 60vh;
    max-width: 90%;
    height: 80vh;
    max-height: 80%;
    overflow-y: auto; /* Enable scrolling if content overflows */
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
  
  /* Hide scrollbar for WebKit browsers */
  .issue-form::-webkit-scrollbar {
    display: none; /* Hide scrollbar */
  }
  
  /* Hide scrollbar for Firefox */
  .issue-form {
    scrollbar-width: none; /* Hide scrollbar */
  }
  
  .issue-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .issue-body {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 16px;
  }
  
  .dropdown-issue {
    width: 70%;
    display: flex;
  }
  
  .issue-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .line {
    width: 95%;
    margin-top: 2%;
    height: 0px;
    border: 1px rgba(0, 0, 0, 0.3) solid;
  }
  
  .description-issue {
    display: flex;
    width: 95%;
    height: 5vh;
    position: relative;
    border-radius: 2px;
    border: 0.5px rgba(0, 0, 0, 0.7) solid;
  }
  
  .submit-button {
    display: flex;
    flex-direction: row;
    justify-content: flex-end; /* Align items to the right */
    align-items: center;
    width: 95%;
    gap: 5vh;
  }
  </style>
  