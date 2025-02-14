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
    path: "/finanzas",
    name: "finanzas",
    component: () => import("../views/dashboard/DashboardContainer.vue"),
    meta: { requiresAuth: true },
    redirect: "/finanzas/home",
    children: [
      {
        path: "home",
        name: "dashboardHome",
        component: () => import("../views/dashboard/DashboardView.vue")
      },
      {
        path: "transaccion",
        name: "transaccion",
        component: () => import("../views/transactions/TransactionView.vue")
      }
    ]
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/finanzas"
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("user");
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
