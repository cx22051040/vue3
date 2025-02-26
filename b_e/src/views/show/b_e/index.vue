<template>
  <div class="container">
    <div class="banner1-container">
      <banner1 />
    </div>
    <div class="banners-row">
      <div class="banner2-container">
        <banner2 />
      </div>
      <div class="banner3-container">
        <banner3 />
      </div>
    </div>
  </div>
</template>

<script setup>
import banner1 from '../../../components/banner1.vue';
import banner2 from '../../../components/banner2.vue';
import banner3 from '../../../components/banner3.vue';
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
  justify-content: space-between;
  width: 80%; // Adjust the width as needed
}

.banner2-container,
.banner3-container {
  width: 48%; // Adjust the width as needed
}
</style>