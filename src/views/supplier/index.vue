<template>
  <div class="supplier">
    <div>
      <sideBar ref="sideBar" :id.sync="deviceId" />
    </div>
    <div>
      <supplierMian @handleUpdate="handleUpdate" :id.sync="deviceId" />
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
  },
  methods: {
    handleUpdate() {
      this.$refs.sideBar.getNodes();
    }
  }
};
</script>

<style>
.supplier {
  background: #272632;
  position: relative;
  height: 100vh;
  /* min-height: calc(100% - 64px); */
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