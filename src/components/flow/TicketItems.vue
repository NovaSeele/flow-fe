<template>
  <article class="ticket-card">
    <div class="ticket-info">
      <div class="ticket-details">
        <!-- <div
          class="checkbox"
          tabindex="0"
          role="checkbox"
          aria-checked="false"
        ></div> -->
        <span class="ticket-id">{{ id }}</span>
        <span class="ticket-title">{{ title }}</span>
      </div>
      <img
        loading="lazy"
        :src="statusBadge"
        alt="Status Badge"
        class="action-icon"
      />
    </div>
    <div class="ticket-status">
      <Dropdown
        class="dropdown-ticket-item"
        :content="statusOptions"
        :itemColors="statusColors"
        :defaultValue="status || 'In Progress'"
        @select="handleSelect"
      />
      <div class="user-actions">
        <img
          loading="lazy"
          :src="assignedUserAvatar"
          alt="User avatar"
          class="user-avatar"
        />
        <div class="menu-container">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/3057706e8a9f482eaf911a941ae3ba6d/594cb8e9b06805878584cfc26c81848104847c05e0de0aeb2a47cb81dcf2355e?apiKey=3057706e8a9f482eaf911a941ae3ba6d&"
            alt="Setting Icon"
            class="menu-icon"
            @click="toggleMenu"
          />
          <div v-if="isMenuOpen" class="menu-dropdown">
            <div class="menu-item" @click="handleEdit">Edit</div>
            <div class="menu-item" @click="handleDelete">Delete</div>
          </div>
          <Teleport to="body">
            <transition name="fade">
              <TicketForm
                v-if="showForm"
                @close="showForm = false"
                :title="'Edit Ticket for ' + currentSprint.sprint_title"
                :projectOptions="['Project A', 'Project B']"
                :statusOptions="['Open', 'In Progress', 'Resolved']"
                :assigneOptions="['John Doe', 'Jane Smith']"
                :sprintOptions="sprints.map((s) => s.sprint_title)"
                :reporterOptions="['Admin', 'Manager']"
                :defaultProject="'Project A'"
                :defaultStatus="'Open'"
                :defaultAssignee="'John Doe'"
                :defaultSprint="currentSprint.sprint_title"
                :defaultReporter="'Admin'"
              />
            </transition>
          </Teleport>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import Dropdown from "../props/Dropdown.vue";
import TicketForm from "./TicketForm.vue";
import { ref } from "vue";

const statusOptions = ["Open", "In Progress", "Closed"];
const statusColors = ["#ffcccc", "#ffffcc", "#ccffcc"]; // Custom colors for each status

const showForm = ref(false);

const handleSelect = (selected) => {
  console.log("Selected:", selected);
};

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleEdit = () => {
  isMenuOpen.value = false;
  showForm.value = true;
  console.log("Edit option selected");
};

const handleDelete = () => {
  console.log("Delete option selected");
};

defineProps({
  checkbox: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  statusBadge: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    required: true,
  },
  assignedUserAvatar: {
    type: String,
    required: true,
  },
  assignedUserName: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade {
  z-index: 30000;
}

.ticket-card {
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  margin-top: 1%;
  width: 94%;
  gap: 20px;

  flex-wrap: wrap;
  justify-content: space-between;
  padding: 6px 14px;
  z-index: 10;
}

.ticket-info {
  display: flex;
  gap: 50px;
  color: #000;
  text-align: center;
  letter-spacing: -0.24px;
  margin: auto 0;
  z-index: 10;
}

.ticket-details {
  display: flex;
  gap: 25px;
}

.checkbox {
  border-radius: 3px;
  background-color: #fff;
  width: 16px;
  height: 16px;
  margin: auto 0;
  border: 1px solid #000;
  cursor: pointer;
}

.action-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 20px;
}

.ticket-status {
  display: flex;
  gap: 50px;
}

.status-button {
  border: none;
  border-radius: 3px;
  background-color: rgba(84, 111, 255, 0.2);
  display: flex;
  min-height: 26px;
  align-items: center;
  gap: 8px;
  color: var(--Secondary-500, #141522);
  text-align: center;
  letter-spacing: -0.24px;
  padding: 4px 8px 4px 8px;
  font: 600 12px/1.6 Plus Jakarta Sans, -apple-system, Roboto, Helvetica,
    sans-serif;
  cursor: pointer;
}

.status-label {
  align-self: stretch;
  margin: auto 0;
}

.status-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 12px;
  align-self: stretch;
  margin: auto 0;
}

.user-actions {
  display: flex;
  gap: 19px;
  align-items: center;
}

.user-avatar {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 26px;
  border-radius: 100px;
}

.menu-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  align-self: center;
  cursor: pointer;
}

.menu-container {
  position: relative;
}

.menu-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  min-width: 100px;
}

.menu-item {
  padding: 8px 12px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  transition: background 0.2s;
}

.menu-item:hover {
  background: #f5f5f5;
}

.dropdown-ticket-item {
  max-width: 80%;
  display: flex;
  width: 150px;
}

@media (max-width: 991px) {
  .ticket-card {
    max-width: 100%;
    margin-top: 40px;
  }

  .status-button {
    white-space: initial;
  }
}

.ticket-user-name {
  max-width: 20vh;
}
</style>
