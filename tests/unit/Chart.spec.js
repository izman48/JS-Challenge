import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { GChart } from "vue-google-charts";
import Charts from "@/components/Charts.vue";

describe("Charts.vue Unit Tests", () => {
  const store = createStore();
  store.dispatch = jest.fn();
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
    global: {
      plugins: [store],
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
  // test("Selecting a filter from a chart adds it to our filters", async () => {
  //   we need to find a way to get wrapper.find(GChart pieslice/bar)
  //   trigger it
  //   expect(store.dispatch).toHaveBeenCalledWith("updateGender");
  // });
});
