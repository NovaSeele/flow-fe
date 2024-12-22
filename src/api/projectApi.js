const BASE_URL = 'http://localhost:5000'

export const projectApi = {
    async createProject(token, project_details) {

        const response = await fetch(`${BASE_URL}/project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project_details),
        })
        const data = await response.json()
        return data
    },
    async getProjects(token) {
        const response = await fetch(`${BASE_URL}/projects`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        const data = await response.json()
        return data
    },
    async getUserProjects(token, user_id) {
        const response = await fetch(`${BASE_URL}/projects/${user_id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        const data = await response.json()
        return data
    },
    async getProjectById(token, projectId) {
        const response = await fetch(`${BASE_URL}/project/${projectId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        const data = await response.json()
        return data
    },
    async deleteProject(token, projectId) {
        const response = await fetch(`${BASE_URL}/project/${projectId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        const data = await response.json()
        return data
    },
    async updateProject(token, projectId, projectName) {
        const response = await fetch(`${BASE_URL}/project/${projectId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projectName }),
        })
        const data = await response.json()
        return data
    },
    async addMember(token, projectId, email) {
        const response = await fetch(`${BASE_URL}/project/${projectId}/member`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
        })
        const data = await response.json()
        return data
    },
    async removeMember(token, projectId, email) {
        const response = await fetch(`${BASE_URL}/project/${projectId}/member`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
        })
        const data = await response.json()
        return data
    },
}