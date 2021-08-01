<template>
  <div class="home">
    <div class="search-wrapper">
      <form onsubmit="event.preventDefault();" role="search">
        <label for="search">Search for stuff</label>
        <input
          id="search"
          type="search"
          v-model="inSearchBar"
          placeholder="Search..."
          autofocus
          required
        />
        <button type="submit">Go</button>
      </form>

      <!-- <input type="text" v-model="inSearchBar" placeholder="Search title.." />
      <label>Search title:</label> -->
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
import json from "@/assets/people.json";

export default {
  name: "Home",
  components: {
    People,
  },
  data() {
    return {
      data: json,
      inSearchBar: "",
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
        return (
          person.name.toLowerCase().indexOf(this.inSearchBar.toLowerCase()) !=
          -1
        );
      });
    },
  },
  // methods: {
  // },

  mounted() {
    // console.log(this.data);
  },
};
</script>
