<template>
  <div class="people">
    <h1>{{ person.name }} {{ person.age }}</h1>
  </div>
</template>

<script>
export default {
  name: "People",
  props: {
    person: Object,
  },
};
</script>

<style scoped>
.people {
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  border-radius: 0.5rem;
  border-left: 0 solid #00ff99;
  transition: border-left 300ms ease-in-out, padding-left 300ms ease-in-out;
}

.people:hover {
  padding-left: 0.5rem;
  border-left: 0.5rem solid #00ff99;
}

.heading {
  color: #fff;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #0099ff;
}
</style>
