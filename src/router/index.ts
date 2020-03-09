import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import AdminDash from '../views/AdminDash.vue';
import UserDash from '../views/UserDash.vue';
import Register from '../views/Register.vue';
import Zonegroup from '../views/Zonegroup.vue';
import ZonegroupUser from '../views/ZonegroupUser.vue';
import SpacePreview from '../views/SpacePreview.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin/dashboard',
    name: 'admindash',
    component: AdminDash
  },
  {
    path: '/zonegroup/mygroup/:id',
    name: 'zonegroupuser',
    props: true,
    component: ZonegroupUser
  },
  {
    path: '/zonegroup/:id',
    name: 'spacepreview',
    props: true,
    component: SpacePreview
  },
  {
    path: '/admin/zonegroup/:id',
    name: 'zonegroup',
    props: true,
    component: Zonegroup
  },
  {
    path: '/user/dashboard',
    name: 'userdash',
    component: UserDash
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
];

const router = new VueRouter({
  routes
});

export default router;
