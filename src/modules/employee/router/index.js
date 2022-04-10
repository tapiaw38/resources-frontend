export default {
  component: () =>
    import(
      /* webpackChunkName: "EmployeeLayout" */ "../layouts/EmployeeLayout"
    ),
  children: [
    {
      path: "/employees",
      name: "employees",
      component: () =>
        import(/* webpackChunkName: "employee" */ "../views/Employees.vue"),
    },
    {
      path: "/trainees",
      name: "trainees",
      component: () =>
        import(/* webpackChunkName: "trainee" */ "../views/Trainees.vue"),
    },
    {
      path: "/workplaces",
      name: "workplaces",
      component: () =>
        import(/* webpackChunkName: "workplaces" */ "../views/Workplaces.vue"),
    },
  ],
};
