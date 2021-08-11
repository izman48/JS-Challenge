<template>
  <div class="home">
    <!-- Navbar/Header -->
    <div class="navbar navbar-light bg-light">
      <nav>
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Suade JS Challenge</a>
        </div>
      </nav>
    </div>
    <!-- Search and forms -->

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
        <div class="col-auto btn-group">
          <button
            class="btn btn-secondary"
            id="go"
            type="submit"
            v-on:click="goSearch"
          >
            Search
          </button>
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

    <!-- Charts -->

    <div class="charts-wrapper">
      <div class="btn-group justify-content-md-end">
        <button class="btn btn-secondary" v-on:click="switchChartType">
          {{ buttonMessage }}
        </button>
        <button class="btn btn-secondary pull-right" v-on:click="hideChart">
          {{ hideMessage }}
        </button>
      </div>
      <div class="row gy-2 gx-3">
        <div class="col-auto text-center center" v-show="hide == false">
          <Charts :chartData="petData()" :type="type" :name="'Pet'" />
        </div>
        <div class="col-auto text-center center" v-show="hide == false">
          <Charts :chartData="ageData()" :type="type" :name="'Age'" />
        </div>
        <div class="col-auto text-center center" v-show="hide == false">
          <Charts :chartData="genderData()" :type="type" :name="'Gender'" />
        </div>
        <div class="col-auto text-center center" v-show="hide == false">
          <Charts :chartData="eyeData()" :type="type" :name="'Eye Color'" />
        </div>
        <div class="col-auto text-cente center" v-show="hide == false">
          <Charts :chartData="fruitData()" :type="type" :name="'Fruit'" />
        </div>
        <div class="col-auto center text-center" v-show="hide == false">
          <Charts :chartData="mapData()" :type="'map'" :name="'Locations'" />
        </div>
      </div>
    </div>

    <!-- All the people -->

    <div class="people-container">
      <div class="people" v-for="(people, i) in filteredList" :key="people._id">
        <People :person="people" :index="i" />
      </div>
    </div>
  </div>

  <div class="container text-center footer">
    {{ new Date().getFullYear() }} —
    <strong>Copyright &copy; Iesa Wazeer </strong>
  </div>
</template>

<script>
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
    ]),
    ...mapActions({
      getFilters: "updateFilters",
      goSearch: "updateFilteredData",
    }),
    // For hide chart button
    hideChart() {
      this.hide = !this.hide;
      if (this.hide) {
        this.hideMessage = "Show Charts";
      } else {
        this.hideMessage = "Hide Charts";
      }
    },
    // For reset Filter button
    resetFilters() {
      this.updateMinAge(-1);
      this.updateMaxAge(100);
      this.updateGender("");
      this.updateFruit("");
      this.updatePet("");
      this.updateEyeColor("");
      this.goSearch();
    },
    // For switch chart button
    switchChartType() {
      if (this.buttonMessage == "Switch to Bar Chart") {
        this.buttonMessage = "Switch to Pie Chart";
        this.type = "BarChart";
      } else {
        this.type = "PieChart";
        this.buttonMessage = "Switch to Bar Chart";
      }
    },
    // Count how many times an element occurs in an array
    getOccurrence(array, value) {
      var count = 0;
      array.forEach((v) => v === value && count++);
      return count;
    },
    // Calculate the number of people per age group for our charts
    ageData() {
      let minAge = 1000;
      let maxAge = 0;
      let ages = [];

      let ageString = "";
      let ageRange = [["Age Range", "Number of people"]];
      let range = 5;

      for (let key in this.filteredList) {
        if (this.filteredList[key].age > maxAge) {
          maxAge = this.filteredList[key].age;
        }
        if (this.filteredList[key].age < minAge) {
          minAge = this.filteredList[key].age;
        }
        ages.push(this.filteredList[key].age);
      }
      while (minAge % range !== 0) {
        minAge = minAge - 1;
      }
      this.updateDataMinAge(minAge);
      let minRange = minAge;
      let maxRange = minRange + range;
      let ageCount = 0;

      ages.sort();

      for (let i = 0; i < ages.length; i++) {
        let age = ages[i];
        if (age >= minRange && age < maxRange) {
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
      return ageRange;
    },
    // Calculate the number of people per gender for our charts
    genderData() {
      let peopleGenders = [];
      let genderSet = new Set();
      for (let key in this.filteredList) {
        genderSet.add(this.filteredList[key].gender);
        peopleGenders.push(this.filteredList[key].gender);
      }
      let genders = Array.from(genderSet);
      let genderRange = [["Gender", "Number of people"]];
      for (let i = 0; i < genders.length; i++) {
        let count = this.getOccurrence(peopleGenders, genders[i]);
        genderRange.push([genders[i], count]);
      }
      return genderRange;
    },
    // Calculate the number of people per favourite pet for our charts
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
      return petRange;
    },
    // Calculate the number of people per favourite fruit for our charts
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
      return fruitRange;
    },
    // Calculate the number of people per Eye Color for our charts
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
      return eyeRange;
    },
    // Create an array of where each person lives for our charts
    mapData() {
      let locations = [["Lat", "Long", "Name"]];
      for (let key in this.filteredList) {
        locations.push([
          this.filteredList[key].location.latitude,
          this.filteredList[key].location.longitude,
          this.filteredList[key].name,
        ]);
      }
      return locations;
    },
  },
  computed: {
    ...mapGetters({
      minAge: "getMinAge",
      maxAge: "getMaxAge",
      pet: "getPet",
      fruit: "getFruit",
      gender: "getGender",
      eyeColor: "getEyeColor",
      genderFilters: "getGenders",
      petFilters: "getPets",
      fruitFilters: "getFruits",
      eyeColorFilters: "getEyeColors",
      allData: "getData",
    }),
    ...mapGetters(["getFilteredData"]),
    allData() {
      return this.getData;
    },
    filteredList() {
      return this.getFilteredData.filter((person) => {
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
    for (var i = 0; i < 100; i++) {
      this.ages.push({ key: i, value: i });
    }
    this.getFilters();
  },
};
</script>

<style scoped>
.search-wrapper {
  display: flex;
  padding: 4em;
  background: #0099ff;
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
  transition: border-left 300ms ease-in-out, padding-left 300ms ease-in-out;
}

.center {
  margin: 0 auto;
}
.header {
  height: 7em;
  padding-top: 3em;
}

.footer {
  height: 7em;
  padding: 3em;
}
</style>
