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
        <select id="minAge" :value="minAge" @input="updateMinAge">
          <option disabled value="">Min-Age</option>
          <option v-for="age in ages" :key="age.key" :value="age.value">
            {{ age.value }}
          </option>
        </select>

        <select id="maxAge" :value="maxAge" @input="updateMaxAge">
          <option disabled value="">Max-Age</option>
          <option v-for="age in ages" :key="age.key" :value="age.value">
            {{ age.value }}
          </option>
        </select>

        <select id="gender" :value="gender" @input="updateGender">
          <option disabled value="">Gender</option>
          <option
            v-for="gender in genderFilters"
            :key="gender.key"
            :value="gender.value"
          >
            {{ gender.value }}
          </option>
        </select>

        <select id="pet" :value="pet" @input="updatePet">
          <option disabled value="">Pet</option>
          <option v-for="pet in petFilters" :key="pet.key" :value="pet.value">
            {{ pet.value }}
          </option>
        </select>
        <select id="fruit" :value="fruit" @input="updateFruit">
          <option disabled value="">Fruit</option>
          <option
            v-for="fruit in fruitFilters"
            :key="fruit.key"
            :value="fruit.value"
          >
            {{ fruit.value }}
          </option>
        </select>

        <select id="eyeColor" :value="eyeColor" @input="updateEyeColor">
          <option disabled value="">Eye-Color</option>
          <option
            v-for="eye in eyeColorFilters"
            :key="eye.key"
            :value="eye.value"
          >
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
    ]),
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
      this.updateGenderFilters();
      this.updatePetFilters();
      this.updateFruitFilters();
      this.updateEyeFilters();
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
    ...mapGetters([
      "getData",
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
    ]),
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
        if (this.gender != "all") {
          genderSelect = this.gender;
        }
        if (this.pet != "all") {
          petSelect = this.pet;
          // console.log(person);
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
          ((petSelect != "" &&
            person.preferences.pet.toLowerCase() == petSelect.toLowerCase()) ||
            petSelect == "") &&
          ((fruitSelect != "" &&
            person.preferences.fruit.toLowerCase() ==
              fruitSelect.toLowerCase()) ||
            fruitSelect == "") &&
          ((genderSelect != "" &&
            person.gender.toLowerCase() == genderSelect.toLowerCase()) ||
            genderSelect == "") &&
          ((eyeSelect != "" &&
            person.eyeColor.toLowerCase() == eyeSelect.toLowerCase()) ||
            eyeSelect == "")
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

.charts-wrapper > button {
  display: inline-block;
}

input {
  width: 80%;
}
</style>
