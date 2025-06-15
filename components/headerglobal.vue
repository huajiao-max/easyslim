<template>
  <div :class="activeIndex == 0 && showVideo ? 'video-background' : ''">
    <client-only>
      <div class="sidebar-logo-container">
        <div class="sidebar-logo-link">
          <div class="left-logo">
            <img
              :src="logo"
              class="sidebar-logo"
              @click="tohome"
              alt="easy slim"
            />
            <h2 class="sidebar-title" @click="tohome">Easy Slim Planner</h2>
          </div>
          <div
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
    </client-only>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useUserStore } from "@/store/user";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import logoImg from "@/assets/image/logo.png";
import sun from "@/assets/image/sun.png";
import moon from "@/assets/image/moon.png";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const googleloading = ref(false);
const logo = ref(logoImg);
const activeIndex = ref(0);
async function handleGoogleOut() {
  if (process.client) {
    try {
      await ElMessageBox.confirm("Do you want to log out?", "Confirm Logout", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      });
      const auth = getAuth();
      await signOut(auth);
      userStore.logOut();
      ElMessage.success("Logout successful!");
    } catch (error) {
      if (error !== "cancel") {
        console.log(error, "error");
      }
    }
  }
}
const photoURL = ref("");
async function handleGoogleLogin() {
  if (process.client) {
    googleloading.value = true;
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await window.focus();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result, "result--success");

        googleloading.value = false;
        const user = result.user.reloadUserInfo;
        photoURL.value = user.photoURL;
        userStore.login(user);
      })
      .catch((error) => {
        console.log(error, "error---");
        ElMessage.error("Login failed");
        googleloading.value = false;
      });
  }
}

function tohome() {
  router.push("/");
}
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
    color: #fff;
    & .left-logo {
      display: flex;
      align-items: center;
      min-width: 230px;
      img {
        border-radius: 5px;
      }
    }

    & .sidebar-logo {
      transition: all 0.3s ease;
      vertical-align: middle;
      img {
        border-radius: 5px;
      }
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
      width: 230px;
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
      width: 230px;
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
      width: 230px;
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

  /* 大屏幕 (992-1230px) */
  @media (min-width: 992px) and (max-width: 1230px) {
    .left-logo {
      width: 230px;
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
      max-width: 180px;
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

  /* 超大屏幕 (>1230px) */
  @media (min-width: 1230px) {
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
      max-width: 230px;
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
  text-align: center;
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
