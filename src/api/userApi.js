const BASE_URL = 'http://localhost:5000'

export const userApi = {
    async login(email, password) {
        const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        })
        const data = await response.json()
        return data
    },
    async signup(user_data) {
        const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user_data),
        })
        const data = await response.json()
        return data
    },
    async getUserInfo(token) {
        const response = await fetch(`${BASE_URL}/user`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        const data = await response.json()
        return data
    }
}