<script setup>
import SideBar from '@/components/UI/SideBar.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { projectApi } from '@/api/projectApi';
import { useAuthStore } from '@/stores/auth';
import IssuesView from './issues/IssuesView.vue';
import SpintsView from './sprints/SpintsView.vue';

const route = useRoute();
const router = useRouter();
const projectId = ref(route.params.projectId);
const projectDetails = ref(null);
const currentTab = ref('Current');

const fetchProject = async () => {
    const token = useAuthStore().token;
    try {
        const response = await projectApi.getProjectById(token, projectId.value);
        if (response.error) {
            throw new Error('Project not found');
        }
        projectDetails.value = response;
    } catch (error) {
        router.push({ name: 'NotFound' });
    }
};
fetchProject();

watch(() => route.params.projectId, (newId) => {
    projectId.value = newId;
    fetchProject();
});

const handleTabChange = (tab) => {
    currentTab.value = tab;
};

</script>
<template>
    <div style="display: flex; gap: 50px;">
        <SideBar style="flex: 1;" :project-name="projectDetails.name" v-model="currentTab" @current-tab="handleTabChange"/>
        <div style="flex: 5;">
            <SpintsView v-if="currentTab === 'Sprints'"/>
            <IssuesView v-else-if="currentTab === 'Issues'"/>

        </div>
    </div>
</template>