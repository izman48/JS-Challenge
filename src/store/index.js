import { createStore } from "vuex";
import json from "@/assets/people.json";

export default createStore({
  state: {
    data: json,
    minAge: -1,
    maxAge: 10000,
    pet: "",
    gender: "",
    fruit: "",
    eyeColor: "",
    genders: [],
    pets: [],
    fruits: [],
    eyeColors: [],
  },
  mutations: {
    editPerson: (state, person, index) => {
      state.data[index] = person;
    },
    editTable: (state, people) => {
      state.data = people;
    },
    setMinAge: (state, minAge) => {
      state.minAge = minAge;
    },
    setMaxAge: (state, maxAge) => {
      state.maxAge = maxAge;
    },
    setPet: (state, pet) => {
      state.pet = pet;
    },
    setGender: (state, gender) => {
      state.gender = gender;
    },
    setFruit: (state, fruit) => {
      state.fruit = fruit;
    },
    setEyeColor: (state, eyeColor) => {
      state.eyeColor = eyeColor;
    },
    genderFilter: (state) => {
      let genders = new Set();
      for (let i in state.data) {
        genders.add(state.data[i].gender);
      }
      // console.log(pets.size);
      let gendersArray = Array.from(genders);
      gendersArray.unshift("all");
      for (let i in gendersArray) {
        state.genders.push({ key: i, value: gendersArray[i] });
      }
    },
    petFilter: (state) => {
      let pets = new Set();
      for (let i in state.data) {
        pets.add(state.data[i].preferences.pet);
      }
      // console.log(pets.size);
      let petsArray = Array.from(pets);
      petsArray.unshift("all");
      for (let i in petsArray) {
        state.pets.push({ key: i, value: petsArray[i] });
      }
    },
    fruitFilter: (state) => {
      let fruits = new Set();
      for (let i in state.data) {
        fruits.add(state.data[i].preferences.fruit);
      }
      // console.log(pets.size);
      let fruitsArray = Array.from(fruits);
      fruitsArray.unshift("all");
      for (let i in fruitsArray) {
        state.fruits.push({ key: i, value: fruitsArray[i] });
      }
    },
    eyeFilter: (state) => {
      let eyes = new Set();
      for (let i in state.data) {
        eyes.add(state.data[i].eyeColor);
      }
      // console.log(pets.size);
      let eyeArray = Array.from(eyes);
      eyeArray.unshift("all");
      for (let i in eyeArray) {
        state.eyeColors.push({ key: i, value: eyeArray[i] });
      }
    },
  },
  actions: {
    async updatePersonDetails({ commit }, person, index) {
      commit("editPerson", person, index);
    },
    async updateAllDetails({ commit }, people) {
      commit("editTable", people);
    },
    async updateMinAge({ commit }, minAge) {
      commit("setMinAge", minAge.target.value);
      // console.log(minAge.target.value);
    },
    async updateMaxAge({ commit }, maxAge) {
      commit("setMaxAge", maxAge).target.value;
    },
    async updatePet({ commit }, pet) {
      // console.log(pet.target.value);
      commit("setPet", pet.target.value);
    },
    async updateGender({ commit }, gender) {
      commit("setGender", gender.target.value);
    },
    async updateFruit({ commit }, fruit) {
      commit("setFruit", fruit.target.value);
    },
    async updateEyeColor({ commit }, eyeColor) {
      commit("setEyeColor", eyeColor.target.value);
    },
    async updateGenderFilters({ commit }) {
      commit("genderFilter");
    },
    async updatePetFilters({ commit }) {
      commit("petFilter");
    },
    async updateFruitFilters({ commit }) {
      commit("fruitFilter");
    },
    async updateEyeFilters({ commit }) {
      commit("eyeFilter");
    },
  },
  modules: {},
  getters: {
    getData: (state) => state.data,
    getMinAge: (state) => state.minAge,
    getMaxAge: (state) => state.maxAge,
    getPet: (state) => state.pet,
    getFruit: (state) => state.fruit,
    getGender: (state) => state.gender,
    getEyeColor: (state) => state.eyeColor,
    getGenders: (state) => state.genders,
    getPets: (state) => state.pets,
    getFruits: (state) => state.fruits,
    getEyeColors: (state) => state.eyeColors,
  },
});
