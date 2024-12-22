<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import Header from "./components/UI/Header.vue";
import SideBar from "./components/UI/SideBar.vue";
import { ref, watch } from "vue";

const route = useRoute();
const isLoginPage = ref(false);

watch(() => route.path, () => {
  if(route.path === "/login" || route.path === "/signup") {
    isLoginPage.value = true;
  } else {
    isLoginPage.value = false;
  }
});

</script>

<template>
  <div class="app">
    <Header v-if="!isLoginPage" />
    <div class="app-body">
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column; /* Header at the top */
  height: 100vh; /* Full viewport height */
}

.app-body {
  display: flex;
  flex: 1; /* Take up remaining height after Header */
}

SideBar {
  flex: 0 0 250px; /* Fixed sidebar width */
}

main {
  flex: 1;
  padding: 2rem;
  overflow-y: auto; /* Scroll content if it overflows */
}

@media (max-width: 1024px) {
  main {
    padding-left: 6rem;
  }

  SideBar {
    flex: 0 0 6rem; /* Adjust sidebar width for smaller screens */
  }
}
</style>
