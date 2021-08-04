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
          <option disabled value="">Min-Age</option>
          <option v-for="age in ages" :key="age.key" :value="age.value">
            {{ age.value }}
          </option>
        </select>

        <select id="maxAge" v-model="maxAge">
          <option disabled value="">Max-Age</option>
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

        <select id="fruit" v-model="eyeColor">
          <option disabled value="">Eye-Color</option>
          <option v-for="eye in eyeColours" :key="eye.key" :value="eye.value">
            {{ eye.value }}
          </option>
        </select>
        <button type="submit">Go</button>
      </form>
    </div>

    <button v-on:click="switchChartType">{{ buttonMessage }}</button>
    <div class="charts-wrapper">
      <div class="chart">
        <h4>Pet Data</h4>
        <Charts :chartData="petData()" :type="type" />
      </div>
      <div class="chart">
        <h4>Age Data</h4>
        <Charts :chartData="ageData()" :type="type" />
      </div>
      <div class="chart">
        <h4>Gender Data</h4>
        <Charts :chartData="genderData()" :type="type" />
      </div>
      <div class="chart">
        <h4>Eye Data</h4>
        <Charts :chartData="eyeData()" :type="type" />
      </div>
      <div class="chart">
        <h4>Fruit Data</h4>
        <Charts :chartData="fruitData()" :type="type" />
      </div>
    </div>

    <div class="people-container">
      <div class="people" v-for="people in filteredList" :key="people._id">
        <People :person="people" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import People from "@/components/People.vue";
import Charts from "@/components/Charts.vue";
// import json from "@/assets/people.json";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    People,
    Charts,
  },
  data() {
    return {
      data: {},
      ages: [],
      genders: [],
      pets: [],
      type: "PieChart",
      fruits: [],
      eyeColours: [],
      inSearchBar: "",
      pet: "",
      fruit: "",
      minAge: -1,
      maxAge: 10000,
      gender: "",
      eyeColor: "",
      buttonMessage: "Switch to Bar Chart",
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
    // ...mapGetters(["getData"]),
    switchChartType() {
      if (this.buttonMessage == "Switch to Bar Chart") {
        this.buttonMessage = "Switch to Pie Chart";
        this.type = "BarChart";
      } else {
        this.type = "PieChart";
        this.buttonMessage = "Switch to Bar Chart";
      }
    },
    genderFilter() {
      let genders = new Set();
      // let data = this.allData;
      // console.log("test");
      // console.log(data);
      for (let i in this.data) {
        genders.add(this.data[i].gender);
      }
      // console.log(pets.size);
      let gendersArray = Array.from(genders);
      gendersArray.unshift("all");
      for (let i in gendersArray) {
        this.genders.push({ key: i, value: gendersArray[i] });
      }
    },
    petFilter() {
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
    fruitFilter() {
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
    eyeFilter() {
      let eyes = new Set();
      for (let i in this.data) {
        eyes.add(this.data[i].eyeColor);
      }
      // console.log(pets.size);
      let eyeArray = Array.from(eyes);
      eyeArray.unshift("all");
      for (let i in eyeArray) {
        this.eyeColours.push({ key: i, value: eyeArray[i] });
      }
    },
    getOccurrence(array, value) {
      var count = 0;
      array.forEach((v) => v === value && count++);
      return count;
    },
    ageData() {
      let ages = [];
      for (let key in this.filteredList) {
        // console.log(this.filteredList);
        ages.push(this.filteredList[key].age);
      }
      ages.sort(function (a, b) {
        return a - b;
      });
      // get age ranges that have more than 0 elements
      let maxAge = 0;
      let ageCount = 0;
      let range = 5;
      let ageString = "";
      let ageRange = [["Age Range", "Number of people"]];
      for (let i = 0; i < ages.length; i++) {
        if (ages[i] <= maxAge) {
          ageCount++;
        } else {
          if (ageCount > 0) {
            ageRange.push([ageString, ageCount]);
            ageCount = 0;
          }

          while (ages[i] > maxAge) {
            maxAge += range;
          }
          ageString = (maxAge - range).toString() + " - " + maxAge.toString();
        }
      }
      ageRange.push([ageString, ageCount]);
      return ageRange;
    },
    genderData() {
      let peopleGenders = [];
      let genderSet = new Set();
      for (let key in this.filteredList) {
        genderSet.add(this.filteredList[key].gender);
        peopleGenders.push(this.filteredList[key].gender);
      }
      let genders = Array.from(genderSet);
      // get age ranges that have more than 0 elements
      let genderRange = [["Gender", "Number of people"]];
      for (let i = 0; i < genders.length; i++) {
        let count = this.getOccurrence(peopleGenders, genders[i]);
        genderRange.push([genders[i], count]);
      }
      // console.log(genderRange);
      return genderRange;
    },

    petData() {
      let peoplePets = [];
      let petSet = new Set();
      for (let key in this.filteredList) {
        petSet.add(this.filteredList[key].preferences.pet);
        peoplePets.push(this.filteredList[key].preferences.pet);
      }
      let pets = Array.from(petSet);
      let petRange = [["Pet", "Number of people"]];

      for (let i = 0; i < pets.length; i++) {
        let count = this.getOccurrence(peoplePets, pets[i]);
        petRange.push([pets[i], count]);
      }
      // console.log(petRange);
      return petRange;
    },
    fruitData() {
      let peopleFruits = [];
      let fruitSet = new Set();
      for (let key in this.filteredList) {
        fruitSet.add(this.filteredList[key].preferences.fruit);
        peopleFruits.push(this.filteredList[key].preferences.fruit);
      }
      let fruits = Array.from(fruitSet);
      let fruitRange = [["Fruits", "Number of people"]];

      for (let i = 0; i < fruits.length; i++) {
        let count = this.getOccurrence(peopleFruits, fruits[i]);
        fruitRange.push([fruits[i], count]);
      }
      // console.log(genderRange);
      return fruitRange;
    },
    eyeData() {
      let peopleEyes = [];
      let eyeSet = new Set();
      for (let key in this.filteredList) {
        eyeSet.add(this.filteredList[key].eyeColor);
        peopleEyes.push(this.filteredList[key].eyeColor);
      }
      let eyes = Array.from(eyeSet);
      let eyeRange = [["Eyes", "Number of people"]];

      for (let i = 0; i < eyes.length; i++) {
        let count = this.getOccurrence(peopleEyes, eyes[i]);
        eyeRange.push([eyes[i], count]);
      }
      // console.log(genderRange);
      return eyeRange;
    },
  },
  computed: {
    ...mapGetters(["getData"]),
    allData() {
      return this.getData;
    },
    filteredList() {
      return this.getData.filter((person) => {
        let genderSelect = "";
        let petSelect = "";
        let fruitSelect = "";
        let eyeSelect = "";
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
        if (this.eyeColor != "all") {
          eyeSelect = this.eyeColor;
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
          person.eyeColor.toLowerCase().indexOf(eyeSelect.toLowerCase()) != -1
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
    // console.log(this.allData);
    this.data = this.allData;
    this.genderFilter();
    this.petFilter();
    this.fruitFilter();
    this.eyeFilter();
  },
};
</script>

<style scoped>
.search-wrapper {
  display: flex;
  padding: 10px;
  background: orange;
  align-items: center;
}

.charts-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  border-radius: 0.5rem;
  /* border-left: 0 solid #00ff99; */
  transition: border-left 300ms ease-in-out, padding-left 300ms ease-in-out;
}

.charts-wrapper > button {
  display: inline-block;
}

input {
  width: 80%;
}
</style>
