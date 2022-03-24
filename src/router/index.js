import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/employees",
    name: "employees",
    component: () =>
      import(/* webpackChunkName: "employee" */ "../views/Employees.vue"),
  },
  {
    path: "/targets",
    name: "targets",
    component: () =>
      import(/* webpackChunkName: "targets" */ "../views/Targets.vue"),
  },
  {
    path: "/workplaces",
    name: "workplaces",
    component: () =>
      import(/* webpackChunkName: "workplaces" */ "../views/Workplaces.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
