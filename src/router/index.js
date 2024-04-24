import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views//HomeView/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/artwork/:id",
      name: "artwork",
      component: () => import("../views/ArtWorkView/ArtWorkView.vue")
    }
  ]
});

export default router;
