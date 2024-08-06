import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "index",
        meta: {
            title: "首页",
        },
        component: () => import("@/views/index.vue"),
    },
    {
        path: "/videoTools",
        name: "videoTools",
        meta: {
            title: "关于",
        },
        component: () => import("@/views/videoTools.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;
