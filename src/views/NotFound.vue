<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <router-link to="/" class="back-home">Go back to Home</router-link>
    </div>
  </template>
  
  <script setup>
    // No need for any script if just static content
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 100px;
  }
  
  h1 {
    font-size: 48px;
    color: #ff6347; /* Tomato color */
  }
  
  p {
    font-size: 18px;
    color: #333;
  }
  
  .back-home {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .back-home:hover {
    background-color: #0056b3;
  }
  </style>
  