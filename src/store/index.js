import { createStore } from "vuex";

import employee from "../modules/employee/store/employee";

const store = createStore({
  modules: {
    employee,
  },
});

export default store;
