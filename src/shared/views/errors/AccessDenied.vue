<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};

const goDashboard = () => {
  router.push("/dashboard");
};
</script>

<template>
  <div class="access-wrapper">
    <div class="access-card">

      <div class="icon-box">🔒</div>
      <h1 class="title">Access Denied</h1>
      <p class="message">You don’t have permission to access this page.</p>
      <p class="sub-message">Please contact cargoaim support teams, Thank You!.</p>

      <div class="actions">
        <button class="btn btn-primary" @click="goBack">
          Go Back
        </button>

        <button class="btn btn-outline" @click="goDashboard">
          Dashboard
        </button>
      </div>

    </div>
  </div>
</template>


<style scoped>
.access-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa, #e4edf7);
}

.access-card {
  width: 420px;
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.icon-box {
  font-size: 52px;
  margin-bottom: 10px;
}

.title {
  font-size: 26px;
  font-weight: 700;
  color: #d9534f;
  margin-bottom: 10px;
}

.message {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.sub-message {
  font-size: 13px;
  color: #777;
  margin-bottom: 25px;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  transition: 0.2s;
}

.btn-primary {
  background: #d9534f;
  color: #fff;
}

.btn-primary:hover {
  background: #c9302c;
}

.btn-outline {
  background: transparent;
  border: 1px solid #ccc;
  color: #333;
}

.btn-outline:hover {
  background: #f1f1f1;
}
</style>