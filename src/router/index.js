import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

import employeeRouter from "../modules/employee/router";
import cardRouter from "../modules/card/router";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/employee",
    ...employeeRouter,
  },
  {
    path: "/cards",
    ...cardRouter,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
