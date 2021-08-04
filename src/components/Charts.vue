<template>
  <div class="charts">
    <GChart
      :settings="{ packages: ['corechart', 'bar'] }"
      :type="type"
      :resizeDebounce="500"
      :data="chartData"
      :options="chartOptions"
    />
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
    type: String,
  },
  methods: {},
  mounted() {},
  data() {
    return {
      chartOptions: {
        width: 600,
        height: 300,
      },
    };
  },
  // computed: {
  //   chartO
  // }
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
