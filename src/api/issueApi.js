const BASE_URL = 'http://localhost:5000'

export const issueApi = {
    async createIssue(token, projectId, issue_details) {
        issue_details.project_id = projectId;
        console.log(JSON.stringify(issue_details));
        
        const response = await fetch(`${BASE_URL}/issue`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(issue_details),
        })
        const data = await response.json()
        return data
    },
    async getIssuesInProject(token, projectId) {
        const response = await fetch(`${BASE_URL}/issues/project/${projectId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        const data = await response.json()
        return data
    },
    async getIssuesInSprint(token, sprintId) {
        const response = await fetch(`${BASE_URL}/issues/sprint/${sprintId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        const data = await response.json()
        return data
    },
    async getIssueById(token, issueId) {
        const response = await fetch(`${BASE_URL}/issue/${issueId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        const data = await response.json()
        return data
    },
    async deleteIssue(token, issueId) {
        const response = await fetch(`${BASE_URL}/issue/${issueId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        const data = await response.json()
        return data
    },
    async updateIssue(token, issueId, issue) {
        console.log(JSON.stringify(issue));
        delete issue.created_by
        delete issue.created_time
        delete issue.updated_time
        delete issue.issue_id
        console.log(JSON.stringify(issue));
    
        const response = await fetch(`${BASE_URL}/issue/${issueId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify( issue ),
        })
        const data = await response.json()
        return data
    },
}