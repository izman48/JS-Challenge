// test all the actions
import Vuex from "vuex";
import { actions, mutations } from "@/store/index.js";
import json from "@/assets/testData.json";

const dispatch = jest.fn();

describe("actions", () => {
  let store;
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
    });
  });

  test("test updateFilteredData actions", async () => {
    await store.dispatch("updateEyeColor", "brown");
    await store.dispatch("updateGender", "male");
    await store.dispatch("updateFruit", "apple");
    return store.dispatch("updateFilteredData").then(() =>
      expect(store.state.filteredData).toEqual([
        {
          _id: "5d5d7ad6b0e83bc2d9d67dfb",
          age: 28,
          eyeColor: "brown",
          name: "Stephens Townsend",
          gender: "male",
          location: {
            latitude: 26.723281,
            longitude: 99.391104,
          },
          preferences: {
            pet: "bird",
            fruit: "apple",
          },
        },
      ])
    );
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
  // All the updatefunctions operate on the same logic for objects
  // I just tested on 1 of the functions
  test("test updatePet with object", async () => {
    let pet = { target: { value: "iguana" } };
    return store
      .dispatch("updatePet", pet)
      .then(() => expect(store.state.pet).toEqual("iguana"));
  });
  test("test updateDataMinAge actions", async () => {
    return store
      .dispatch("updateDataMinAge", 20)
      .then(() => expect(store.state.dataMinAge).toEqual(20));
  });
  test("test updateGenderFilters action", async () => {
    return store.dispatch("updateGenderFilters").then(() =>
      expect(store.state.genders).toEqual([
        { key: "0", value: "all" },
        { key: "1", value: "male" },
        { key: "2", value: "female" },
      ])
    );
  });

  test("test updatePetFilters action", async () => {
    return store.dispatch("updatePetFilters").then(() =>
      expect(store.state.pets).toEqual([
        { key: "0", value: "all" },
        { key: "1", value: "bird" },
        { key: "2", value: "cat" },
        { key: "3", value: "none" },
        { key: "4", value: "dog" },
      ])
    );
  });
  test("test updateFruitFilters action", async () => {
    return store.dispatch("updateFruitFilters").then(() =>
      expect(store.state.fruits).toEqual([
        { key: "0", value: "all" },
        { key: "1", value: "apple" },
        { key: "2", value: "strawberry" },
        { key: "3", value: "banana" },
        { key: "4", value: "mango" },
      ])
    );
  });
  test("test updateEyeFilters action", async () => {
    return store.dispatch("updateEyeFilters").then(() =>
      expect(store.state.eyeColors).toEqual([
        { key: "0", value: "all" },
        { key: "1", value: "brown" },
        { key: "2", value: "blue" },
        { key: "3", value: "green" },
      ])
    );
  });
  test("test updateFilters action", async () => {
    await actions.updateFilters({ dispatch });
    expect(dispatch).toHaveBeenNthCalledWith(1, "updateGenderFilters");
    expect(dispatch).toHaveBeenNthCalledWith(2, "updatePetFilters");
    expect(dispatch).toHaveBeenNthCalledWith(3, "updateFruitFilters");
    expect(dispatch).toHaveBeenNthCalledWith(4, "updateEyeFilters");
  });
});
