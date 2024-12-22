<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { issueApi } from '@/api/issueApi';
import { useAuthStore } from '@/stores/auth';
import IssueForm from './IssueForm.vue';

const route = useRoute();
const router = useRouter();
const all_issues = ref([]);
const filtered_issues = ref([]);
const selected_issue = ref(null);
const showModal = ref(false);
const projectId = route.params.projectId;

const getIssues = async () => {
    console.log('Getting issues');
    
    try {
        const token = useAuthStore().token;
        const response = await issueApi.getIssuesInProject(token, projectId);
        all_issues.value = response;
        filtered_issues.value = response;
    } catch (error) {
        console.error(error);
    }
};
getIssues();

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    console.log('Close modal');
    
    selected_issue.value = null;
    showModal.value = false;
};

const editIssue = (issue_id) => {
    const issue = all_issues.value.find((i) => i.issue_id === issue_id);
    selected_issue.value = issue;
    showModal.value = true;
    console.log('Edit issue:', issue_id);
    
};

const handleCreated = () => {
    getIssues();
};

</script>

<template>
<IssueForm v-if="showModal" :isCreateForm="selected_issue == null" @close="closeModal" :issue="selected_issue" :projectId="projectId"/>
<div class="all_issues-view">
    <div class="issue-table-header">
        <h2 class="title">Issues</h2>
        <div class="button" @click="openModal">New Issue</div>
        
    </div>
    <div class="issue-table-content">
        <div v-for="issue in all_issues" :key="issue.issue_id" class="issue-card">
            <div class="issue-title">
                <div>
                    <h2>{{ issue.title }}</h2>
                    <p><strong>Create By:</strong> {{ issue.created_by }}</p>
                </div>
                
                <div class="button" @click="editIssue(issue.issue_id)">Edit</div>
            </div>
            <p><strong>Status:</strong> {{ issue.status }}</p>
            <p><strong>Description:</strong> {{ issue.description || 'No description' }}</p>
        </div>
        <div v-if="all_issues.length === 0">No issues found. Click 'New Issue' to create one.</div>
    </div>
</div>
</template>

<style>
.all_issues-view {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.issue-table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.issue-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.issue-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.issue-card h2 {
  margin: 0;
  font-size: 18px;
}

.issue-card p {
  margin: 5px 0;
}

</style>