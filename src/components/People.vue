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
    <span v-show="edit">
      <input type="text" ref="name" :value="person.name" :disabled="!edit" />
      <input type="text" ref="age" :value="person.age" :disabled="!edit" />
      <input
        type="text"
        ref="gender"
        :value="person.gender"
        :disabled="!edit"
      />
      <input
        type="text"
        ref="eyeColor"
        :value="person.eyeColor"
        :disabled="!edit"
      />
      <input
        type="text"
        ref="pet"
        :value="person.preferences.pet"
        :disabled="!edit"
      />
      <input
        type="text"
        ref="fruit"
        :value="person.preferences.fruit"
        :disabled="!edit"
      />
    </span>

    <div class="edit">
      <button v-show="!edit" v-on:click="editPerson(person)">edit</button>
      <button v-show="edit" v-on:click="savePerson(person)">save</button>
      <button v-show="edit" v-on:click="cancelPerson(person)">cancel</button>
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
    };
  },
  methods: {
    ...mapActions(["updatePersonDetails", "updateFilters"]),
    editPerson(person) {
      //  this._originalPerson = Object.assign({}, person);
      console.log(person);
      this.edit = true;
    },

    cancelPerson(person) {
      //  Object.assign(person, this._originalPerson);
      console.log(person);
      this.edit = false;
    },

    savePerson(person) {
      console.log(person);
      console.log(this.$refs["name"].value);
      person.name = this.$refs["name"].value;
      person.age = this.$refs["age"].value;
      person.gender = this.$refs["gender"].value;
      person.eyeColor = this.$refs["eyeColor"].value;
      person.preferences.pet = this.$refs["pet"].value;
      person.preferences.fruit = this.$refs["fruit"].value;
      // this.updatePersonDetails(person, this.index);
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

.heading {
  color: #fff;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #0099ff;
}
</style>
