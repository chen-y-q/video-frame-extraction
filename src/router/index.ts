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
            title: "视频抽帧",
        },
        component: () => import("@/views/videoTools.vue"),
    },
    {
        path: '/qrcode',
        name: 'qrcode',
        meta: {
            title: '二维码生成器'
        },
        component: () => import('@/views/qrcode.vue'),
    },
    {
        path: '/excelTojson',
        name: 'excelTojson',
        meta: {
            title: '二维码生成器'
        },
        component: () => import('@/views/excelTojson.vue'),
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;
