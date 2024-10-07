<script setup lang="ts">
import {
  getDocs,
  deleteDoc,
  getFirestore,
  collection,
  query,
  orderBy,
  doc
} from 'firebase/firestore'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import type { IInterviews } from '@/interfaces'
import { useConfirm } from 'primevue/useconfirm'

const userStore = useUserStore()
const db = getFirestore()
const isLoading = ref<boolean>(true)
const interviews = ref<IInterviews[]>([])
const confirm = useConfirm()

const getAllInterviews = async <T extends IInterviews>(): Promise<T[]> => {
  const getData = query(
    collection(db, `user/${userStore.userId}/Interviews`),
    orderBy('createdAt', 'desc')
  )
  const listDocs = await getDocs(getData)
  return listDocs.docs.map((doc) => doc.data() as T)
}

const confirmRemoveInterview = async (id: string): Promise<void> => {
  confirm.require({
    message: 'Вы хотите удалить собеседование?',
    header: 'Удаление собеседований',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Отмена',
    acceptLabel: 'Удалить',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: async () => {
      isLoading.value = true
      await deleteDoc(doc(db, `user/${userStore.userId}/Interviews`, id))

      const listInterviews: Array<IInterviews> = await getAllInterviews()
      interviews.value = [...listInterviews]

      isLoading.value = false
    }
  })
}

onMounted(async () => {
  const listInterviews: Array<IInterviews> = await getAllInterviews()
  interviews.value = [...listInterviews]
  isLoading.value = false
})
</script>

<template>
  <app-dialog />
  <app-spinner v-if="isLoading" />
  <app-message v-else-if="!isLoading && !interviews.length"> Список Пуст </app-message>
  <div v-else>
    <h1>Список собеседований</h1>
    <app-data-table :value="interviews">
      <app-column field="company" header="Компания">1</app-column>
      <app-column field="hrName" header="Имя HR"></app-column>
      <app-column field="vacancyLink" header="Ссылка на вакансию">
        <template #body="slotProps">
          <a :href="slotProps.data.vacancyLink" target="_blank">{{ slotProps.data.vacancyLink }}</a>
        </template>
      </app-column>
      <app-column header="Контакты">
        <template #body="slotProps">
          <div class="contacts">
            <a
              v-if="slotProps.data.contactTelegram"
              :href="`https://t.me/${slotProps.data.contactTelegram}`"
              class="contacts__telegram"
              target="_blank"
            >
              <span class="pi pi-telegram"></span>
            </a>
            <a
              v-if="slotProps.data.contactTelegram"
              :href="`https://wa.me/${slotProps.data.contactWhatsApp}`"
              class="contacts__whatsapp"
              target="_blank"
            >
              <span class="pi pi-whatsapp"></span>
            </a>
            <a
              v-if="slotProps.data.contactPhone"
              :href="`tel:${slotProps.data.contactPhone}`"
              class="contacts__phone"
            >
              <span class="pi pi-phone"></span>
            </a>
          </div>
        </template>
      </app-column>
      <app-column>
        <template #body="slotProps">
          <div class="flex gap-2">
            <router-link :to="`/interview/${slotProps.data.id}`">
              <app-button severity="info" icon="pi pi-pencil" />
            </router-link>
            <app-button
              icon="pi pi-trash"
              severity="danger"
              @click="confirmRemoveInterview(slotProps.data.id)"
            />
          </div>
        </template>
      </app-column>
    </app-data-table>
  </div>
</template>
<style scoped>
.contacts {
  display: flex;
  align-items: center;
  gap: 20px;
}

.contacts__phone {
  color: #371777;
}
.contacts__telegram {
  color: #0088cc;
}
.contacts__whatsapp {
  color: #25d366;
}

.contacts__icon {
  font-size: 20px;
}
</style>
