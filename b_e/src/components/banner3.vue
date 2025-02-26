<template>
  <div
    class="banner-container"
    :style="{ height: height + 'px' }"
    @mouseenter="mouseenterEvent"
    @mouseleave="mouseleaveEvent"
  >
    <ul class="fade-banner">
      <li
        class="rotation-banner"
        ref="rotationRef"
        :style="{ height: height + 'px' }"
        v-for="(item, index) in listBanner"
        :key="index"
      >
        <img
          class="banner-img"
          @click="bannerLink"
          :src="item.img"
          :title="description"
        />
      </li>
    </ul>
    <el-icon class="left-button" @click="switchBanner('left')"
      ><ArrowLeft
    /></el-icon>
    <el-icon class="right-button" @click="switchBanner('right')"
      ><ArrowRight
    /></el-icon>
    <ul class="banner-indicator">
      <span
        v-for="index in listBanner.length"
        :key="index"
        class="barExternal"
        @click="swatchIndicator(index - 1)"
      >
        <li
          ref="indicatorRef"
          class="default-indicator"
          :class="{ 'active-indicator': index - 1 === 0 }"
        ></li>
      </span>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";

const props = defineProps({
  interval: {
    type: Number,
    default: 3000,
  },
  autoSwitch: {
    type: Boolean,
    default: true,
  },
  setHeight: {
    type: Number,
    default: 400,
  },
});

let timer = ref(null);
const switchIndex = ref(0);
const rotationRef = ref([]);
const indicatorRef = ref([]);
const description = ref(null);
const height = ref(props.setHeight);
const listBanner = ref([]);

const addTimer = () => {
  if (props.autoSwitch) {
    timer.value = setInterval(() => {
      switchBanner("right");
    }, props.interval);
  }
};

const stopInterval = () => {
  clearInterval(timer.value);
};

const switchDescription = () => {
  if (listBanner.value) {
    listBanner.value.forEach((item, index) => {
      if (index === switchIndex.value) {
        description.value = item.description;
      }
    });
  }
};

const mouseenterEvent = () => {
  stopInterval();
  switchDescription();
};

const mouseleaveEvent = () => {
  addTimer();
};

const changePicture = (num) => {
  rotationRef.value.forEach((i) => {
    i.style.opacity = "0";
  });
  toBannerBar(num);
  if (rotationRef.value.length !== 0) {
    rotationRef.value[num].style.opacity = "1";
  }
};

const toBannerBar = (val) => {
  indicatorRef.value.forEach((i) => {
    i.style.backgroundColor = "rgba(221, 221, 221, 0.541)";
  });
  if (indicatorRef.value.length !== 0) {
    indicatorRef.value[val].style.backgroundColor = "#ffffff";
  }
};

const switchBanner = (value) => {
  if (value === "right") {
    switchIndex.value++;
    if (switchIndex.value === listBanner.value.length) {
      switchIndex.value = 0;
    }
  } else {
    switchIndex.value--;
    if (switchIndex.value === -1) {
      switchIndex.value = listBanner.value.length - 1;
    }
  }
  changePicture(switchIndex.value);
  switchDescription();
};

const swatchIndicator = (value) => {
  switchIndex.value = value;
  changePicture(switchIndex.value);
  switchDescription();
};

const bannerLink = () => {
  if (listBanner.value) {
    listBanner.value.forEach((item, index) => {
      if (index === switchIndex.value && item.url) {
        window.location.href = item.url;
      }
    });
  }
};

const loadImages = () => {
  const images = [];
  for (let i = 1; i <= 5; i++) {
    // Assuming you have 10 images
    images.push({
      img: new URL(`../static/-UI--main/单张脑连接图/${i}.png`, import.meta.url)
        .href,
      description: `Image ${i}`,
    });
  }
  listBanner.value = images;
};

onMounted(() => {
  loadImages();
  addTimer();
});

onUnmounted(() => {
  stopInterval();
});
</script>

<style lang="less" scoped>
.banner-container {
  position: relative;
  .fade-banner {
    position: relative;
    list-style: none;
  }
  .rotation-banner {
    position: absolute;
    opacity: 0;
    transition-duration: 1.5s;
    width: 100%;
    &:first-child {
      opacity: 1;
    }
  }
  .banner-img {
    width: 100%;
    height: 100%;
    object-fit: contain; // Changed from cover to contain
    cursor: pointer;
  }
  .left-button,
  .right-button {
    position: absolute;
    cursor: pointer;
    top: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(31, 45, 61, 0.3);
    border-radius: 50%;
    opacity: 0;
  }
  .left-button {
    left: 25px;
  }
  .right-button {
    right: 25px;
  }
  .icon {
    height: 20px;
    width: 20px;
  }
  .banner-indicator {
    position: absolute;
    left: 50%;
    bottom: 15px;
    transform: translateX(-50%);
    cursor: pointer;
    display: flex;
    .barExternal {
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .default-indicator {
        width: 30px;
        height: 2px;
        background: rgba(221, 221, 221, 0.541);
        display: block;
        float: left;
        margin-right: 10px;
      }
      .active-indicator {
        background: #ffffff;
      }
    }
  }
  &:hover {
    .left-button,
    .right-button {
      opacity: 1;
    }
  }
}
</style>
