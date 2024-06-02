import { createRouter, createWebHistory } from "vue-router";
import Message from "../components/Message.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Message Everyone",
      component: Message,
    },
  ],
});

export default router;
