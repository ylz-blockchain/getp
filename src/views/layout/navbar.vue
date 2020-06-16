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
      path: undefined
    };
  },
  computed: {
    ...mapGetters(["menus"])
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
</style>