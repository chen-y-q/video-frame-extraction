import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const home = () => import("../views/index.vue");

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "index",
        meta: {
            title: "首页",
        },
        component: home,
    },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;
