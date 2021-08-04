import { createStore } from "vuex";
import json from "@/assets/people.json";

export default createStore({
  state: {
    data: json,
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    getData: (state) => state.data,
  },
});
