import { mount } from "@vue/test-utils";
import People from "@/components/People.vue";

describe("People.vue Unit Tests", () => {
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
  test("Displays name of person", () => {
    // Assert
    expect(wrapper.text()).toContain("Aida Mccarty");
  });
  test("Displays age of person", () => {
    // Assert
    expect(wrapper.text()).toContain("27");
  });
  test("Displays eyeColor of person", () => {
    // Assert
    expect(wrapper.text()).toContain("Brown");
  });
  test("Displays gender of person", () => {
    // Assert
    expect(wrapper.text()).toContain("Female");
  });
  test("Displays pet of person", () => {
    // Assert
    expect(wrapper.text()).toContain("Cat");
  });
  test("Displays favourite fruit of person", () => {
    // Assert
    expect(wrapper.text()).toContain("Banana");
  });
  test("Edit button makes data editable", async () => {
    // Assert
    const editButton = wrapper.find("#editButton");
    expect(wrapper.vm.$data.edit).toBe(false);
    editButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.edit).toBe(true);
  });
  test("Cancel button makes data uneditable", async () => {
    // Assert
    const cancelButton = wrapper.find("#cancelButton");
    expect(wrapper.vm.$data.edit).toBe(true);
    cancelButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.edit).toBe(false);
  });
  // Need to test save and cancel and data input
});
