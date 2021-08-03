<template>
  <div class="charts">
    <h1>hi</h1>
    <GChart type="PieChart" :data="ageRange" :options="chartOptions" />
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
    ageRanges() {
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
  },
  mounted() {
    // console.log(ageRange);
    this.ageRanges();
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
        width: 1100,
        height: 400,
      },
      ageRange: [],
      genderRange: [],
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
