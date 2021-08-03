<template>
  <div class="charts">
    <!-- <h1>hi</h1> -->
    <GChart type="PieChart" :data="ageRange" :options="chartOptions" />
    <GChart type="PieChart" :data="genderRange" :options="chartOptions" />
    <GChart type="PieChart" :data="petRange" :options="chartOptions" />
    <GChart type="PieChart" :data="fruitRange" :options="chartOptions" />
    <GChart type="PieChart" :data="eyeRange" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
// import { Bar, Pie } from "vue3-chart-v2";
export default {
  name: "Charts",
  components: {
    GChart,
  },
  props: {
    data: Object,
  },
  methods: {
    getOccurrence(array, value) {
      var count = 0;
      array.forEach((v) => v === value && count++);
      return count;
    },
    ageData() {
      let ages = [];
      for (let key in this.data) {
        ages.push(this.data[key].age);
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
      this.ageRange = ageRange;
    },
    genderData() {
      let peopleGenders = [];
      let genderSet = new Set();
      for (let key in this.data) {
        genderSet.add(this.data[key].gender);
        peopleGenders.push(this.data[key].gender);
      }
      let genders = Array.from(genderSet);
      // get age ranges that have more than 0 elements
      let genderRange = [["Gender", "Number of people"]];
      for (let i = 0; i < genders.length; i++) {
        let count = this.getOccurrence(peopleGenders, genders[i]);
        genderRange.push([genders[i], count]);
      }
      // console.log(genderRange);
      this.genderRange = genderRange;
    },

    petData() {
      let peoplePets = [];
      let petSet = new Set();
      for (let key in this.data) {
        petSet.add(this.data[key].preferences.pet);
        peoplePets.push(this.data[key].preferences.pet);
      }
      let pets = Array.from(petSet);
      let petRange = [["Pet", "Number of people"]];

      for (let i = 0; i < pets.length; i++) {
        let count = this.getOccurrence(peoplePets, pets[i]);
        petRange.push([pets[i], count]);
      }
      // console.log(petRange);
      this.petRange = petRange;
    },
    fruitData() {
      let peopleFruits = [];
      let fruitSet = new Set();
      for (let key in this.data) {
        fruitSet.add(this.data[key].preferences.fruit);
        peopleFruits.push(this.data[key].preferences.fruit);
      }
      let fruits = Array.from(fruitSet);
      let fruitRange = [["Fruits", "Number of people"]];

      for (let i = 0; i < fruits.length; i++) {
        let count = this.getOccurrence(peopleFruits, fruits[i]);
        fruitRange.push([fruits[i], count]);
      }
      // console.log(genderRange);
      this.fruitRange = fruitRange;
    },
    eyeData() {
      let peopleEyes = [];
      let eyeSet = new Set();
      for (let key in this.data) {
        eyeSet.add(this.data[key].eyeColor);
        peopleEyes.push(this.data[key].eyeColor);
      }
      let eyes = Array.from(eyeSet);
      let eyeRange = [["Eyes", "Number of people"]];

      for (let i = 0; i < eyes.length; i++) {
        let count = this.getOccurrence(peopleEyes, eyes[i]);
        eyeRange.push([eyes[i], count]);
      }
      // console.log(genderRange);
      this.eyeRange = eyeRange;
    },
  },
  mounted() {
    // console.log(ageRange);
    this.ageData();
    this.genderData();
    this.petData();
    this.fruitData();
    this.eyeData();
  },
  // computed: {
  //   ageRanges: function () {
  //     ages = [];
  //     for (let d in this.data) {
  //       ages.push(d.age);
  //     }
  //     ages.sort(function (a, b) {
  //       return a - b;
  //     });
  //     // ages = data.
  //     // get age ranges that have more than 0 elements
  //     let maxAge = 0;
  //     let ageCount = 0;
  //     let ageString = "";
  //     ageRange = [["Age Range", "Number of people"]];
  //     for (let i = 0; i < ages.length; i++) {
  //       if (ages[i] < maxAge) {
  //         ageCount++;
  //       } else {
  //         ageRange.push([ageString, ageCount]);
  //         ageCount = 0;
  //         maxAge += 10;
  //         ageString = (maxAge - 10).toString() + " - " + maxAge.toString();
  //       }
  //       ageRange.push([ageString, ageCount]);
  //       console.log(ageRange);
  //       return ageRange;
  //     }
  //   },
  // },
  data() {
    return {
      chartData: [
        ["Daily Routine", "Hours per Day"],
        ["Work", 14],
        ["Eat", 1],
        ["Reading", 2],
        ["Exercise", 2],
        ["Sleep", 5],
      ],
      chartOptions: {
        width: 400,
        height: 400,
      },
      ageRange: [],
      genderRange: [],
      petRange: [],
      fruitRange: [],
      eyeRange: [],
    };
  },
};
</script>

<style scoped>
.charts {
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  border-radius: 0.5rem;
  /* border-left: 0 solid #00ff99; */
  transition: border-left 300ms ease-in-out, padding-left 300ms ease-in-out;
}

/* .people:hover {
  padding-left: 0.5rem;
  border-left: 0.5rem solid #00ff99;
} */

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
