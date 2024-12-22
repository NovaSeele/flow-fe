import { defineStore } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null, // The user token
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken; // Update the token
    },
    clearToken() {
      this.token = null; // Clear the token
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token, // Check if the user is authenticated,
    userId: (state) => {
      if (!state.token) {
        return null;
      }
      const [, payload] = state.token.split('.');
      const data = JSON.parse(atob(payload));
      console.log(data);
      
      return data.user_id;
    }
  },
  persist: true
});
