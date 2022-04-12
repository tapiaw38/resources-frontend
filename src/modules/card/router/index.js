export default {
  component: () =>
    import(/* webpackChunkName: "cardLayout" */ "../layouts/CardLayout"),
  children: [
    {
      path: "",
      name: "cards",
      component: () =>
        import(/* webpackChunkName: "cardEdit" */ "../views/CardEdit.vue"),
    },
  ],
};
