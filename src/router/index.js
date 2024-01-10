// Composables
import { createRouter, createWebHistory } from "vue-router";
// import productDetail from "../components/Product-detail.vue";
// import Product-detail from '';

const routes = [
  {
    path: "/home",
    name: "Layouts",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/layouts/default/Default.vue"),
    meta: { requiresAuth: true },
    props: {
      default: true,
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "/product_detail/:id",
        name: "product_detail",

        // component: productDetail,
        component: () => import("@/components/Product-detail.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/components/Login.vue"),
  },
  {
    path: "/signup",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/components/Signup.vue"),
  },
  // {
  //   path: "/product_detail/:id",
  //   name: "product_detail",

  //   // component: productDetail,
  //   component: () => import("@/components/Product-detail.vue"),
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: "/cart",
  //   name: "CartView",
  //   meta: { requiresAuth: true },
  //   component: Cart,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // This route requires auth, check if the token exists

    if (!token) {
      // If not logged in, redirect to login page with redirect query

      next({
        path: "/",

        // query: { redirect: to.fullPath },
      });
    } else {
      // If logged in, proceed to the destination

      next();
    }
  } else {
    // If no authentication is required, proceed to the destination

    next();
  }
});

export default router;
