<template>
  <div class="supplier">
    <div>
      <sideBar :id.sync="deviceId" />
    </div>
    <div>
      <supplierMian :id.sync="deviceId" />
    </div>
  </div>
</template>

<script>
import sideBar from "./components/sideBar";
import supplierMian from "./components/supplierMian";

export default {
  name: "supplier",
  components: { sideBar, supplierMian },
  data() {
    return {
      deviceId: "0"
    };
  }
};
</script>

<style>
.supplier {
  background: #272632;
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: row;
}

.supplier > div:first-child {
  width: 12%;
  height: 100%;
}

.supplier > div:last-child {
  width: 88%;
  padding: 1% 1% 1% 1%;
}
</style>