import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('counter', () => {
  const userId = ref<string>('')

  return { userId }
})
