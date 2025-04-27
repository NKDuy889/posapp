<template>
  <div class="home-container">
    <div class="grid grid-cols-2">
      <div class="pt-[50px] pl-[50px] text-4xl">
        <p class="mt-10 italic font-bold">
          <TextCustom :text-value="'TAXI SÂN BAY NỘI BÀI GIÁ RẺ'"></TextCustom>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import TextCustom from '@/components/text-custom/text-custom.vue'
import {onMounted} from "vue";

const arrMoney = [
  {tk: 19824000, tm: 4202410},
  {tk: 75124499, tm: 1321254},
  {tk: 6135124, tm: 6512341},
]

onMounted(() => {
  console.log(arrMoney)
})
</script>

<style lang="scss">
.home-container {
  background-image: url("./images/venom-crop.jpg");
  margin: 0; /* Đảm bảo không có margin xung quanh */
  height: 450px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box; /* Đảm bảo padding và border không ảnh hưởng đến kích thước */
  color: white;
}

.name-shop {
  animation: slideIn 0.5s ease-in forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.letter {
  opacity: 0; /* Ban đầu ẩn */
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateX(10px);
  }
  50% {
    opacity: 0.5;
    transform: translateX(5px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>