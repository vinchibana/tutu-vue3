import { createRouter, createWebHashHistory } from "vue-router";
const TopCategory = () => import("@/views/category/TopCategory");
const Home = () => import("@/views/home/Home");
const SubCategory = () => import("@/views/category/SubCategory");
const GoodsDetail = () => import("@/views/goods/GoodsDetailPage");
const Cart = () => import("@/views/cart/Cart");
const Login = () => import("@/views/login/Login");
const LoginCallback = () => import("@/views/login/components/LoginCallback");
const Pay = () => import("@/views/pay/Pay");
const Checkout = () => import("@/views/pay/Checkout");
const PayResult = () => import("@/views/pay/PayResult");

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
  {
    path: "/goods/:id",
    component: GoodsDetail,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/login/callback",
    component: LoginCallback,
  },
  {
    path: "/pay",
    component: Pay,
  },
  {
    path: "/checkout/order",
    component: Checkout,
  },
  {
    path: "/checkout/pay",
    component: Pay,
  },
  {
    path: "/pay/callback",
    component: PayResult,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach()
export default router;
