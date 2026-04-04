import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import GraphView from '../views/GraphView.vue'
import CalendarView from '../views/CalendarView.vue'
import EditorView from '../views/EditorView.vue'

const routes = [
  { path: '/',          component: Dashboard    },
  { path: '/graph',     component: GraphView    },
  { path: '/calendar',  component: CalendarView },
  { path: '/editor',    component: EditorView,  meta: { hideNavbar: true } },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
