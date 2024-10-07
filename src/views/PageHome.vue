<script setup lang="ts">
import type { IInterviews } from '@/interfaces'
import { computed, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { setDoc, doc, getFirestore } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const db = getFirestore()
const router = useRouter()

const company = ref<string>('')
const vacancyLink = ref<string>('')
const hrName = ref<string>('')
const contactTelegram = ref<string>('')
const contactWhatsApp = ref<string>('')
const contactPhone = ref<string>('')
const loading = ref<boolean>(false)

const disabledSaveButton = computed<boolean>(() => {
  return !(hrName.value && vacancyLink.value && company.value)
})

const addNewInterview = async (): Promise<void> => {
  const payload: IInterviews = {
    id: uuidv4(),
    company: company.value,
    vacancyLink: vacancyLink.value,
    hrName: hrName.value,
    contactTelegram: contactTelegram.value,
    contactWhatsApp: contactWhatsApp.value,
    contactPhone: contactPhone.value,
    createdAt: new Date()
  }

  if (userStore.userId) {
    await setDoc(doc(db, `user/${userStore.userId}/Interviews`, payload.id), payload).then(() =>
      router.push('/list')
    )
  }
}
</script>

<template>
  <div class="content-interview">
    <app-card>
      <template #title>Новое собеседование</template>
      <template #content>
        <app-input-text class="input mb-3" placeholder="Компания" v-model="company" />
        <app-input-text
          v-model="vacancyLink"
          class="input mb-3"
          placeholder="Описание вакансии (ссылка)"
        />
        <app-input-text v-model="hrName" class="input mb-3" placeholder="Контакт (имя)" />
        <app-input-text
          v-model="contactTelegram"
          class="input mb-3"
          placeholder="Telegram username HR"
        />
        <app-input-text
          v-model="contactWhatsApp"
          class="input mb-3"
          placeholder="WhatsApp телефон HR"
        />
        <app-input-text v-model="contactPhone" class="input mb-3" placeholder="Телефон HR" />
        <app-button
          @click="addNewInterview"
          label="Создать собеседование"
          :disabled="disabledSaveButton"
          :loading="loading"
        ></app-button>
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.content-interview {
  margin: auto;
  max-width: 600px;
}
.input {
  width: 100%;
}
</style>
