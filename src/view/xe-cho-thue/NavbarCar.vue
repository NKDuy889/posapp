<template>
  <div class="home-car">
    <div class="flex items-center justify-between px-[40px]">
      <div>
        <p class="italic font-bold text-3xl title">
          TAXI SÂN BAY NỘI BÀI GIÁ RẺ
        </p>
      </div>
      <img src="@/images/logo/car-icon.png" class="w-[350px] h-[300px]" alt="car_logo">
    </div>
  </div>
</template>

<script setup>
</script>

<style>
.home-car {
  background-image: url("@/images/bg-slide.png");
  margin: 0; /* Đảm bảo không có margin xung quanh */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box; /* Đảm bảo padding và border không ảnh hưởng đến kích thước */
  color: white;
  height: 350px;
}

@keyframes fadeInText {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  animation: fadeInText 1.5s linear;
}

.car {
  width: 300px;
  filter: drop-shadow(10px 0px 20px rgba(0, 0, 255, 0.5)); /* Hiệu ứng bóng mờ */
  animation: moveCar 3s ease-in-out infinite alternate;
}

@keyframes moveCar {
  0% {
    transform: translateX(-10px);
    filter: drop-shadow(5px 0px 15px rgba(0, 0, 255, 0.5));
  }
  100% {
    transform: translateX(10px);
    filter: drop-shadow(15px 0px 25px rgba(0, 0, 255, 0.8));
  }
}
</style>
