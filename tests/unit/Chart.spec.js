import { mount } from "@vue/test-utils";
import { GChart } from "vue-google-charts";
import Charts from "@/components/Charts.vue";

describe("Charts.vue Unit Tests", () => {
  const wrapper = mount(Charts, {
    propsData: {
      chartData: [
        ["Gender", "Number of people"],
        ["male", 5],
        ["female", 10],
      ],
      type: "PieChart",
      name: "gender",
    },
  });
  test("Exists", () => {
    expect(wrapper.exists()).toBe(true);
  });
  test("Name is shown", () => {
    expect(wrapper.find("h4").text()).toBe("gender");
  });
  test("Creates chart using Google Chart", () => {
    expect(wrapper.findComponent(GChart).exists()).toBe(true);
  });
});
