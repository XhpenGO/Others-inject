<template>
  <div class="container">
    <div class="itemLeft">
      <ItemPage>
        <template #main><One/></template>
      </ItemPage>
      <ItemPage>
        <template #main><Tow/></template>
      </ItemPage>
    </div>
    <div class="itemRight">
      <ItemPage>
        <template #main><Three/></template>
      </ItemPage>
      <ItemPage>
        <template #main><Four/></template>
      </ItemPage>
    </div>
  </div>
</template>

<script setup>
import ItemPage from "../../../components/ItemPage";
import One from "../../../components/OneData"
import Tow from "../../../components/TowData"
import Three from "../../../components/ThreeData"
import Four from "../../../components/FourData"

</script>

<style lang='scss'>
  .container{
    width: 100%;
    margin: 0 auto;
    // background-color: pink;
    display: flex;
    .itemLeft,.itemRight{
      flex: 1;
      background-color: rgb(242, 250, 255);
    }
  }
</style>
