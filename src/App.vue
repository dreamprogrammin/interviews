<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import { useUserStore } from './stores/user'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
const isLoading = ref<boolean>(true)

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      userStore.userId = user.uid
    } else {
      userStore.userId = ''
    }
    isLoading.value = false
  })
})
</script>

<template>
  <app-spinner
    v-if="isLoading"
    style="width: 50px; height: 50px"
    strokeWidth="8"
    fill="transparent"
    animationDuration=".5s"
    aria-label="Custom ProgressSpinner"
  />
  <div class="container" v-else>
    <AppHeader />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: auto;
  padding: 20px;
}
</style>
