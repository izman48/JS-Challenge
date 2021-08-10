<template>
  <div class="home">
    <div class="search-wrapper">
      <div class="row gy-2 gx-3 text-center center">
        <div class="col-lg-12">
          <form onsubmit="event.preventDefault();" role="search">
            <input
              class="form-control"
              id="search"
              type="search"
              v-model="inSearchBar"
              placeholder="Search..."
              autofocus
            />
          </form>
        </div>
        <div class="col-auto">
          <select
            class="form-control"
            id="minAge"
            :value="minAge"
            @input="updateMinAge"
          >
            <option disabled value="">Min-Age</option>
            <option v-for="age in ages" :key="age.key" :value="age.value">
              {{ age.value }}
            </option>
          </select>
        </div>
        <div class="col-auto">
          <select
            class="form-control"
            id="maxAge"
            :value="maxAge"
            @input="updateMaxAge"
          >
            <option disabled value="">Max-Age</option>
            <option v-for="age in ages" :key="age.key" :value="age.value">
              {{ age.value }}
            </option>
          </select>
        </div>
        <div class="col-auto">
          <select
            class="form-control"
            id="gender"
            :value="gender"
            @input="updateGender"
          >
            <option disabled value="">Gender</option>
            <option
              v-for="gender in genderFilters"
              :key="gender.key"
              :value="gender.value"
            >
              {{ gender.value }}
            </option>
          </select>
        </div>
        <div class="col-auto">
          <select class="form-control" id="pet" :value="pet" @input="updatePet">
            <option disabled value="">Pet</option>
            <option v-for="pet in petFilters" :key="pet.key" :value="pet.value">
              {{ pet.value }}
            </option>
          </select>
        </div>
        <div class="col-auto">
          <select
            class="form-control"
            id="fruit"
            :value="fruit"
            @input="updateFruit"
          >
            <option disabled value="">Fruit</option>
            <option
              v-for="fruit in fruitFilters"
              :key="fruit.key"
              :value="fruit.value"
            >
              {{ fruit.value }}
            </option>
          </select>
        </div>
        <div class="col-auto">
          <select
            class="form-control"
            id="eyeColor"
            :value="eyeColor"
            @input="updateEyeColor"
          >
            <option disabled value="">Eye-Color</option>
            <option
              v-for="eye in eyeColorFilters"
              :key="eye.key"
              :value="eye.value"
            >
              {{ eye.value }}
            </option>
          </select>
        </div>
        <div class="col-auto">
          <button
            class="btn btn-secondary"
            id="go"
            type="submit"
            v-on:click="goSearch"
          >
            Go
          </button>
        </div>
        <div class="col-auto">
          <button
            class="btn btn-secondary"
            id="reset"
            type="submit"
            v-on:click="resetFilters"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button class="btn btn-secondary" v-on:click="hideChart">
        {{ hideMessage }}
      </button>
    </div>
    <div class="charts-wrapper" v-show="hide == false">
      <div class="row gy-2 gx-3">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-secondary" v-on:click="switchChartType">
            {{ buttonMessage }}
          </button>
        </div>
        <div class="col-auto text-center">
          <!-- <h4>Pet Data</h4> -->
          <Charts :chartData="petData()" :type="type" :name="'pet'" />
        </div>
        <div class="col-auto text-center">
          <!-- <h4>Age Data</h4> -->
          <Charts :chartData="ageData()" :type="type" :name="'age'" />
        </div>
        <div class="col-auto text-center">
          <!-- <h4>Gender Data</h4> -->
          <Charts :chartData="genderData()" :type="type" :name="'gender'" />
        </div>
        <div class="col-auto text-center">
          <!-- <h4>Eye Data</h4> -->
          <Charts :chartData="eyeData()" :type="type" :name="'eyeColor'" />
        </div>
        <div class="col-auto text-center">
          <!-- <h4>Fruit Data</h4> -->
          <Charts :chartData="fruitData()" :type="type" :name="'fruit'" />
        </div>
        <div class="col-auto center text-center">
          <!-- <h4>Fruit Data</h4> -->
          <Charts :chartData="mapData()" :type="'map'" :name="'Locations'" />
        </div>
      </div>
    </div>

    <div class="people-container">
      <div class="people" v-for="(people, i) in filteredList" :key="people._id">
        <People :person="people" :index="i" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import People from "@/components/People.vue";
