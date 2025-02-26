import { createRouter, createWebHashHistory } from "vue-router";

import Layout from "../views/Main.vue";
import Login from "../views/login/index.vue";
import Dashboard from "../views/dashboard/index.vue";
import B_E from "../views/show/b_e/index.vue";
import GAN from "../views/show/gan/index.vue";

const routes = [
  {
    path: '/',
    component: Layout,
    name: 'main',
    children: [
      {
        path: 'dashboard',
        meta: {
          id: '1',
          name: '控制台',
          icon: 'Platform',
          path: '/dashboard',
          describe: '用于展示当前系统中的各项数据',
        },
        component: Dashboard,
      },
      {
        path: 'show',
        meta: { id: '2', name: '展示界面', icon: 'Grid' },
        children: [
          {
            path: '',
            alias: ['b_e'],
            meta: {
              id: '1',
              name: '脑机美学认知展示界面',
              icon: 'Histogram',
              path: '/show/b_e',
              describe: '脑机美学认知展示界面',
            }, 
            component: B_E,
          },
          {
            path: 'gan',
            meta: {
              id: '2',
              name: 'GAN对抗结果展示界面',
              icon: 'Menu',
              path: '/show/gan',
              describe:
                'GAN对抗结果展示界面',
            },
            component: GAN,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = createRouter({
  //luyou data
  routes,
  //luyou mode
  history: createWebHashHistory(),
});

export default router;
