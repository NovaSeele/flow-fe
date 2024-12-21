<template>
  <div class="ticket-form-overlay">
    <div class="ticket-form">
      <div class="ticket-header">
        <h2>{{ title }}</h2>
        <div>
          <button
            @click="closeForm"
            style="background: none; border: none; padding: 0; cursor: pointer"
          >
            <img
              src="../../assets/closeButton.svg"
              alt="Close"
              style="width: 32px; height: 32px"
            />
          </button>
        </div>
      </div>

      <div class="ticket-body">
        <div class="ticket-content">
          <label for="project">Project</label>
          <Dropdown
            class="dropdown-ticket"
            :content="projectOptions"
            :defaultValue="defaultProject"
            @select="handleSelect('project', $event)"
          />
        </div>
        <div class="ticket-content">
          <label for="status">Status</label>
          <Dropdown
            class="dropdown-ticket"
            :content="statusOptions"
            :defaultValue="defaultStatus"
            @select="handleSelect('status', $event)"
          />
        </div>
        <div class="line"></div>
        <form @submit.prevent="submitForm">
          <div class="ticket-content">
            <label for="description">Description:</label>
            <textarea
              id="description"
              class="description-ticket"
              v-model="ticket.description"
              required
            ></textarea>
          </div>
        </form>

        <div class="ticket-content">
          <label for="assignee">Assignee</label>
          <Dropdown
            class="dropdown-ticket"
            :content="assigneOptions"
            :defaultValue="defaultAssignee"
            @select="handleSelect('assignee', $event)"
          />
        </div>

        <div class="ticket-content">
          <label for="sprint">Sprint</label>
          <Dropdown
            class="dropdown-ticket"
            :content="sprintOptions"
            :defaultValue="defaultSprint"
            @select="handleSelect('sprint', $event)"
          />
        </div>

        <div class="ticket-content">
          <label for="reporter">Reporter</label>
          <Dropdown
            class="dropdown-ticket"
            :content="reporterOptions"
            :defaultValue="defaultReporter"
            @select="handleSelect('reporter', $event)"
          />
        </div>
        <div class="line"></div>

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
import Dropdown from "../props/Dropdown.vue";
import { ref, defineProps, defineEmits } from "vue";
import CustomButton from "@/components/props/Button.vue";

// Define props for default values, options, and the title
const props = defineProps({
  title: {
    type: String,
    default: "Create a new ticket",
  },
  projectOptions: {
    type: Array,
    default: () => ["Project 1", "Project 2", "Project 3"],
  },
  statusOptions: {
    type: Array,
    default: () => ["Open", "In Progress", "Closed"],
  },
  assigneOptions: {
    type: Array,
    default: () => ["User 1", "User 2", "User 3"],
  },
  sprintOptions: {
    type: Array,
    default: () => ["Sprint 1", "Sprint 2", "Sprint 3"],
  },
  reporterOptions: {
    type: Array,
    default: () => ["Reporter 1", "Reporter 2", "Reporter 3", "Reporter 4"],
  },
  defaultProject: {
    type: String,
    default: "Select Project",
  },
  defaultStatus: {
    type: String,
    default: "Status",
  },
  defaultAssignee: {
    type: String,
    default: "Select user need to assign",
  },
  defaultSprint: {
    type: String,
    default: "Select Sprint",
  },
  defaultReporter: {
    type: String,
    default: "Select user need to report",
  },
});

const emit = defineEmits(["close"]);

const ticket = ref({
  description: "Enter ticket description here...",
});

const closeForm = () => {
  emit("close"); // Emit the close event
};

const handleSelect = (field, selected) => {
  console.log(`${field} selected:`, selected);
};

const submitForm = () => {
  console.log("Ticket submitted:", ticket.value);
  closeForm();
};
</script>

<style scoped>
.ticket-form-overlay {
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

.ticket-form {
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

/* Hide scrollbar for WebKit browsers */
.ticket-form::-webkit-scrollbar {
  display: none; /* Hide scrollbar */
}

/* Hide scrollbar for Firefox */
.ticket-form {
  scrollbar-width: none; /* Hide scrollbar */
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-body {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 16px;
}

.dropdown-ticket {
  width: 70%;
  display: flex;
}

.ticket-content {
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

.description-ticket {
  display: flex;
  width: 95%;
  height: 20vh;
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
