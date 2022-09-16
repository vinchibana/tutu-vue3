import { createRouter, createWebHashHistory } from "vue-router";
import authGuard from "@/router/authGuard";
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
const Order = () => import("@/views/member/order/Order");
const OrderList = () => import("@/views/member/order/OrderList");
const OrderDetail = () => import("@/views/member/order/OrderDetail");
const Member = () => import("@/views/member/home/Member");

const routes = [
  { path: "/", component: Home },
  { path: "/category/:id", component: TopCategory },
  { path: "/category/sub/:id", component: SubCategory },
  { path: "/goods/:id", component: GoodsDetail },
  { path: "/cart", component: Cart },
  { path: "/login", component: Login },
  { path: "/login/callback", component: LoginCallback },
  { path: "/pay", component: Pay },
  { path: "/checkout/order", component: Checkout },
  { path: "/checkout/pay", component: Pay },
  { path: "/member/home", component: Member },
  { path: "/pay/callback", component: PayResult },
  {
    path: "/member/order",
    component: Order,
    children: [
      { path: "", component: OrderList },
      { path: ":id", component: OrderDetail },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
  // 定义【模糊匹配】和【精确匹配】激活类名
  linkActiveClass: "fuzzy-active",
  linkExactActiveClass: "exact-active",
});
router.beforeEach(authGuard);
export default router;
