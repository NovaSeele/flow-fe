<template>
  <header class="header">
    <img src="./UI_icons/select.svg" alt="Select Icon" />
    <p class="header-title"><span class="header-title-highlight">Fl</span>ow</p>
    <ul class="nav-list">
      <li class="nav-item">
        <RouterLink style="text-decoration: none; color: inherit;" to="/projects">
          My Projects
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink style="text-decoration: none; color: inherit;" to="/profile">
          My Profile
        </RouterLink>
      </li>
    </ul>
    <div class="header-icons">
      <CustomButton @click="logout" text="Log out" buttonColor="#546FFF" textColor="#ffffff" />
      <img
        src="@/images/seele_BA.png"
        alt="Profile Avatar"
        class="profile-avatar"
      />
    </div>
  </header>
</template>

<script setup>
import CustomButton from "@/components/props/Button.vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();

const logout = () => {
  useAuthStore().clearToken();
  router.push("/login");
};

</script>

<style scoped></style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 28px;
  border-bottom: 1px solid #cccccc;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 50;
}

.header_dropdown {
  width: 200px;
}

.header-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.header-title-highlight {
  color: #e54949;
}

.nav-list {
  display: flex;
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px;
  font-weight: 600;
  transition: all 0.4s ease;
}

.nav-item:hover {
  background-color: rgba(42, 96, 183, 0.08);
  color: #2a3bb7;
}

.header-icons {
  display: flex;
  gap: 16px;
  margin-left: auto;
}

.profile-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
