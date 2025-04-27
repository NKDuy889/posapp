<template>
  <span
      v-for="(value, index) in letters"
      :key="index"
      class="letter"
      :class="getLetterColor(index)"
      :style="{animationDelay: `${index * 0.1}s`}"
  >
    <span v-if="value !== ' '">{{ value }}</span>
    <span v-else>&nbsp;</span>
  </span>
</template>

<script setup>
import {ref, onMounted, defineProps} from 'vue'

const props = defineProps({
  textValue: {
    default: '',
  },
  colors: {
    default: [
      'text-red-500',
      'text-orange-500',
      'text-yellow-500',
      'text-green-500',
      'text-blue-500',
      'text-indigo-500',
      'text-purple-500'
    ]
  }
})

const letters = ref([])
// const isAnimating = ref(false)

const splitText = () => {
  letters.value = props.textValue ? props.textValue.split('') : []
}

// const startAnimation = () => {
//   isAnimating.value = true
// }

const getLetterColor = (index) => {
  return props.colors[index % props.colors.length]
}

onMounted(() => {
  splitText()
  // startAnimation()
})
</script>

<style scoped>
.animated-text-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.text-wrapper {
  display: flex;
  font-size: 4rem;
  font-weight: bold;
}

.letter {
  opacity: 0;
  display: inline-block;
  transform: scale(0.1) rotate(30deg);
  transition: all 0.5s ease;
}

.animate-text .letter {
  animation: letterAnimation 0.5s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes letterAnimation {
  0% {
    opacity: 0;
    transform: scale(0.1) rotate(30deg);
  }
  50% {
    transform: scale(1.05) rotate(-10deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}
</style>