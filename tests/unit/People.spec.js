import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import People from "@/components/People.vue";

describe("People.vue Unit Tests", () => {
  //Arrange
  const store = createStore();
  store.dispatch = jest.fn();

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
    global: {
      plugins: [store],
    },
  });
  test("Exists", () => {
    expect(wrapper.exists()).toBe(true);
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
    // expect(wrapper.vm.$data.edit).toBe(false);
    editButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.edit).toBe(true);
  });
  test("We can enter new data for people when it is editable", async () => {
    // expect(wrapper.vm.$data.edit).toBe(true);
    // expect(wrapper.vm.$data.name).toBe("Aida Mccarty");
    const editName = wrapper.find(".editName");
    await editName.setValue("Ania");
    expect(wrapper.vm.$data.name).toBe("Ania");
  });

  test("Cancel button makes data uneditable", async () => {
    // Assert
    const cancelButton = wrapper.find("#cancelButton");
    // expect(wrapper.vm.$data.edit).toBe(true);
    cancelButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.edit).toBe(false);
  });
  test("Cancel button restores the editable values to old value", () => {
    expect(wrapper.vm.$data.name).toBe("Aida Mccarty");
  });
  test("Save button makes data uneditable", async () => {
    // Assert
    const editButton = wrapper.find("#editButton");
    // expect(wrapper.vm.$data.edit).toBe(false);
    editButton.trigger("click");
    await wrapper.vm.$nextTick();
    // expect(wrapper.vm.$data.edit).toBe(true);
    const saveButton = wrapper.find("#saveButton");
    saveButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.edit).toBe(false);
  });
  test("Save Button makes edited data saved", async () => {
    const editButton = wrapper.find("#editButton");
    editButton.trigger("click");
    await wrapper.vm.$nextTick();
    const editName = wrapper.find(".editName");
    await editName.setValue("Ania");
    const saveButton = wrapper.find("#saveButton");
    saveButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Ania");
  });
  test("Filters are updated to reflect new data", async () => {
    const editButton = wrapper.find("#editButton");
    editButton.trigger("click");
    await wrapper.vm.$nextTick();
    const editPet = wrapper.find(".editPet");
    await editPet.setValue("Hamster");
    const saveButton = wrapper.find("#saveButton");
    saveButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(store.dispatch).toHaveBeenCalledWith("updateFilters");
  });
});
