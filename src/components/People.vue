<template>
  <div class="people">
    <span v-show="!edit">
      <h1>{{ person.name }} {{ person.age }}</h1>
      <h4>
        Gender - {{ capitalize(person.gender) }} | Eye Color -
        {{ capitalize(person.eyeColor) }} | Pet -
        {{ capitalize(person.preferences.pet) }} | Favourite Fruit -
        {{ capitalize(person.preferences.fruit) }}
      </h4>
    </span>
    <span class="input-group-text" v-show="edit">
      <input
        type="text"
        class="editName form-control"
        v-model="name"
        :disabled="!edit"
      />
      <input
        type="text"
        class="editAge form-control"
        v-model="age"
        :disabled="!edit"
      />
      <input
        type="text"
        class="editGender form-control"
        v-model="gender"
        :disabled="!edit"
      />
      <input
        type="text"
        class="editEye form-control"
        v-model="eyeColor"
        :disabled="!edit"
      />
      <input
        type="text"
        Class="editPet form-control"
        v-model="pet"
        :disabled="!edit"
      />
      <input
        type="text"
        class="editFruit form-control"
        v-model="fruit"
        :disabled="!edit"
      />
    </span>

    <div class="edit d-grid gap-2 d-md-flex justify-content-md-end">
      <button
        class="btn btn-secondary"
        id="editButton"
        v-show="!edit"
        v-on:click="editPerson"
      >
        edit
      </button>
      <div class="btn-group justify-content-md-end">
        <button
          class="btn btn-secondary"
          id="saveButton"
          v-show="edit"
          v-on:click="savePerson(person)"
        >
          save
        </button>
        <button
          class="btn btn-secondary"
          id="cancelButton"
          v-show="edit"
          v-on:click="cancelPerson(person)"
        >
          cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "People",
  props: {
    person: Object,
    index: Number,
  },
  data() {
    return {
      edit: false,
      name: this.person.name,
      age: this.person.age,
      gender: this.person.gender,
      eyeColor: this.person.eyeColor,
      pet: this.person.preferences.pet,
      fruit: this.person.preferences.fruit,
      lat: this.person.location.latitude,
      long: this.person.location.longitude,
    };
  },
  methods: {
    ...mapActions(["updatePersonDetails", "updateFilters"]),
    editPerson() {
      this.edit = true;
    },

    cancelPerson(person) {
      this.name = person.name;
      this.age = person.age;
      this.gender = person.gender;
      this.eyeColor = person.eyeColor;
      this.pet = person.preferences.pet;
      this.fruit = person.preferences.fruit;
      this.edit = false;
    },

    savePerson(person) {
      person.name = this.name;
      person.age = this.age;
      person.gender = this.gender;
      person.eyeColor = this.eyeColor;
      person.preferences.pet = this.pet;
      person.preferences.fruit = this.fruit;
      this.updateFilters();
      this.edit = false;
    },
    capitalize(word) {
      let newWord = word.charAt(0).toUpperCase() + word.substring(1);
      return newWord;
    },
  },
};
</script>

<style scoped>
.people {
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  border-radius: 0.5rem;
  border-left: 0 solid #00ff99;
  transition: border-left 300ms ease-in-out, padding-left 300ms ease-in-out;
}

.people:hover {
  padding-left: 0.5rem;
  border-left: 0.5rem solid #00ff99;
}

.center {
  margin: 0px auto;
}
</style>
