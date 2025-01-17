import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
//import Icons from "@/pages/Icons.vue";
//import Maps from "@/pages/Maps.vue";
//import Notifications from "@/pages/Notifications.vue";
//import UserProfile from "@/pages/UserProfile.vue";
//import TableList from "@/pages/TableList.vue";
//import Typography from "@/pages/Typography.vue";
//import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";

//
import Transacciones from "./pages/Transacciones.vue";
import Cuentas from "./pages/Cuentas.vue";
import Reportes from "./pages/Reportes.vue";
import Configuraciones from "./pages/Configuraciones.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "transacciones",
        name: "Transacciones",
        component: Transacciones,
      },
      {
        path: "cuentas",
        name: "Cuentas",
        component: Cuentas,
      },
      {
        path: "reportes",
        name: "Reportes",
        component: Reportes,
      },
      {
        path: "configuraciones",
        name: "Configuraciones",
        component: Configuraciones,
      }
    ],
  },
];

export default routes;
