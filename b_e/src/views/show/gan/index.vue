<template>
  <div class="container">
    <div class="banner1-container">
      <banner1 />
    </div>
    <div class="banners-row">
      <div class="banner4-container">
        <banner4 />
      </div>
    </div>
  </div>
</template>

<script setup>
import banner1 from '../../../components/banner1.vue';
import banner4 from '../../../components/banner4.vue';
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.banner1-container {
  width: 80%; // Adjust the width as needed
  margin-bottom: 20px; // Space between banner1 and the row of banners
}

.banners-row {
  display: flex;
  justify-content: center;
  width: 100%; // Adjust the width as needed
}

.banner4-container {
  width: 60%; // Adjust the width as needed
}
</style>