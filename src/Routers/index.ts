import { createRouter, createWebHistory } from 'vue-router';
import App from "@/App.vue";
import HomeRouter from "@/Routers/Router/HomeRouter.ts";
import SignRouter from "@/Routers/Router/SignRouter.ts";

const routes = [HomeRouter, SignRouter];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;