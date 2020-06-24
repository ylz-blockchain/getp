<template>
  <div class="navbar">
    <!-- logo 导航 -->
    <div class="navbar-logo">
      <div>
        <img @click="handleIndex()" src="@/assets/logo.png" />
      </div>
      <template v-for="item in menus">
        <div v-for="child in item.children" :key="child.name">
          <router-link
            v-if="child.path!=null && child.path.indexOf('http')!=0 && child.children==undefined"
            :to="child.path"
            :key="child.name"
          >
            <span
              :style="child.path == path ? 'color: #00ff87' : ''"
              @click="handleRouter(child.path)"
            >{{ child.name }}</span>
          </router-link>
        </div>
      </template>
    </div>

    <!-- 个人中心 -->
    <div class="navbar-private">
      <div v-if="role === 'supplier'" class="navbar-private-supplier">
        <span @click="handleDownload" style="cursor: pointer;">下载移动端</span>
        <div v-if="download" class="navbar-private-supplier-download">
          <div>扫描二维码下载移动端</div>
          <div>
            <img src="@/assets/pay_code.png" />
          </div>
        </div>
      </div>
      <div style="color: rgba(255, 255, 255, 0.8)">个人中心</div>
      <div>
        <i @click="showProfile" style="cursor: pointer" class="iconfont iconicon_stroke_svg_user"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "navbar",
  data() {
    return {
      indexPath: "/",
      path: undefined,
      download: false
    };
  },
  computed: {
    ...mapGetters(["menus", "role"])
  },
  mounted() {
    this.indexPath = this.menus[0].children[0].path;
    this.path = this.$route.path;
  },
  methods: {
    showProfile() {
      this.$emit("update:visible", true);
    },
    handleRouter(path) {
      this.path = path;
    },
    handleIndex() {
      if (this.indexPath != this.path) {
        this.handleRouter(this.indexPath);
        this.$router.push({ path: this.indexPath });
      }
    },
    handleDownload() {
      this.download = this.download ? false : true;
    }
  }
};
</script>

<style>
.navbar {
  background: #505264;
  display: flex;
  font-size: 13px;
  font-family: Noto Sans SC;
  color: #ffffff;
  justify-content: space-between;
}

.navbar-logo {
  display: flex;
  margin-left: 1%;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo div {
  cursor: pointer;
  margin-right: 50px;
}

.navbar-logo a {
  color: #ffffff;
  text-decoration: none;
}

.navbar-logo img {
  width: 134px;
  height: 60px;
}

.navbar-private {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 1%;
}

.navbar-private div {
  margin-left: 12px;
}

.navbar-private-supplier {
  color: #00ff87;
  position: relative;
}

.navbar-private-supplier-download {
  position: absolute;
  display: flex;
  right: 0px;
  z-index: 9999;
  width: 200px;
  height: 230px;
  top: 25px;
  box-shadow: 0px 0px 4px 0 #000817;
  font-size: 1.5vh;
  font-family: Noto Sans SC;
  font-weight: bold;
  flex-direction: column;
  background: #505264;
  text-align: center;
  margin-left: 0px !important;
}

.navbar-private-supplier-download > div {
  margin-left: 0px;
}

.navbar-private-supplier-download > div:first-child {
  height: 40px;
  line-height: 40px;
}

.navbar-private-supplier-download > div:last-child {
  border: 1px solid #00ff87;
  padding: 5px 5px 5px 5px;
  width: 125px;
  margin: 30px;
  margin-top: 20px;
  height: 125px;
}

.navbar-private-supplier-download img {
  width: 120px;
  height: 120px;
}
</style>