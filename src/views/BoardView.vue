Workspace

<template>
  <div class="board-view">
    <h1>Board View</h1>
    <div class="sprint-list">
      <Sprint
        v-for="sprint in sprints"
        class="sprint-item"
        :key="sprint.id"
        :sprint_title="sprint.sprint_title"
        :sprint_date="sprint.sprint_date"
        :sprint_number_of_tickets="sprint.sprint_number_of_tickets"
      />
    </div>
    <!-- Other components or content can go here -->
  </div>
</template>

<script setup>
import Sprint from "@/components/flow/Sprint.vue";
import { ref } from "vue";

const sprints = ref([
  {
    id: 1,
    sprint_title: "Sprint 1",
    sprint_date: "2022-01-01",
    sprint_number_of_tickets: 5,
  },
  {
    id: 2,
    sprint_title: "Sprint 2",
    sprint_date: "2022-01-15",
    sprint_number_of_tickets: 8,
  },
  {
    id: 3,
    sprint_title: "Sprint 3",
    sprint_date: "2022-01-30",
    sprint_number_of_tickets: 3,
  },
]);
</script>

<style scoped>

.board-view {
  padding: 20px;
}

.sprint-list {
  display: flex;
  flex-direction: column;
  gap: 5vh;
  z-index: 1;
}

.sprint-item {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
}

</style>
