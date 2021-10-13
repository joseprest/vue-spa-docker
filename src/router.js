import Vue from "vue";
import Router from "vue-router";
import Create from "./views/Create.vue";
import EZCreate from "./views/EZCreate.vue";
import User from "./views/User.vue";
import Work from "./views/Work.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Explore from "./views/Explore.vue";
import Quiz from "./views/Quiz.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/ez-create",
      name: "ez-create",
      component: EZCreate
    },
    {
      path: "/create",
      name: "create",
      component: Create
    },
    {
      path: "/user/:id",
      name: "user",
      component: User
    },
    // {
    //   path: "/user",
    //   name: "me",
    //   component: User
    // },
    {
      path: "/work/:id",
      name: "work",
      component: Work
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/explore",
      name: "explore",
      component: Explore
    },
    {
      path: "/quiz",
      name: "quiz",
      component: Quiz
    }
  ]
});
