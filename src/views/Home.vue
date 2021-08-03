<template>
  <div class="home">
    <div class="search-wrapper">
      <form onsubmit="event.preventDefault();" role="search">
        <!-- <label for="search">Serch </label> -->
        <input
          id="search"
          type="search"
          v-model="inSearchBar"
          placeholder="Search..."
          autofocus
          required
        />
        <select id="minAge" v-model="minAge">
          <option disabled value="">Min-age</option>
          <option v-for="age in ages" :key="age.key" :value="age.value">
            {{ age.value }}
          </option>
        </select>

        <select id="maxAge" v-model="maxAge">
          <option disabled value="">Max-age</option>
          <option v-for="age in ages" :key="age.key" :value="age.value">
            {{ age.value }}
          </option>
        </select>

        <select id="gender" v-model="gender">
          <option disabled value="">Gender</option>
          <option
            v-for="gender in genders"
            :key="gender.key"
            :value="gender.value"
          >
            {{ gender.value }}
          </option>
        </select>

        <select id="pet" v-model="pet">
          <option disabled value="">Pet</option>
          <option v-for="pet in pets" :key="pet.key" :value="pet.value">
            {{ pet.value }}
          </option>
        </select>
        <select id="fruit" v-model="fruit">
          <option disabled value="">Fruit</option>
          <option v-for="fruit in fruits" :key="fruit.key" :value="fruit.value">
            {{ fruit.value }}
          </option>
        </select>

        <input
          id="eyeColor"
          type="text"
          v-model="eyeColor"
          placeholder="Eye Color"
          autofocus
          required
        />
        <button type="submit">Go</button>
      </form>
    </div>

    <div class="charts-wrapper">
      <Charts :data="filteredList" />
    </div>

    <div class="people-container">
      <div class="people" v-for="people in filteredList" :key="people._id">
        <People
          :name="people.name"
          :age="people.age"
          :eyeColor="people.eyeColor"
          :gender="people.gender"
          :location="people.location"
          :preferences="people.preferences"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import People from "@/components/People.vue";
import Charts from "@/components/Charts.vue";
import json from "@/assets/people.json";

export default {
  name: "Home",
  components: {
    People,
    Charts,
  },
  data() {
    return {
      data: json,
      ages: [],
      genders: [
        { key: 0, value: "all" },
        { key: 1, value: "male" },
        { key: 2, value: "female" },
        { key: 3, value: "other" },
      ],
      pets: [],
      fruits: [],
      inSearchBar: "",
      pet: "",
      fruit: "",
      minAge: -1,
      maxAge: 10000,
      gender: "",
      eyeColor: "",
      // selected: {
      //   age: 0,
      //   name: '',
      //   gender: '',
      //   location: {latitude: 0.0,
      //   }
      //   },
      //   preferences: Object,
      // }
    };
  },
  methods: {
    petData() {
      let pets = new Set();
      for (let i in this.data) {
        pets.add(this.data[i].preferences.pet);
      }
      // console.log(pets.size);
      let petsArray = Array.from(pets);
      petsArray.unshift("all");
      for (let i in petsArray) {
        this.pets.push({ key: i, value: petsArray[i] });
      }
    },
    fruitData() {
      let fruits = new Set();
      for (let i in this.data) {
        fruits.add(this.data[i].preferences.fruit);
      }
      // console.log(pets.size);
      let fruitsArray = Array.from(fruits);
      fruitsArray.unshift("all");
      for (let i in fruitsArray) {
        this.fruits.push({ key: i, value: fruitsArray[i] });
      }
    },
  },
  computed: {
    filteredList() {
      return this.data.filter((person) => {
        let genderSelect = "";
        let petSelect = "";
        let fruitSelect = "";
        let searchString =
          person.name +
          " " +
          person.eyeColor +
          " " +
          person.age +
          " " +
          person.gender +
          " ";
        // console.log(this.maxAge);
        // if (this.maxAge == 0) {
        //   this.maxAge = 10000;
        // }
        // for (let age in this.ages) {
        //   console.log(age);
        // }
        if (this.gender != "all") {
          genderSelect = this.gender;
        }
        if (this.pet != "all") {
          petSelect = this.pet;
        }
        if (this.fruit != "all") {
          fruitSelect = this.fruit;
        }
        return (
          searchString.toLowerCase().indexOf(this.inSearchBar.toLowerCase()) !=
            -1 &&
          person.age >= this.minAge &&
          person.age <= this.maxAge &&
          person.preferences.pet
            .toLowerCase()
            .indexOf(petSelect.toLowerCase()) != -1 &&
          person.preferences.fruit
            .toLowerCase()
            .indexOf(fruitSelect.toLowerCase()) != -1 &&
          person.gender.toLowerCase().indexOf(genderSelect.toLowerCase()) !=
            -1 &&
          person.eyeColor.toLowerCase().indexOf(this.eyeColor.toLowerCase()) !=
            -1
        );
      });
    },
  },
  // methods: {
  // },

  mounted() {
    // console.log("here");
    for (var i = 0; i < 100; i++) {
      this.ages.push({ key: i, value: i });
    }
    this.petData();
    this.fruitData();
  },
};
</script>

<style>
.search-wrapper {
  display: flex;
  padding: 10px;
  background: orange;
  align-items: center;
}

input {
  width: 80%;
}
</style>
