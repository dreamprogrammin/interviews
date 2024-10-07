import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import Message from 'primevue/message'
import type { Component, App } from 'vue'

interface IComponentConfig {
  name: string
  component: Component
}

const components: IComponentConfig[] = [
  {
    name: 'app-menubar',
    component: Menubar
  },
  {
    name: 'app-button',
    component: Button
  },
  {
    name: 'app-input-text',
    component: InputText
  },
  {
    name: 'app-toast',
    component: Toast
  },
  {
    name: 'app-spinner',
    component: ProgressSpinner
  },
  {
    name: 'app-card',
    component: Card
  },
  {
    name: 'app-data-table',
    component: DataTable
  },
  {
    name: 'app-column',
    component: Column
  },
  {
    name: 'app-dialog',
    component: ConfirmDialog
  },
  {
    name: 'app-message',
    component: Message
  }
]

export default {
  install(app: App) {
    components.forEach(({ name, component }) => {
      app.component(name, component)
    })
  }
}
