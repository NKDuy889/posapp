<template>
  <div class="px-4">
    <button
        class="border-[2px] border-amber-400 rounded-[8px] px-4 py-2 my-3 font-bold"
        @click="onShow"
    >
      COUNT
    </button>
    <div class="grid grid-cols-2 gap-3">
      <p>Min:
        <a-input-number class="!w-[300px]" v-model:value="minInMonth"/>
      </p>
      <p>Max:
        <a-input-number class="!w-[300px]" v-model:value="maxInMonth"/>
      </p>
    </div>
    <div v-for="(e, index) in arrMoney" :key="index">
      <div class="grid grid-cols-2 gap-5">
        <div class="grid grid-cols-4 gap-3">
          <div>
            Tk{{ index + 1 }}:
            <a-input-number class="!w-[300px]" v-model:value="e.tk"/>
          </div>
          <div>
            Tm:
            <a-input-number class="!w-[300px]" v-model:value="e.tm"/>
          </div>
          <div>
            Tk{{ index + 1 }}:
            <a-input-number class="!w-[300px]" v-model:value="e.zp"/>
          </div>
          <div>
            Tm:
            <a-input-number class="!w-[300px]" v-model:value="e.tb"/>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-3" v-if="arrMoneyInRange.length">
          <div>
            Tk:
            <a-input-number class="!w-[300px]" v-model:value="arrMoneyInRange[index].tk"/>
          </div>
          <div>
            Tm:
            <a-input-number class="!w-[300px]" v-model:value="arrMoneyInRange[index].tm"/>
          </div>
          <div>
            Tk:
            <a-input-number class="!w-[300px]" v-model:value="arrMoneyInRange[index].zp"/>
          </div>
          <div>
            Tm:
            <a-input-number class="!w-[300px]" v-model:value="arrMoneyInRange[index].tb"/>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div>
        Tổng tháng: {{ getToTal(arrMoney) }}
      </div>
      <div v-if="arrMoneyInRange.length">
        Tổng mới: {{ getToTal(arrMoneyInRange) }}
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";

const arrMoney = ref([
  {tk: 218000, tm: 8061000, zp: 120000, tb: 0},
  {tk: 10000, tm: 5098000, zp: 0, tb: 120000},
  {tk: 202341, tm: 3985000, zp: 0, tb: 0},
  {tk: 90000, tm: 6605000, zp: 0, tb: 0},
  {tk: 10000, tm: 7092000, zp: 0, tb: 0},
  {tk: 10000, tm: 4516000, zp: 0, tb: 0},
  {tk: 10000, tm: 4431000, zp: 0, tb: 0},
  {tk: 10000, tm: 4623000, zp: 0, tb: 0},
  {tk: 10000, tm: 4497000, zp: 0, tb: 0},
  {tk: 911000, tm: 4840000, zp: 0, tb: 0},
  {tk: 10000, tm: 6396000, zp: 0, tb: 0},
  {tk: 10000, tm: 6890000, zp: 0, tb: 0},
  {tk: 10000, tm: 2698000, zp: 0, tb: 0},
  {tk: 10000, tm: 4073000, zp: 0, tb: 0},
  {tk: 10000, tm: 4939000, zp: 0, tb: 0},
  {tk: 33000, tm: 6169000, zp: 0, tb: 0},
  {tk: 10000, tm: 4634000, zp: 0, tb: 0},
  {tk: 10000, tm: 6988000, zp: 0, tb: 0},
  {tk: 10000, tm: 7690000, zp: 0, tb: 0},
  {tk: 10000, tm: 5290000, zp: 0, tb: 0},
  {tk: 10000, tm: 5405000, zp: 0, tb: 0},
  {tk: 10000, tm: 5987000, zp: 0, tb: 0},
  {tk: 10000, tm: 6057000, zp: 0, tb: 0},
  {tk: 10000, tm: 6772000, zp: 0, tb: 0},
  {tk: 10000, tm: 2605000, zp: 0, tb: 0},
]);

const minInMonth = ref(10000000);
const maxInMonth = ref(15000000);

function scaleDownComplexMoneyArray(sourceArr, minTotal, maxTotal, minValue = 10000) {
  const totalMax = sourceArr.reduce((sum, item) =>
      sum + item.tk + item.tm + item.zp + item.tb, 0
  );

  if (totalMax < minTotal) {
    throw new Error("Không thể đạt tổng yêu cầu với dữ liệu hiện tại.");
  }

  const minRatio = minTotal / totalMax;
  const maxRatio = maxTotal / totalMax;
  const scaleRatio = Math.random() * (maxRatio - minRatio) + minRatio;

  const scaledArr = sourceArr.map(item => {
    const scaleField = (fieldVal) => {
      if (fieldVal === 0) return 0;
      const scaled = Math.floor(fieldVal * scaleRatio);
      return Math.max(minValue, Math.min(scaled, fieldVal));
    };

    return {
      tk: scaleField(item.tk),
      tm: scaleField(item.tm),
      zp: scaleField(item.zp),
      tb: scaleField(item.tb),
    };
  });

  const total = scaledArr.reduce((sum, item) =>
      sum + item.tk + item.tm + item.zp + item.tb, 0
  );

  if (total >= minTotal && total <= maxTotal) {
    return scaledArr;
  }

  // Thử lại nếu chưa đạt yêu cầu
  return scaleDownComplexMoneyArray(sourceArr, minTotal, maxTotal, minValue);
}

const arrMoneyInRange = ref([])

const onShow = () => {
  const total = getToTal(arrMoney.value)
  if (total < maxInMonth.value) {
    return
  }
  arrMoneyInRange.value = scaleDownComplexMoneyArray(arrMoney.value, minInMonth.value, maxInMonth.value)
  console.log(arrMoneyInRange.value)
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
