<template>
  <div class="container">
    <div class="content">
      <div class="form-container">
        <h2 class="title">Signup</h2>
        <p class="subtitle">
          Already have account?
          <a href="#" class="link">Login</a>
        </p>

        <form class="form">
          <div class="form-group">
            <label for="email">Email address</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div class="form-group">
            <label for="username">Username</label>
            <input id="username" name="username" type="text" required />
          </div>

          <div class="form-group">
            <label for="full_name">Full Name</label>
            <input id="full_name" name="full_name" type="text" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>

          <div class="form-actions">
            <a href="#" class="link">Forgot password?</a>
          </div>

          <button type="submit" class="button">Sign up</button>
        </form>
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
