// test all the actions
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import { actions, mutations } from "@/store/index.js";
// import { createStore } from "vuex";
import json from "@/assets/testData.json";
import Home from "@/views/Home.vue";

// Vue.use(Vuex);
// const wrapper = mount(Home, {
//   global: {
//     plugins: [store],
//   },
// });
const commit = jest.fn();

// console.log(store);

describe("actions", () => {
  let store;
  let setDataMock;
  beforeEach(() => {
    setDataMock = jest.fn();
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
    });
  });
  test("test updateSearch action", async () => {
    return store
      .dispatch("updateSearch", true)
      .then(() => expect(store.state.search).toEqual(true));
  });
  test("test updateMinAge actions", async () => {
    return store
      .dispatch("updateMinAge", 20)
      .then(() => expect(store.state.minAge).toEqual(20));
  });
  test("test updateMaxAge actions", async () => {
    return store
      .dispatch("updateMaxAge", 30)
      .then(() => expect(store.state.maxAge).toEqual(30));
  });
  test("test updateGender actions", async () => {
    return store
      .dispatch("updateGender", "male")
      .then(() => expect(store.state.gender).toEqual("male"));
  });
  test("test updatePet actions", async () => {
    return store
      .dispatch("updatePet", "iguana")
      .then(() => expect(store.state.pet).toEqual("iguana"));
  });
  test("test updateFruit actions", async () => {
    return store
      .dispatch("updateFruit", "banana")
      .then(() => expect(store.state.fruit).toEqual("banana"));
  });
  test("test updateEyeColor actions", async () => {
    return store
      .dispatch("updateEyeColor", "green")
      .then(() => expect(store.state.eyeColor).toEqual("green"));
  });
  // all the updatefunctions operate on the same logic for objects so 1 is sufficient
  test("test updatePet with object", async () => {
    let pet = { target: { value: "iguana" } };
    return store
      .dispatch("updatePet", pet)
      .then(() => expect(store.state.pet).toEqual("iguana"));
  });
});
