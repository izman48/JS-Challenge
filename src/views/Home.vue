<template>
  <div class="home">
    <v-row>
      <v-col cols="12" v-for="people in data" :key="people._id">
        <People
          :name="people.name"
          :age="people.age"
          :eyeColor="people.eyeColor"
          :gender="people.gender"
          :location="people.location"
          :preferences="people.location"
        />
      </v-col>
    </v-row>
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
  // methods: {
  // },

  mounted() {
    console.log(this.data);
  },
};
</script>
