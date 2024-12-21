<template>
  <header class="header">
    <img src="./UI_icons/select.svg" alt="Select Icon" />
    <p class="header-title"><span class="header-title-highlight">Fl</span>ow</p>
    <ul class="nav-list">
      <li class="nav-item">
        <span>Projects</span>
      </li>
      <li class="nav-item">
        <span>My Works</span>
      </li>
    </ul>
    <div>
      <Dropdown
        class="header_dropdown"
        :content="options"
        @select="handleSelect"
      />
    </div>
    <CustomButton
      text="Create"
      buttonColor="#546FFF"
      textColor="#ffffff"
      @click="showForm = true"
    />
    <div class="header-icons">
      <CustomButton text="Log out" buttonColor="#546FFF" textColor="#ffffff" />
      <img
        src="@/images/seele_BA.png"
        alt="Profile Avatar"
        class="profile-avatar"
      />
    </div>
    <!-- Transiton Components -->
    <div>
      <transition name="fade">
        <TicketForm
          v-if="showForm"
          @close="showForm = false"
          :title="'Create a ticket'"
          :projectOptions="['Project A', 'Project B']"
          :statusOptions="['Open', 'In Progress', 'Resolved']"
          :assigneOptions="['John Doe', 'Jane Smith']"
          :sprintOptions="['Sprint 1', 'Sprint 2']"
          :reporterOptions="['Admin', 'Manager']"
          :defaultProject="'Project A'"
          :defaultStatus="'Open'"
          :defaultAssignee="'John Doe'"
          :defaultSprint="'Sprint 1'"
          :defaultReporter="'Admin'"
        />
      </transition>
    </div>
  </header>
</template>

<script setup>
import CustomButton from "@/components/props/Button.vue";
import Dropdown from "@/components/props/Dropdown.vue";
import TicketForm from "@/components/flow/TicketForm.vue";
import { ref } from "vue";

const showForm = ref(false);
const options = ["Option 1", "Option 2", "Option 3"];

const handleSelect = (selected) => {
  console.log("Selected:", selected);
};
</script>

<style scoped></style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 28px;
  border-bottom: 1px solid #cccccc;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 50;
}

.header_dropdown {
  width: 200px;
}

.header-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.header-title-highlight {
  color: #e54949;
}

.nav-list {
  display: flex;
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px;
  font-weight: 600;
  transition: all 0.4s ease;
}

.nav-item:hover {
  background-color: rgba(42, 96, 183, 0.08);
  color: #2a3bb7;
}

.header-icons {
  display: flex;
  gap: 16px;
  margin-left: auto;
}

.profile-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
