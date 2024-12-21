<template>
  <div class="container">
    <div class="content">
      <div class="form-container">
        <h2 class="title">Sign in to your account</h2>
        <p class="subtitle">
          Not a member?
          <router-link to="/">Home</router-link>
        </p>

        <form class="form">
          <div class="form-group">
            <label>Email address</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input id="password" name="password" type="password" required />
          </div>

          <div class="form-actions">
            <a href="#" class="link">Forgot password?</a>
          </div>

          <button type="submit" class="button">Sign in</button>
        </form>
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
