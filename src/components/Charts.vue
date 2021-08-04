<template>
  <div class="charts">
    <GChart type="PieChart" :data="chartData" :options="chartOptions" />
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
    chartData: Array,
  },
  methods: {},
  mounted() {},
  data() {
    return {
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
