import { mount } from "@vue/test-utils";
import People from "@/components/People.vue";
import Charts from "@/components/Charts.vue";

describe("Charts.vue Unit Tests", () => {
  test("PieChart gets rendered", () => {
    const wrapper = mount(Charts, {
      propsData: {
        chartData: [
          ["Gender", "Number of people"],
          ["male", 5],
          ["female", 10],
        ],
        type: "PieChart",
      },
    });
  });
});
describe("People.vue Unit Tests", () => {
  test("Displays name of person", () => {
    //Arrange
    const wrapper = mount(People, {
      propsData: {
        person: {
          _id: "5d5d7ad67879dec8b9286d51",
          age: 27,
          eyeColor: "brown",
          name: "Aida Mccarty",
          gender: "female",
          location: {
            latitude: 13.525914,
            longitude: 144.425929,
          },
          preferences: {
            pet: "cat",
            fruit: "banana",
          },
        },
      },
    });

    // Assert
    expect(wrapper.text()).toContain("Aida Mccarty");
  });
  // it("renders props.msg when passed", () => {
  //   const msg = "new message";
  //   const wrapper = shallowMount(HelloWorld, {
  //     props: { msg },
  //   });
  //   expect(wrapper.text()).toMatch(msg);
  // });
});
