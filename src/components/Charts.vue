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
        ref="gChart"
      />
    </div>
    <div class="other" v-if="type == 'PieChart'">
      <GChart
        :settings="{ packages: ['corechart', 'bar'] }"
        :type="type"
        :data="chartData"
        :options="pieChartOptions"
        :events="chartEvents"
        ref="gChart"
      />
    </div>
    <div class="other" v-if="type == 'BarChart'">
      <GChart
        :settings="{ packages: ['corechart', 'bar'] }"
        :type="type"
        :data="chartData"
        :options="barChartOptions"
        :events="chartEvents"
        ref="gChart"
      />
    </div>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import { mapGetters, mapActions } from "vuex";

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
      if (this.name == "Gender") {
        this.updateGender(this.genderFilters[selection[0].row + 1].value);
      }
      if (this.name == "Eye Color") {
        this.updateEyeColor(this.eyeColorFilters[selection[0].row + 1].value);
      }
      if (this.name == "Fruit") {
        this.updateFruit(this.fruitFilters[selection[0].row + 1].value);
      }
      if (this.name == "Pet") {
        this.updatePet(this.petFilters[selection[0].row + 1].value);
      }
      if (this.name == "Age") {
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
      pieChartOptions: {
        width: window.innerWidth * 0.45,
        height: 400,
      },
      barChartOptions: {
        width: window.innerWidth * 0.45,
        height: 400,
        hAxis: {
          minValue: 0,
        },
      },
      mapOptions: {
        backgroundColor: "#81d4fa",
        displayMode: "marker",
        keepAspectRatio: true,
        width: (window.innerWidth * 9) / 10,
        tooltip: { textStyle: { color: "#FF0000" }, showColorCode: true },
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
      return this.getFruits;
    },
    eyeColorFilters() {
      return this.getEyeColors;
    },
  },
};
</script>
