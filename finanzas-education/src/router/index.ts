import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/LoginView.vue")
  }
  ,
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard/DashboardView.vue"),
  },
  {
    path: "/transaccion",
    name: "transaccion",
    component: () => import("../views/transactions/TransactionView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
