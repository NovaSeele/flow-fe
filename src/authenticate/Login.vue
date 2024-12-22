<script setup>
import { userApi } from '@/api/userApi';
import { ref } from 'vue';
import Notification from '@/components/props/Notification.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref({
  email: '',
  password: ''
});
const notification = ref({
  show: false,
  message: '',
  type: 'info',
  duration: 3000
});

const submitForm = async () => {
  if (!form.value.email || !form.value.password) {
    notification.value = {
      show: true,
      message: 'Please fill all fields',
      type: 'error',
      duration: 3000
    };
    setTimeout(() => {
      notification.value.show = false;
    }, 3000);
    
    return;
  }
  try {
    const response = await userApi.login(form.value.email, form.value.password);
    if (response.error) {
      throw new Error(response.error);
    }
    console.log(response);
    
    useAuthStore().setToken(response.token);
    router.push('/projects');
  } catch (error) {
    notification.value = {
      show: true,
      message: error.message,
      type: 'error',
      duration: 3000
    };
    setTimeout(() => {
      notification.value.show = false;
    }, 3000);
  }
};

</script>

<template>
  <div class="container">
    <div class="content">
      <Notification v-if="notification.show" 
          :message="notification.message" 
          :duration="notification.duration" 
          :type="notification.type"/>
      <div class="form-container">
        <h2 class="title">Login to your account</h2>
        <p class="subtitle">
          Not a member?
          <router-link to="/signup">Signup</router-link>
        </p>

        <div class="form">
          <div class="form-group">
            <label>Email address</label>
            <input id="email" name="email" type="email" required v-model="form.email"/>
          </div>

          <div class="form-group">
            <label>Password</label>
            <input id="password" name="password" type="password" required v-model="form.password"/>
          </div>

          <div class="form-actions">
            <a href="#" class="link">Forgot password?</a>
          </div>

          <button class="button" @click="submitForm">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.content {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}
.logo {
  height: 40px;
  margin-bottom: 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}
.subtitle {
  font-size: 14px;
  margin-bottom: 20px;
}
.link {
  color: #4f46e5;
  text-decoration: none;
}
.form {
  display: flex;
  flex-direction: column;
  padding: 24px;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.form-group label {
  font-size: 14px;
  margin-bottom: 10px;
}

.form-group input {
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #4f46e5;
  color: #fff;
  cursor: pointer;
}
.button:hover {
  background-color: #4338ca;
}
</style>
