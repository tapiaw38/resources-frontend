export default {
  component: () =>
    import(
      /* webpackChunkName: "EmployeeLayout" */ "../layouts/EmployeeLayout"
    ),
  children: [
    {
      path: "",
      name: "employees",
      component: () =>
        import(/* webpackChunkName: "employee" */ "../views/Employees.vue"),
    },
    {
      path: "trainees",
      name: "trainees",
      component: () =>
        import(/* webpackChunkName: "trainee" */ "../views/Trainees.vue"),
    },
    {
      path: "workplaces",
      name: "workplaces",
      component: () =>
        import(/* webpackChunkName: "workplaces" */ "../views/Workplaces.vue"),
    },
    {
      path: ":id/card",
      name: "employee-card",
      component: () =>
        import(
          /* webpackChunkName: "employeeCard" */ "../views/EmployeeCard.vue"
        ),
      props: (route) => {
        const id = Number(route.params.id);
        return isNaN(id) ? { id: 1 } : { id };
      },
    },
  ],
};
