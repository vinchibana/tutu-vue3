import { createRouter, createWebHashHistory } from "vue-router";
const TopCategory = () => import("@/views/category/TopCategory");
const Home = () => import("@/views/home/Home");
const SubCategory = () => import("@/views/category/SubCategory");

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/category/:id",
    component: TopCategory,
  },
  {
    path: "/category/sub/:id",
    component: SubCategory,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
