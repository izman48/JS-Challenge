import { mount } from "@vue/test-utils";
import People from "@/components/People.vue";
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
  test("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });
  test("name is shown", () => {
    expect(wrapper.find("h4").text()).toBe("gender");
  });
});
