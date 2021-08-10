// test all the buttons
import Vuex from "vuex";
import Home from "@/views/Home.vue";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { actions, mutations, getters } from "@/store/index.js";
import json from "@/assets/testData.json";

const dispatch = jest.fn();

describe("Home.vue Unit Tests", () => {
  let store;
  let wrapper;
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        data: json,
        filteredData: json,
        search: false,
        minAge: -1,
        maxAge: 10000,
        dataMinAge: -1,
        pet: "",
        gender: "",
        fruit: "",
        eyeColor: "",
        genders: [],
        pets: [],
        fruits: [],
        eyeColors: [],
      },
      mutations: mutations,
      actions: actions,
      getters: getters,
    });
    store.dispatch = jest.fn();
    wrapper = mount(Home, {
      // store {
      global: {
        plugins: [store],
      },
    });
  });

  //   store.dispatch = jest.fn();
  test("Exists", () => {
    expect(wrapper.exists()).toBe(true);
  });
  test("Choosing a filter updates the value on select", async () => {
    const minAgeFilter = wrapper.find("#minAge").findAll("option");
    // console.log(minAgeFilter[1]);
    await minAgeFilter[30].setSelected();
    expect(wrapper.find("#minAge").element.value).toBe("29");
  });
  test("Updating the filter sets the value in the Vuex store", async () => {
    // const minAgeFilter = wrapper.find("#minAge").findAll("option");
    // console.log(minAgeFilter[1]);
    // await minAgeFilter[30].setSelected();
    const minAgeFilter = wrapper.find("#minAge").findAll("option");
    // console.log(store.dispatch);
    await minAgeFilter[30].setSelected();
    // await wrapper.vm.$nextTick();

    expect(actions.updateMinAge).toHaveBeenCalledWith(29);
  });
});
