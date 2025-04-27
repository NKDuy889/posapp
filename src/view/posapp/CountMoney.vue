<template>
  <div class="px-4">
    <button
        class="border-[2px] border-amber-400 rounded-[8px] px-4 py-2 my-3 font-bold"
        @click="onShow"
    >
      COUNT
    </button>
    <div class="grid grid-cols-2 gap-3">
      <p>Min: <a-input-number class="!w-[300px]" v-model:value="minInMonth"/></p>
      <p>Max: <a-input-number class="!w-[300px]" v-model:value="maxInMonth"/></p>
    </div>
    <div v-for="(e, index) in arrMoney" :key="index">
      <div class="grid grid-cols-2 gap-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            Tk: <a-input-number class="!w-[300px]" v-model:value="e.tk"/>
          </div>
          <div>
            Tm: <a-input-number class="!w-[300px]" v-model:value="e.tm"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3" v-if="arrMoneyInRange.length">
          <div>
            Tk: <a-input-number class="!w-[300px]" v-model:value="arrMoneyInRange[index].tk"/>
          </div>
          <div>
            Tm: <a-input-number class="!w-[300px]" v-model:value="arrMoneyInRange[index].tm"/>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div>
        Tổng tháng: {{getToTal(arrMoney)}}
      </div>
      <div v-if="arrMoneyInRange.length">
        Tổng mới: {{getToTal(arrMoneyInRange)}}
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";

const arrMoney = ref([
  { tk: 10000, tm: 10000 },
  { tk: 10000, tm: 10000 },
  { tk: 10000, tm: 10000 },
]);

const minInMonth = ref(10000000);
const maxInMonth = ref(15000000);

const generateMoneyInRange = (arr, min, max) => {
  let result = [];
  let total = 0;

  // Tạo bản nháp đầu tiên
  for (let i = 0; i < arr.length; i++) {
    const { tk, tm } = arr[i];

    const generateValue = (original) => {
      const minVal = 10001;
      const ratio = Math.random() * 0.4 + 0.2; // lấy từ 20% đến 60%
      let base = Math.round(original * ratio / 10000) * 10000;
      let noise = Math.floor(Math.random() * 5000);
      let value = Math.max(minVal, Math.min(original, base + noise));
      return value;
    };

    const newTk = generateValue(tk);
    const newTm = generateValue(tm);
    result.push({ tk: newTk, tm: newTm });
    total += newTk + newTm;
  }

  // Scale lại nếu tổng vượt max hoặc nhỏ hơn min
  if (total < min || total > max) {
    const scale = Math.min(max / total, 1); // chỉ scale xuống
    total = 0;

    result = result.map((item, index) => {
      const newTk = Math.max(
          10001,
          Math.min(arr[index].tk, Math.round(item.tk * scale))
      );
      const newTm = Math.max(
          10001,
          Math.min(arr[index].tm, Math.round(item.tm * scale))
      );
      total += newTk + newTm;
      return { tk: newTk, tm: newTm };
    });
  }

  return (total >= min && total <= max) ? result : generateMoneyInRange(arr, min, max); // nếu chưa hợp lệ thì thử lại
}

const arrMoneyInRange = ref([])

const onShow = () => {
  const total = getToTal(arrMoney.value)
  if (total < maxInMonth.value) {
    return
  }
  console.log(arrMoney.value)
  arrMoneyInRange.value = generateMoneyInRange(arrMoney.value, minInMonth.value, maxInMonth.value)
  console.log(arrMoneyInRange.value)
  console.log(getToTal(arrMoney.value))
}

const getToTal = (arr = []) => {
  if (!arr.length) {
    return 0
  }
  let total = 0
  for (let i = 0; i < arr.length; i++) {
    total = total + arr[i].tk + arr[i].tm
  }
  return total
}
</script>

<style>
</style>
