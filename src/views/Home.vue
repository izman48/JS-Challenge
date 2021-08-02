<template>
  <div class="home">
    <div class="search-wrapper">
      <form onsubmit="event.preventDefault();" role="search">
        <!-- <label for="search">Serch </label> -->
        <input
          id="search"
          type="search"
          v-model="inSearchBar"
          placeholder="Search..."
          autofocus
          required
        />
        <select id="minAge" v-model="minAge">
          <option disabled value="">Min age</option>
          <option v-for="age in ages" :key="age.key" :value="age.value">
            {{ age.value }}
          </option>
        </select>

        <select id="maxAge" v-model="maxAge">
          <option disabled value="">Max age</option>
          <option v-for="age in ages" :key="age.key" :value="age.value">
            {{ age.value }}
          </option>
        </select>

        <select id="gender" v-model="gender">
          <option disabled value="">Gender</option>
          <option
            v-for="gender in genders"
            :key="gender.key"
            :value="gender.value"
          >
            {{ gender.value }}
          </option>
        </select>

        <input
          id="eyeColor"
          type="text"
          v-model="eyeColor"
          placeholder="Eye Color"
          autofocus
          required
        />
        <button type="submit">Go</button>
      </form>
    </div>

    <div class="charts-wrapper">
      <!-- <Charts :data="data" /> -->
    </div>

    <div class="people-container">
      <div class="people" v-for="people in filteredList" :key="people._id">
        <People
          :name="people.name"
          :age="people.age"
          :eyeColor="people.eyeColor"
          :gender="people.gender"
          :location="people.location"
          :preferences="people.preferences"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import People from "@/components/People.vue";
// import Charts from "@/components/Charts.vue";
import json from "@/assets/people.json";

export default {
  name: "Home",
  components: {
    People,
    // Charts,
  },
  data() {
    return {
      data: json,
      ages: [],
      genders: [
        { key: 0, value: "all" },
        { key: 1, value: "male" },
        { key: 2, value: "female" },
        { key: 3, value: "other" },
      ],
      inSearchBar: "",
      minAge: -1,
      maxAge: 10000,
      gender: "",
      eyeColor: "",
      // selected: {
      //   age: 0,
      //   name: '',
      //   gender: '',
      //   location: {latitude: 0.0,
      //   }
      //   },
      //   preferences: Object,
      // }
    };
  },
  computed: {
    filteredList() {
      return this.data.filter((person) => {
        let genderSelect = "";
        let searchString =
          person.name +
          " " +
          person.eyeColor +
          " " +
          person.age +
          " " +
          person.gender +
          " ";
        // console.log(this.maxAge);
        // if (this.maxAge == 0) {
        //   this.maxAge = 10000;
        // }
        // for (let age in this.ages) {
        //   console.log(age);
        // }
        if (this.gender != "all") {
          genderSelect = this.gender;
        }
        return (
          searchString.toLowerCase().indexOf(this.inSearchBar.toLowerCase()) !=
            -1 &&
          person.age > this.minAge &&
          person.age < this.maxAge &&
          person.gender.toLowerCase().indexOf(genderSelect.toLowerCase()) !=
            -1 &&
          person.eyeColor.toLowerCase().indexOf(this.eyeColor.toLowerCase()) !=
            -1
        );
      });
    },
  },
  // methods: {
  // },

  mounted() {
    // console.log("here");
    for (var i = 0; i < 100; i++) {
      this.ages.push({ key: i, value: i });
    }
  },
};
</script>

<style>
.search-wrapper {
  display: flex;
  padding: 10px;
  background: orange;
  align-items: center;
}

input {
  width: 80%;
}
</style>
