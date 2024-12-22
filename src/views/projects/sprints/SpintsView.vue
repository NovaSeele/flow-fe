<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { sprintApi } from '@/api/sprintApi';
import { useAuthStore } from '@/stores/auth';
import SprintForm from './SprintForm.vue';

const route = useRoute();
const router = useRouter();
const sprints = ref([]);
const showModal = ref(false);
const projectId = route.params.projectId;

const getSprints = async () => {
    try {
        const token = useAuthStore().token;
        const response = await sprintApi.getSprints(token, projectId);
        sprints.value = response;
        console.log(response);
        
    } catch (error) {
        console.error(error);
    }
};
getSprints();

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const createSprint = async (sprint) => {
    console.log(sprint);
    
    try {
        const token = useAuthStore().token;
        const response = await sprintApi.createSprint(token, projectId, sprint);
        console.log(response);
        getSprints();
    } catch (error) {
        console.error(error);
    }
};

</script>

<template>
<SprintForm :isVisible="showModal" @close="closeModal" @submit="createSprint" />
<div class="sprints-view">
    <div class="sprint-table-header">
        <h2 class="title">Sprints</h2>
        <div class="button" @click="openModal">New Sprint</div>
        
    </div>
    <div class="sprint-table-content">
        <div v-for="sprint in sprints" :key="sprint.sprint_id" class="sprint-card">
            <h2>{{ sprint.title }}</h2>
            <p><strong>Status:</strong> {{ sprint.status }}</p>
            <p><strong>Start Time:</strong> {{ sprint.start_time }}</p>
            <p><strong>End Time:</strong> {{ sprint.end_time }}</p>
            <p><strong>Description:</strong> {{ sprint.description || 'No description' }}</p>
        </div>
        <div v-if="sprints.length === 0">No sprints found. Click 'New Sprint' to create one.</div>
    </div>
</div>
</template>

<style>
.sprints-view {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.sprint-table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sprint-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.sprint-card h2 {
  margin: 0;
  font-size: 18px;
}

.sprint-card p {
  margin: 5px 0;
}

</style>