<template>
  <div class="charts">
    <h4>{{ name }}</h4>
    <div class="map" v-if="type == 'map'">
      <GChart
        :settings="{
          packages: ['geoChart'],
        }"
        type="GeoChart"
        :data="chartData"
        :options="mapOptions"
        :events="mapEvents"
        ref="gChart"
      />
    </div>
    <div class="other" v-else>
      <GChart
        :settings="{ packages: ['corechart', 'bar'] }"
        :type="type"
        :resizeDebounce="500"
        :data="chartData"
        :options="chartOptions"
        :events="chartEvents"
        ref="gChart"
      />
    </div>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import { mapGetters, mapActions } from "vuex";
// import { Bar, Pie } from "vue3-chart-v2";
export default {
  name: "Charts",
  components: {
    GChart,
  },
  props: {
    chartData: Array,
    type: String,
    name: String,
  },
  methods: {
    ...mapActions([
      "updateMinAge",
      "updateMaxAge",
      "updateGender",
      "updateFruit",
      "updatePet",
      "updateEyeColor",
    ]),
    updateFilters(selection) {
      if (this.name == "gender") {
        this.updateGender(this.genderFilters[selection[0].row + 1].value);
      }
      if (this.name == "eyeColor") {
        this.updateEyeColor(this.eyeColorFilters[selection[0].row + 1].value);
      }
      if (this.name == "fruit") {
        this.updateFruit(this.fruitFilters[selection[0].row + 1].value);
      }
      if (this.name == "pet") {
        this.updatePet(this.petFilters[selection[0].row + 1].value);
      }
      if (this.name == "age") {
        let minAge = this.getDataMinAge;
        let range = 5;
        while (minAge % range != 0) {
          minAge = minAge - 1;
        }
        minAge = minAge + range * selection[0].row;
        let maxAge = minAge + range;
        this.updateMinAge(minAge);
        this.updateMaxAge(maxAge);
      }
    },
  },
  mounted() {},
  data() {
    return {
      chartOptions: {
        width: 600,
        height: 400,
        title: this.name,
      },
      mapOptions: {
        backgroundColor: "#81d4fa",
        displayMode: "marker",
        keepAspectRatio: true,
        width: 1000,
        tooltip: { textStyle: { color: "#FF0000" }, showColorCode: true },
        // defaultColor: "#f5f5f5",
      },
      chartEvents: {
        select: () => {
          const table = this.$refs.gChart.chartObject;
          const selection = table.getSelection();
          if (selection.length !== 0) {
            this.updateFilters(selection);
          }
        },
      },
      mapEvents: {
        select: () => {
          // const table = this.$refs.gChart.chartObject;
          // const selection = table.getSelection();
          // if (selection.length !== 0) {
          //   console.log(this.chartData[selection[0].row + 1]);
          // }
        },
      },
    };
  },
  computed: {
    ...mapGetters([
      "getData",
      "getDataMinAge",
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
  },
};
</script>

<style scoped>
.heading {
  color: #fff;
}
.map {
  display: block;
  margin-left: auto;
  margin-right: auto;
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
