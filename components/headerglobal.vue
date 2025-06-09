<template>
  <div :class="activeIndex == 0 && showVideo ? 'video-background' : ''">
    <client-only>
      <div class="sidebar-logo-container">
        <div class="sidebar-logo-link">
          <div class="left-logo">
            <img
              v-show="scrennVal == '4' || scrennVal == '3'"
              :src="logo"
              class="sidebar-logo"
              @click="tohome"
              alt="easy slim"
            />
            <!-- <h2 class="sidebar-title" @click="tohome">{{ $t("title") }}</h2> -->
          </div>
          <div class="right-logo" v-show="scrennVal == '1' || scrennVal == '2'">
            <img
              src="@/assets/image/logo.png"
              class="right-icon"
              @click="toggle"
              alt="menu"
            />
          </div>
          <div class="box" v-show="scrennVal == '4' || scrennVal == '3'">
            <el-menu
              :default-active="activeMenu"
              :collapse="isCollapse"
              :background-color="menuBg"
              text-color="#fff"
              :unique-opened="true"
              active-text-color="#ff4493"
              :collapse-transition="false"
              mode="horizontal"
              router
              class="menu"
            >
              <template v-for="(item, index) in $t('footer.menuList')">
                <el-menu-item
                  :key="index"
                  class="menu-item"
                  @click="menuClick(item, index)"
                >
                  <template slot="title">
                    <span>{{ item.title }}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-menu>
          </div>
          <!-- 语言选择下拉组件 -->

          <div class="right-coin" v-show="scrennVal == '4' || scrennVal == '3'">
            <el-select
              v-model="$i18n.locale"
              @change="changeLanguage"
              placeholder="Select Language"
            >
              <el-option
                v-for="lang in availableLanguages"
                :key="lang.value"
                :label="lang.label"
                :value="lang.value"
              ></el-option>
            </el-select>
          </div>

          <div
            v-show="(scrennVal == '4' || scrennVal == '3') && !isAuthenticated"
            class="right-login"
            @click="handleGoogleLogin"
            v-loading.fullscreen.lock="googleloading"
          >
            login
          </div>
          <img
            :src="photoURL"
            alt=""
            style="border-radius: 50%; margin-top: 10px"
          />
          <div
            v-show="(scrennVal == '4' || scrennVal == '3') && isAuthenticated"
            class="right-login"
            @click="handleGoogleOut"
          >
            {{ userName }}
          </div>
        </div>
      </div>
      <el-drawer
        class="drawer"
        title="menu"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
      >
        <div class="box-mobile">
          <el-menu
            :collapse="isCollapse"
            :background-color="menuBg"
            text-color="#fff"
            :unique-opened="true"
            :collapse-transition="false"
            router
            class="menu"
          >
            <template v-for="(item, index) in $t('footer.menuList')">
              <el-menu-item
                :key="index"
                :class="{ activeClass: activeIndex == index }"
                class="menu-item"
                @click="menuClick(item, index)"
              >
                <template slot="title">
                  <span>{{ item.title }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-menu>
        </div>

        <div
          v-show="!photoURL"
          class="right-login"
          @click="handleGoogleLogin"
          v-loading.fullscreen.lock="googleloading"
        >
          login
        </div>
        <div class="right-login" @click="handleGoogleOut">
          <img :src="photoURL" alt="" />
        </div>
        <div class="buttonclass">
          <img
            v-if="isDarkTheme"
            @click="toggleTheme(false)"
            :src="sun"
            class="sidebar-logo"
            alt="sun"
          />
          <img
            v-if="!isDarkTheme"
            :src="moon"
            class="sidebar-logo"
            @click="toggleTheme(true)"
            alt="moon"
          />
        </div>
        <!-- <div class="right-login" @click="handleGoogleOut">
          {{ userName }}
        </div> -->
      </el-drawer>
    </client-only>
  </div>
</template>

<script>
import logoImg from "@/assets/image/logo.png";
import sun from "@/assets/image/sun.png";
import moon from "@/assets/image/moon.png";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
export default {
  name: "App",
  async asyncData({ params }) {
    console.log(params, "params");
  },
  components: {},
  props: {
    message: {
      type: String,
      default: "",
    },
    isshowAiimage: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return { reload: this.reload };
  },

  data() {
    return {
      title: "Ghibli ai",
      logo: logoImg,
      // sun: sun,
      // moon: moon,
      activeIndex: 0,
      showVideo: false,
      activeMenu: "1",
      collapse: true,
      isMenu: true,
      drawer: false,
      direction: "rtl",
      scrennVal: "1",
      screenWidth: null,
      googleloading: false,
      loading: false,
      menuList: [
        {
          title: "Home",
          name: "index",
          url: "/",
          icon: "HiOutlineSparkles",
        },
        {
          title: "Ghibli",
          url: "/ghibli",
          name: "ghibli",
          icon: "BiCube",
        },
        {
          title: "Comic Strip",
          url: "/comic-strip",
          name: "comic-strip",
          icon: "BiCube",
        },
        {
          title: "Blogs",
          url: "/blog",
          name: "blog",
          icon: "MdPayment",
        },
        {
          title: "Pricing",
          url: "/pricing",
          name: "pricing",
          icon: "MdPayment",
        },
      ],
      kedepayObj: {},
      value: "",
      availableLanguages: [
        { value: "en", label: "English" },
        { value: "zh", label: "中文" },
        { value: "ar", label: "اللغة العربية" },
        { value: "mly", label: "Bahasa Melayu" },
        { value: "de", label: "Deutsch" },
        { value: "fr", label: "Français" },
        { value: "es", label: "Spanish" },
        { value: "jp", label: "日本語" },
        { value: "ko", label: "한국어" },
      ],
      isDarkTheme: true, // 默认主题为白色
      sun: sun,
      moon: moon,
    };
  },
  computed: {
    isCollapse() {
      return !true;
    },
    menuBg() {
      return "linear-gradient(292deg, #ffb7bb, #e67ad1 50%, #7471fb);";
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    userName() {
      return this.$store.state.userInfo.username;
    },
    countTimes() {
      return this.$store.state.initCoin;
    },
    photoURL() {
      return this.$store.state.userInfo.photoURL;
    },
  },
  watch: {
    "$route.name": {
      handler(newValue, oldValue) {
        if (newValue == "index") {
          this.showVideo = true;
        } else {
          this.showVideo = false;
        }
        // this.buildMenuList();
        const name = newValue;
        let activeIndex = -1;
        this.menuList.forEach((route, index) => {
          if (route.name === name) {
            activeIndex = index;
            return;
          }
        });
        this.activeIndex = activeIndex >= 0 ? activeIndex : this.activeIndex;
      },
      immediate: true,
      deep: true,
    },
    isAuthenticated: {
      handler(newVal) {
        // this.buildMenuList();
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    // this.buildMenuList();
    this.getInit();
    if (process.client) {
      this.screenWidth = window.screen.width;
      this.setScreen();
      window.addEventListener("resize", this.handleResize);
      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("resize", this.handleResize);
      });
      this.$nextTick(() => {
        const appElement = document.getElementById("app"); // 获取 ID 为 app 的元素
        appElement.classList.add("white-theme"); // 添加白色主题类
      });
    }
  },
  created() {
    this.$store.dispatch("InitUser");
  },

  methods: {
    toggleTheme(flag) {
      this.isDarkTheme = flag;
      const appElement = document.getElementById("app"); // 获取 ID 为 app 的元素
      if (appElement) {
        if (flag == false) {
          appElement.classList.add("dark-theme"); // 添加黑色主题类
          appElement.classList.remove("white-theme"); // 移除白色主题类
        } else {
          appElement.classList.remove("dark-theme"); // 移除黑色主题类
          appElement.classList.add("white-theme"); // 添加白色主题类
        }
      }
      this.$emit("changeTheme", flag);
    },
    genetator(item) {
      this.$router.push(item.url);
    },
    handleResize() {
      this.screenWidth = window.screen.width;
      this.setScreen();
    },
    setScreen() {
      if (this.screenWidth < 1500 && this.screenWidth > 1000) {
        this.scrennVal = "3";
      } else if (this.screenWidth <= 1000 && this.screenWidth > 768) {
        this.scrennVal = "2";
      } else if (this.screenWidth <= 768 && this.screenWidth > 300) {
        this.scrennVal = "1";
      } else {
        this.scrennVal = "4";
      }
    },
    handleClose(done) {
      done();
    },
    toggle() {
      this.drawer = true;
    },
    getInit() {
      if (process.client) {
        window.KODEPAY_APPLICATION_ID = "b2d2d9aa-e2d7-11ee-aef8-1e54e735e3c4";
        window.KODEPAY_CLIENT_ID = "3fbb457c-fa4e-11ee-a74a-8a74d5f627ee";
        window.KODEPAY_ENV = "production";
        (function () {
          const s = document.createElement("script");
          s.src =
            "https://kodepay-global.zingfront.com/common/kodepay-website.js";
          s.async = 1;
          document.head.appendChild(s);
        })();
      }
    },
    buildMenuList() {
      this.menuList = [
        {
          title: this.$t("header.home"),
          name: "index",
          url: "/",
          icon: "HiOutlineSparkles",
        },
        {
          title: "Ghibli",
          name: "ghibli",
          url: "/ghibli",
          icon: "BiCube",
        },
        {
          title: this.$t("header.features"),
          name: "comic-strip",
          url: "/comic-strip",
          icon: "BiCube",
        },
        {
          title: "Blogs",
          name: "blog",
          url: "/blog",
          icon: "MdPayment",
        },
        {
          title: this.$t("header.pricing"),
          name: "pricing",
          url: "/pricing",
          icon: "MdPayment",
        },
      ];
    },
    tohome() {
      this.$router.push({ name: "index" });
    },
    menuClick(item, index) {
      this.activeIndex = index;
      this.$router.push({ name: item.name });
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("locale", lang);
      this.$nextTick(() => {
        // 保持当前主题状态
        const appElement = document.getElementById("app");
        if (appElement) {
          if (this.isDarkTheme) {
            appElement.classList.remove("dark-theme");
            appElement.classList.add("white-theme");
          } else {
            appElement.classList.remove("white-theme");
            appElement.classList.add("dark-theme");
          }
        }
      });
    },

    handleGoogleOut() {
      if (process.client) {
        this.$confirm("Do you want to log out??", "tip", {
          confirmButtonText: "confirm",
          cancelButtonText: "cancel",
          type: "warning",
        })
          .then(() => {
            const auth = getAuth();
            signOut(auth)
              .then(() => {
                this.$store.dispatch("LogOut");
                this.$message({
                  type: "success",
                  message: "logout successful!",
                });
              })
              .catch((error) => {
                console.log(error, "error");
              });
          })
          .catch((err) => {
            console.log(err, "err");
          });
      }
    },
    async handleGoogleLogin() {
      if (process.client) {
        this.googleloading = true;
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        await window.focus();
        signInWithPopup(auth, provider)
          .then((result) => {
            this.googleloading = false;
            const user = result.user.reloadUserInfo;
            this.$store.dispatch("Login", user);
          })
          .catch((error) => {
            console.log(error, "error---");
            this.$message.warning("login failed");
            this.googleloading = false;
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.router {
  background-color: #2b2f3a;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

body {
  overflow: auto;
  margin: 0;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: transparent;
}

*::-webkit-scrollbar-track {
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 6px;
}

.scrollbarHide::-webkit-scrollbar {
  display: none;
}

.scrollbarShow::-webkit-scrollbar {
  display: block;
}

.sidebar-logo-container {
  width: 100%;
  background: transparent;
  overflow: hidden;
  z-index: 10 !important;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .sidebar-logo-link {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: auto;
    max-width: 1400px;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    transition: all 0.3s ease;

    & .left-logo {
      display: flex;
      align-items: center;
      min-width: 150px;
    }

    & .sidebar-logo {
      transition: all 0.3s ease;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      font-weight: 600;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      transition: all 0.3s ease;
    }
  }

  /* 超小屏幕 (<576px) */
  @media (max-width: 576px) {
    .left-logo {
      width: 150px;
      display: flex;
      align-items: center;
    }
    .nsfwTitle {
      width: 85%;
      margin-bottom: 1rem;
      font-size: 3rem;
      line-height: 2.5rem;
      font-weight: 700;
    }
    .box {
      // color: #fff;
      width: 66%;

      .menu {
        display: flex;
        cursor: pointer;
        background-color: none !important;
        // margin-top: 10px;
        .menu-item {
          width: 10rem;
          line-height: 50px;
          height: 50px;
          list-style-type: none;
          font-size: 18px;
          clear: both;
          cursor: pointer;
          color: none !important;
          background-color: none !important;
        }
      }
    }
    .sidebar-logo-link {
      flex-direction: column;
      height: auto;
      padding: 0.5rem;

      .left-logo {
        width: 100%;
        justify-content: center;
        margin-bottom: 0.5rem;
      }
    }

    .sidebar-logo {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }

    .sidebar-title {
      font-size: 1rem;
      line-height: 1.2;
      max-width: 100%;
      white-space: normal;
      text-align: center;
    }

    .right-logo .right-icon {
      position: static;
      margin-top: 0.5rem;
    }
    .btn-gene {
      width: 100%;
    }
  }

  /* 小屏幕 (576-768px) */
  @media (min-width: 576px) and (max-width: 768px) {
    .left-logo {
      width: 150px;
      display: flex;
      align-items: center;
    }
    .nsfwTitle {
      width: 85%;
      margin-bottom: 1rem;
      font-size: 3rem;
      line-height: 2.5rem;
      font-weight: 700;
    }
    .box {
      // color: #fff;
      width: 66%;

      .menu {
        display: flex;
        cursor: pointer;
        background-color: none !important;
        // margin-top: 10px;
        .menu-item {
          width: 10rem;
          line-height: 50px;
          height: 50px;
          list-style-type: none;
          font-size: 18px;
          clear: both;
          cursor: pointer;
          color: none !important;
          background-color: none !important;
        }
      }
    }
    .sidebar-logo-link {
      height: 48px;
      padding: 0 0.75rem;
    }

    .sidebar-logo {
      width: 28px;
      height: 28px;
      margin-right: 10px;
    }

    .sidebar-title {
      font-size: 1.125rem;
      line-height: 48px;
      max-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .btn-gene {
      width: calc(50% - 0.5rem);
    }
  }

  /* 中等屏幕 (768-992px) */
  @media (min-width: 768px) and (max-width: 992px) {
    .left-logo {
      width: 150px;
      display: flex;
      align-items: center;
    }
    .nsfwTitle {
      width: 90%;
      margin-bottom: 1rem;
      font-size: 3rem;
      line-height: 2.5rem;
      font-weight: 700;
    }
    .box {
      // color: #fff;
      width: 66%;

      .menu {
        display: flex;
        cursor: pointer;
        background-color: none !important;
        // margin-top: 10px;
        .menu-item {
          width: 10rem;
          line-height: 50px;
          height: 50px;
          list-style-type: none;
          font-size: 18px;
          clear: both;
          cursor: pointer;
          color: none !important;
          background-color: none !important;
        }
      }
    }
    .sidebar-logo-link {
      height: 52px;
      padding: 0 1rem;
    }

    .sidebar-logo {
      width: 30px;
      height: 30px;
      margin-right: 12px;
    }

    .sidebar-title {
      font-size: 1.25rem;
      line-height: 52px;
      max-width: 130px;
    }

    .box {
      width: auto;
      margin: 0 1rem;
    }
    .btn-gene {
      width: calc(33.333% - 0.666rem);
    }
  }

  /* 大屏幕 (992-1200px) */
  @media (min-width: 992px) and (max-width: 1200px) {
    .left-logo {
      width: 150px;
      display: flex;
      align-items: center;
    }
    .nsfwTitle {
      width: 100%;
      margin-bottom: 1rem;
      font-size: 3rem;
      line-height: 2.5rem;
      font-weight: 700;
    }
    .box {
      // color: #fff;
      width: 45%;

      .menu {
        display: flex;
        cursor: pointer;
        background-color: none !important;
        // margin-top: 10px;
        .menu-item {
          width: 10rem;
          line-height: 50px;
          height: 50px;
          list-style-type: none;
          font-size: 18px;
          clear: both;
          cursor: pointer;
          color: none !important;
          background-color: none !important;
        }
      }
    }
    .sidebar-logo-link {
      height: 54px;
      padding: 0 1.25rem;
    }

    .sidebar-logo {
      width: 32px;
      height: 32px;
      margin-right: 14px;
    }

    .sidebar-title {
      font-size: 1.375rem;
      line-height: 54px;
      max-width: 140px;
    }

    .box {
      flex-grow: 1;
    }
    .btn-gene {
      width: calc(25% - 1rem);
    }
    .right-coin {
      float: right;
      width: 120px;
      background: transparent;
      color: #32a095;
      padding: 0 5px;
      margin-top: 5px;
      margin-right: 10px;
      border-radius: 10%;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  /* 超大屏幕 (>1200px) */
  @media (min-width: 1200px) {
    .left-logo {
      width: 286px;
      display: flex;
      align-items: center;
    }
    .nsfwTitle {
      width: 100%;
      margin-bottom: 1rem;
      font-size: 3rem;
      line-height: 2.5rem;
      font-weight: 700;
    }
    .box {
      // color: #fff;
      width: 45%;

      .menu {
        display: flex;
        cursor: pointer;
        background-color: none !important;
        // margin-top: 10px;
        .menu-item {
          width: 10rem;
          line-height: 50px;
          height: 50px;
          list-style-type: none;
          font-size: 18px;
          clear: both;
          cursor: pointer;
          color: none !important;
          background-color: none !important;
        }
      }
    }
    .sidebar-logo-link {
      height: 56px;
      padding: 0 1.5rem;
    }

    .sidebar-logo {
      width: 34px;
      height: 34px;
      margin-right: 16px;
    }

    .sidebar-title {
      font-size: 1.5rem;
      line-height: 56px;
      max-width: 150px;
    }

    .box {
      flex-grow: 1;
      justify-content: center;
    }
    .btn-gene {
      width: calc(20% - 1rem);
    }
    .right-coin {
      float: right;
      width: 140px;
      background: transparent;
      color: #32a095;
      padding: 0 5px;
      margin-top: 5px;
      margin-right: 10px;
      border-radius: 10%;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}

.right-logo {
  width: auto;
  z-index: 10;
  flex-shrink: 0;

  .right-icon {
    position: fixed;
    right: 2%;
    top: 0.5%;
    width: 30px;
    height: 30px;

    @media (max-width: 480px) {
      width: 24px;
      height: 24px;
      right: 1%;
    }
  }
}

.right-login {
  height: 40px;
  line-height: 40px;
  z-index: 10;
  float: right;
  min-width: 80px;
  margin-top: 5px;
  cursor: pointer;
  padding: 0 5px;
  margin-top: 10px;
  margin-right: 10px;
  border-radius: 5px;
  background: #32a095;
  // color: #fff;
}

// .center-box {
//   width: 36%;
// }

.el-menu {
  background-color: transparent !important;
}

.el-menu--horizontal > .el-menu-item {
  background-color: transparent !important;
  // color: #fff;
  border: none !important;
}

.activeClass {
  background: linear-gradient(to left, #f16051, #fdbf5e, #2ea1da) !important;
  background-clip: text !important;
  color: transparent !important;
}

.logosvg {
  width: 4em;
  height: 3em;
}

/deep/ .el-drawer {
  background: #303238 !important;
  width: 14.5rem !important;
}

/deep/ .el-drawer__title {
  width: 14.5rem !important;
}

.drawer {
  .box-mobile {
    // color: #fff;
    width: 66%;

    .menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: left;
      border: none !important;
      cursor: pointer;
      background-color: none !important;

      .menu-item {
        width: 8rem;
        line-height: 50px;
        height: 50px;
        list-style-type: none;
        font-size: 18px;
        clear: both;
        background-color: none !important;
      }

      .menu-item .is-active {
        // color: #fff;
      }
    }
  }

  .right-coin,
  .right-login {
    float: left;
    width: 100%;
    background: transparent;
    color: #32a095;
    padding: 0 10px;
    margin-top: 5px;
    margin-left: 25px;
    text-align: left;
    border-radius: 10%;
  }
}

.main-title {
  width: 56rem;
  margin: 0 auto;
  text-align: center;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  // color: #fff;

  @media (max-width: 800px) {
    width: 90%;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding-top: 1rem;
    padding-bottom: 1rem;

    .nsfwTitle {
      font-size: 2rem;
      line-height: 2.2rem;
    }

    .row-three-communi {
      font-size: 1.2rem;
    }
  }
}

.text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity));
}

.text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity));
}

.text-yellow-500 {
  --tw-text-opacity: 1;
  color: rgb(234 179 8 / var(--tw-text-opacity));
}

.text-green-500 {
  --tw-text-opacity: 1;
  color: rgb(34 197 94 / var(--tw-text-opacity));
}

.text-yellow-400 {
  --tw-text-opacity: 1;
  color: rgb(250 204 21 / var(--tw-text-opacity));
}

.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}

.btnflex {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 0 1rem;

  .btn-gene {
    padding-top: 0.5rem;
    width: 100%;
    max-width: 300px;
    margin-right: 0;

    .bg-generare {
      width: 100%;
      --tw-bg-opacity: 1;
      background: linear-gradient(
        to bottom,
        rgba(147, 234, 193, 0.8),
        rgba(31, 64, 55, 0.9)
      );
      border-color: transparent;
      font-size: 1.125rem;
      line-height: 1.25rem;
      border-radius: 0.375rem;
      border: none;
    }
  }
}

//主题色
.buttonclass {
  border-radius: 5px;
  width: 60px;
  height: 34px;
  margin: 13px 10px 0;
  text-align: center;
  padding-left: 4px;
  line-height: 31px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
