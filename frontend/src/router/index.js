import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import GraphView from '../views/GraphView.vue'
import CalendarView from '../views/CalendarView.vue'

const routes = [
  { path: '/',          component: Dashboard    },
  { path: '/graph',     component: GraphView    },
  { path: '/calendar',  component: CalendarView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
