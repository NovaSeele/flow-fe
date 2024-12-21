<template>
  <div class="sprint-container">
    <header class="sprint-header">
      <div class="sprint-info">
        <button class="select-all-btn" tabindex="0">Select all</button>
        <div class="sprint-title">
          <h2 class="sprint-name">Sprint 1</h2>
        </div>
        <div class="sprint-meta">
          <span class="sprint-date">Date: 9/11/2024 - 9/11/2025</span>
          <span class="ticket-count">(5 tickets)</span>
        </div>
      </div>
      <div class="sprint-actions">
        <div class="complete-sprint">
          <button class="complete-btn" tabindex="0">Complete Sprint</button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3057706e8a9f482eaf911a941ae3ba6d/47cd495c21bf23c09cd2094dee895cafb40907d8c696b114077d0c29c108a66d?apiKey=3057706e8a9f482eaf911a941ae3ba6d&"
            alt="Setting Icon"
            class="menu-icon"
            @click="toggleMenu"
          />
          <div v-if="isMenuOpen" class="menu-dropdown">
            <div class="menu-item" @click="handleEdit">Edit</div>
            <div class="menu-item" @click="handleDelete">Delete</div>
          </div>
        </div>
      </div>
    </header>

    <div class="ticket-list-header">
      <div class="ticket-details">
        <span class="ticket-id">ID</span>
        <span class="ticket-title">Title</span>
      </div>
      <div class="ticket-status">
        <span>Status</span>
        <span>Assigned User</span>
      </div>
    </div>

    <div class="ticket-list">
      <TicketItems
        v-for="ticket in tickets"
        :key="ticket.id"
        :checkbox="ticket.checkbox"
        :id="ticket.id"
        :title="ticket.title"
        :statusBadge="ticket.statusBadge"
        :status="ticket.status"
        :progress="ticket.progress"
        :assignedUserAvatar="ticket.assignedUserAvatar"
        :assignedUserName="ticket.assignedUserName"
      />
    </div>
    <button class="create-ticket-btn" tabindex="0">+ Create ticket</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TicketItems from "./TicketItems.vue";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleEdit = () => {
  isMenuOpen.value = !isMenuOpen.value;
  console.log("Edit option selected");
};

const handleDelete = () => {
  isMenuOpen.value = !isMenuOpen.value;
  console.log("Delete option selected");
};

// Example data for tickets
const tickets = ref([
  {
    id: "PM-14059112024",
    checkbox: false,
    title: "Ticket title 1",
    statusBadge:
      "https://cdn.builder.io/api/v1/image/assets/3057706e8a9f482eaf911a941ae3ba6d/dda878885d14b1aad987afd9c138df6ff27e3502094328de6067bf65fd4cbe15?apiKey=3057706e8a9f482eaf911a941ae3ba6d&",
    status: "In Progress",
    progress: 70,
    assignedUserAvatar:
      "https://cdn.builder.io/api/v1/image/assets/3057706e8a9f482eaf911a941ae3ba6d/6994da98c34c748ff5092b97d44972c684981ec08b05c612373f39909a5f2899?apiKey=3057706e8a9f482eaf911a941ae3ba6d&",
    assignedUserName: "John Doe",
  },
  {
    id: "PM-14059112025",
    checkbox: true,
    title: "Ticket title 2",
    statusBadge:
      "https://cdn.builder.io/api/v1/image/assets/3057706e8a9f482eaf911a941ae3ba6d/dda878885d14b1aad987afd9c138df6ff27e3502094328de6067bf65fd4cbe15?apiKey=3057706e8a9f482eaf911a941ae3ba6d&",
    status: "Open",
    progress: 100,
    assignedUserAvatar:
      "https://cdn.builder.io/api/v1/image/assets/3057706e8a9f482eaf911a941ae3ba6d/bb0a57772836c23822cfee73c545bb317371b493163826579fc345a77eb21343?apiKey=3057706e8a9f482eaf911a941ae3ba6d&",
    assignedUserName: "Jane Smith",
  },
  {
    id: "PM-14059112026",
    checkbox: false,
    title: "Ticket title 3",
    statusBadge:
      "https://cdn.builder.io/api/v1/image/assets/3057706e8a9f482eaf911a941ae3ba6d/dda878885d14b1aad987afd9c138df6ff27e3502094328de6067bf65fd4cbe15?apiKey=3057706e8a9f482eaf911a941ae3ba6d&",

    status: "Closed",
    progress: 0,
    assignedUserAvatar: "https://i.postimg.cc/FK1MwP89/seele-BA.jpg",
    assignedUserName: "NovaSeele",
  },
  // Add more tickets as needed
]);
</script>

<style scoped>
.sprint-container {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.05);
  max-width: 90%;
  padding: 15px 27px;
  z-index: 10;
}

.sprint-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2%;
}

.sprint-info {
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #000;
  letter-spacing: -0.24px;
  margin: auto 0;
}

.select-all-btn {
  color: #546fff;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
}

.sprint-title {
  display: flex;
  gap: 2px;
  font-weight: 700;
}

.sprint-meta {
  align-items: center;
  display: flex;
  gap: 10px;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: -0.2px;
}

.complete-sprint {
  display: flex;
  gap: 28px;
  align-items: center;
}

.complete-btn {
  border-radius: 5px;
  background: var(--Secondary-100, #dfe1f3);
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.complete-icon {
  width: 24px;
  height: 24px;
}

.sprint-actions {
  display: flex;
  gap: 20px;
  align-items: center;
}

.create-ticket-btn {
  color: #000;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: -0.2px;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 27px;
  align-self: flex-start;
}

@media (max-width: 991px) {
  .sprint-container {
    padding: 0 20px;
  }

  .ticket-item {
    max-width: 100%;
  }

  .status-badge {
    white-space: normal;
  }
}

.menu-dropdown {
  position: relative;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1000;
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

.ticket-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 14px;
  margin-top: 1%;
  width: 94%;
  background-color: #f5f5f5;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.ticket-list-header .ticket-details {
  display: flex;
  gap: 10rem; /* Match the gap from ticket-card */
  align-items: center;
}

.ticket-list-header .ticket-status {
  display: flex;
  gap: 5rem; /* Match the gap from ticket-card */
  align-items: center;
}

.ticket-list-header .ticket-id,
.ticket-list-header .ticket-title,
.ticket-list-header .ticket-status span {
  text-align: left;
}
</style>