import Charts from "@/components/Charts.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    People,
    Charts,
  },
  data() {
    return {
      ages: [],
      type: "PieChart",
      inSearchBar: "",
      buttonMessage: "Switch to Bar Chart",
      hideMessage: "Hide Charts",
      hide: false,
    };
  },
  methods: {
    ...mapActions([
      "updateMinAge",
      "updateMaxAge",
      "updateGender",
      "updateFruit",
      "updatePet",
      "updateEyeColor",
      "updateGenderFilters",
      "updatePetFilters",
      "updateFruitFilters",
      "updateEyeFilters",
      "updateFilteredData",
      "updateDataMinAge",
      "updateFilters",
    ]),
    hideChart() {
      this.hide = !this.hide;
      if (this.hide) {
        this.hideMessage = "Show Charts";
      } else {
        this.hideMessage = "Hide Charts";
      }
      console.log(this.hide);
    },
    resetFilters() {
      this.updateMinAge(-1);
      this.updateMaxAge(100);
      this.updateGender("");
      this.updateFruit("");
      this.updatePet("");
      this.updateEyeColor("");
      this.goSearch();
    },
    goSearch() {
      // console.log("clicked Button");
      this.updateFilteredData();
    },
    switchChartType() {
      if (this.buttonMessage == "Switch to Bar Chart") {
        this.buttonMessage = "Switch to Pie Chart";
        this.type = "BarChart";
      } else {
        this.type = "PieChart";
        this.buttonMessage = "Switch to Bar Chart";
      }
    },
    getFilters() {
      // this.data = this.allData;
      this.updateFilters();
    },
    getOccurrence(array, value) {
      var count = 0;
      array.forEach((v) => v === value && count++);
      return count;
    },
    ageData() {
      let minAge = 1000;
      let maxAge = 0;
      let ages = [];

      let ageString = "";
      let ageRange = [["Age Range", "Number of people"]];
      let range = 5;

      for (let key in this.filteredList) {
        // console.log(this.filteredList[key].age);
        if (this.filteredList[key].age > maxAge) {
          maxAge = this.filteredList[key].age;
        }
        if (this.filteredList[key].age < minAge) {
          minAge = this.filteredList[key].age;
        }
        ages.push(this.filteredList[key].age);
      }

      // console.log(minAge);
      // console.log(maxAge);
      while (minAge % range !== 0) {
        // console.log(minAge);
        minAge = minAge - 1;
      }
      this.updateDataMinAge(minAge);
      let minRange = minAge;
      let maxRange = minRange + range;
      let ageCount = 0;

      ages.sort();

      for (let i = 0; i < ages.length; i++) {
        let age = ages[i];
        // console.log(minRange);
        if (age >= minRange && age < maxRange) {
          // console.log("added to count");
          ageCount = ageCount + 1;
        } else {
          ageString = minRange.toString() + " - " + maxRange.toString();
          if (ageCount > 0) {
            ageRange.push([ageString, ageCount]);
            ageCount = 0;
          }
          minRange = maxRange;
          maxRange = minRange + range;
        }
      }
      ageString = minRange.toString() + " - " + maxRange.toString();
      if (ageCount > 0) {
        ageRange.push([ageString, ageCount]);
        ageCount = 0;
      }
      // console.log(ageRange);
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
    mapData() {
      let locations = [["Lat", "Long", "Name"]];
      for (let key in this.filteredList) {
        locations.push([
          this.filteredList[key].location.latitude,
          this.filteredList[key].location.longitude,
          this.filteredList[key].name,
        ]);
      }
      // console.log(locations);
      return locations;
    },
  },
  computed: {
    ...mapGetters(
      // {
      //   minAge: "getMinAge",
      // },
      [
        "getData",
        "getFilteredData",
        "getMinAge",
        "getMaxAge",
        "getPet",
        "getFruit",
        "getGender",
        "getEyeColor",
        "getGenders",
        "getPets",
        "getFruits",
        "getEyeColors",
      ]
    ),
    minAge() {
      return this.getMinAge;
    },
    maxAge() {
      return this.getMaxAge;
    },
    pet() {
      return this.getPet;
    },
    fruit() {
      return this.getFruit;
    },
    gender() {
      return this.getGender;
    },
    eyeColor() {
      return this.getEyeColor;
    },
    genderFilters() {
      return this.getGenders;
    },
    petFilters() {
      return this.getPets;
    },
    fruitFilters() {
      // console.log(this.getFruits);
      return this.getFruits;
    },
    eyeColorFilters() {
      return this.getEyeColors;
    },
    allData() {
      return this.getData;
    },
    filteredList() {
      return this.getFilteredData.filter((person) => {
        // console.log(this.getFilteredData);
        let searchString =
          person.name +
          " " +
          person.eyeColor +
          " " +
          person.age +
          " " +
          person.gender +
          " " +
          person.preferences.pet +
          person.preferences.fruit;

        return (
          searchString.toLowerCase().indexOf(this.inSearchBar.toLowerCase()) !=
          -1
        );
      });
    },
  },

  mounted() {
    // console.log("here");
    for (var i = 0; i < 100; i++) {
      this.ages.push({ key: i, value: i });
    }
    // console.log(this.allData);
    this.getFilters();
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

/* button {
  display: inline-block;
  background-color: orange;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
}
.button1:hover {
  color: #000000;
  background-color: #ffffff;
} */
.charts-wrapper > button {
  height: 5px;
}

#reset {
  align-self: flex-end;
}
input {
  width: 80%;
}
.center {
  margin: auto;
}
</style>
