<script setup>
import { ref, watch } from "vue";
import { projectApi } from "@/api/projectApi";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import Notification from "@/components/props/Notification.vue";
import ProjectForm from "./ProjectForm.vue";

const router = useRouter();
const notification = ref({
    show: false,
    message: "",
    type: 'success',
});
const allProjects = ref([]);
const filteredProjects = ref([]);
const showModal = ref(false);
const filter = ref({
    status: "all",
    search: "",
    time: "desc",
});

const getUserProjects = async () => {
    const userId = useAuthStore().userId;
    const token = useAuthStore().token;
    const response = await projectApi.getUserProjects(token, userId);
    allProjects.value = response.reverse();
    filteredProjects.value = response;
};
getUserProjects();

const goToProject = (projectId) => {
    router.push(`/project/${projectId}`);
    console.log("Go to project with id:", projectId);
};

const createProject = async (projectData) => {
    const token = useAuthStore().token;
    const userId = useAuthStore().userId;
    projectData.user_id = userId;
    const response = await projectApi.createProject(token, projectData);
    getUserProjects();
    notification.value = {
        show: true,
        message: 'Project created successfully',
        type: 'success',
    };
    setInterval(() => {
        notification.value.show = false;
    }, 3000);
    closeModal();
};

const closeModal = () => {
    showModal.value = false;
};

watch(() => filter.value.status, () => {
  console.log("Filter changed:", filter.value.status);
    console.log("All projects:", allProjects.value);
    
    if (filter.value.status === "all") {
        filteredProjects.value = allProjects.value;
    } else {
        filteredProjects.value = allProjects.value.filter(
            (project) => project.status === filter.value.status
        );
    }
});

watch(() => filter.value.search, () => {
    console.log("Search changed:", filter.value.search);
    filteredProjects.value = allProjects.value.filter((project) =>
        project.name.toLowerCase().includes(filter.value.search.toLowerCase())
    );
});

watch(() => filter.value.time, () => {
    console.log("Time changed:", filter.value.time);
    if (filter.value.time === "desc") {
        filteredProjects.value = filteredProjects.value.sort(
            (a, b) => new Date(b.created_time) - new Date(a.created_time)
        );
    } else {
        filteredProjects.value = filteredProjects.value.sort(
            (a, b) => new Date(a.created_time) - new Date(b.created_time)
        );
    }
});

</script>

<template>
    <ProjectForm 
      :is-visible="showModal"
      @close="closeModal"
      @submit="createProject"/>

    <Notification v-if="notification.show" :message="notification.message" :type="notification.type"/>
  
    <div class="table-header">
        <h2 class="title">Projects</h2>
        <div class="filter">
            <span>Search: </span>
            <input type="text" v-model="filter.search" placeholder="Enter project name..."/>
            <span>Status: </span>
            <select v-model="filter.status">
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
            </select>
            <span>Time: </span>
            <select v-model="filter.time">
                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
            </select>
        </div>
        <div class="button" @click="() => showModal=true">Create Project</div>
    </div>
    <div class="table-content">
        <div v-if="filteredProjects.length != 0" v-for="project in filteredProjects" :key="project.project_id" 
          @click="goToProject(project.project_id)" 
          class="project-card">
            <h3>{{ project.name }}</h3>
            <p>Status: {{ project.status }}</p>
            <p>Created Time: {{ project.created_time }}</p>
            <p>Updated Time: {{ project.updated_time }}</p>
        </div>
        <div v-else>
            <p>No projects found</p>
        </div>
    </div>
</template>

<style>
.table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.table-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.filter {
    display: flex;
    gap: 1rem;
}


.project-card {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.project-card h3 {
  margin: 0 0 10px;
  font-size: 1.5rem;
  color: #333;
}

.project-card p {
  margin: 5px 0;
  font-size: 1rem;
  color: #555;
}

.project-card p:first-of-type {
  font-weight: bold;
}
</style>