<template>
  <div id="app">
    <componentOne></componentOne>
    <indexGrid></indexGrid>
    <componentThree></componentThree>
    <componentFour></componentFour>
    <componentFive></componentFive>
    <componentSix></componentSix>
  </div>
</template>
<script>
import componentOne from "./indexComponents/componentOne";
import indexGrid from "./indexComponents/indexGrid";
import componentThree from "./indexComponents/componentThree";
import componentFour from "./indexComponents/componentFour";
import componentFive from "./indexComponents/componentFive";
import componentSix from "./indexComponents/componentSix";
export default {
  components: {
    indexGrid,
    componentOne,
    componentThree,
    componentFour,
    componentFive,
    componentSix
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>