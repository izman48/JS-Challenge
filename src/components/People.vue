<template>
  <h1>{{ name }}</h1>
</template>

<script>
export default {
  name: "People",
  props: {
    id: String,
    age: Number,
    eyeColor: String,
    name: String,
    gender: String,
    location: Object,
    preferences: Object,
  },
};
</script>
