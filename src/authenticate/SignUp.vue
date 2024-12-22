<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { userApi } from "@/api/userApi";
import Notification from "@/components/props/Notification.vue";
const router = useRouter();
const form = ref({
  email: "",
  name: "",
  password: "",
  rePassword: "",
});

const notification = ref({
  show: false,
  message: "",
  type: "info",
  duration: 3000,
});

const submitForm = async () => {
  if (!form.value.email || !form.value.name || !form.value.password || !form.value.rePassword) {
    notification.value = {
      show: true,
      message: "Please fill all fields",
      type: "error",
      duration: 3000,
    };
    setTimeout(() => {
      notification.value.show = false;
    }, 3000);
    return;
  }
  if (form.value.password !== form.value.rePassword) {
    notification.value = {
      show: true,
      message: "Passwords do not match",
      type: "error",
      duration: 3000,
    };
    setTimeout(() => {
      notification.value.show = false;
    }, 3000);
    return;
  }

  try {
    const response = await userApi.signup(form.value);
    if (response.error) {
      throw new Error(response.error);
    }
    console.log(response);
    useAuthStore().setToken(response.token);
    router.push("/projects");
  } catch (error) {
    notification.value = {
      show: true,
      message: error.message,
      type: "error",
      duration: 3000,
    };
    setTimeout(() => {
      notification.value.show = false;
    }, 3000);
  }

  console.log(form.value);
};

</script>

<template>
  <Notification
    v-if="notification.show"
    :message="notification.message"
    :duration="notification.duration"
    :type="notification.type"
  />
  <div class="container">
    <div class="content">
      <div class="form-container">
        <h2 class="title">Signup</h2>
        <p class="subtitle">
          Already have account?
          <RouterLink to="/login" class="link">Login</RouterLink>
        </p>

        <div class="form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" />
          </div>
          <div class="form-group">
            <label for="name">Username</label>
            <input type="text" id="name" v-model="form.name" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="form.password" />
          </div>
          <div class="form-group">
            <label for="rePassword">Re-enter Password</label>
            <input type="password" id="rePassword" v-model="form.rePassword" />
          </div>
          <div class="form-actions">
            <button class="button" @click="submitForm">Signup</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Use the same CSS as in Login.vue */
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
  text-align: center;
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
