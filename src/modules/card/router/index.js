export default {
  component: () =>
    import(/* webpackChunkName: "CardLayout" */ "../layouts/CardLayout"),
  children: [
    {
      path: "/targets",
      name: "targets",
      component: () =>
        import(/* webpackChunkName: "targets" */ "../views/Targets.vue"),
    },
  ],
};
