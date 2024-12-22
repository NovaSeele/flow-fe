const BASE_URL = 'http://localhost:5000'

export const sprintApi = {
    async createSprint(token, projectId, sprint_details) {
        sprint_details.project_id = projectId;
        console.log(JSON.stringify(sprint_details));
        
        const response = await fetch(`${BASE_URL}/sprint`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sprint_details),
        })
        const data = await response.json()
        return data
    },
    async getSprints(token, projectId) {
        const response = await fetch(`${BASE_URL}/sprints/${projectId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        const data = await response.json()
        return data
    },
    async getSprintById(token, sprintId) {
        const response = await fetch(`${BASE_URL}/sprint/${sprintId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        const data = await response.json()
        return data
    },
    async deleteSprint(token, sprintId) {
        const response = await fetch(`${BASE_URL}/sprint/${sprintId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        const data = await response.json()
        return data
    },
    async updateSprint(token, sprintId, sprintName) {
        const response = await fetch(`${BASE_URL}/sprint/${sprintId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sprintName }),
        })
        const data = await response.json()
        return data
    },
}