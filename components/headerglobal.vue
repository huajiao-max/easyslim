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
            <h2 class="sidebar-title" @click="tohome">
              {{ $t("header.title") }}
            </h2>
          </div>

          <div class="nav-menu">
            <nuxt-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
             Home
            </nuxt-link>
            <nuxt-link to="/progress-tracker" class="nav-link" :class="{ active: $route.path === '/progress-tracker' }">
            Weight tracking
            </nuxt-link>
                 <nuxt-link to="/weight-loss-videos" class="nav-link" :class="{ active: $route.path === '/weight-loss-videos' }">
           Weight Loss Videos
            </nuxt-link>
          </div>

          <div
            class="right-login"
            @click="handleGoogleLogin"
            v-loading.fullscreen.lock="googleloading"
          >
            {{ $t("header.login") }}
          </div>

          <div class="right-coin">
            <!-- 语言选择下拉组件 -->
            <el-select
              v-model="locale"
              @change="changeLanguage"
              :placeholder="$t('dialog.selectLanguage')"
              style="width: 150px"
            >
              <el-option
                v-for="lang in availableLanguages"
                :key="lang.value"
                :label="lang.label"
                :value="lang.value"
              ></el-option>
            </el-select>
          </div>
          <img
            v-if="photoURL"
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
import { ref, computed, onMounted, watch, reactive } from "vue";
import { useI18n } from "vue-i18n";
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
      await ElMessageBox.confirm(
        this.$t("dialog.logoutConfirm"),
        this.$t("dialog.logoutTitle"),
        {
          confirmButtonText: this.$t("dialog.okButton"),
          cancelButtonText: this.$t("dialog.cancelButton"),
          type: "warning",
        }
      );
      const auth = getAuth();
      await signOut(auth);
      userStore.logOut();
      ElMessage.success(this.$t("dialog.logoutSuccess"));
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
        googleloading.value = false;
        const user = result.user.reloadUserInfo;
        photoURL.value = user.photoURL;
        userStore.login(user);
      })
      .catch((error) => {
        console.log(error, "error---");
        ElMessage.error(this.$t("dialog.loginFailed"));
        googleloading.value = false;
      });
  }
}
const { locale, setLocale } = useI18n();
const availableLanguages = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
  { value: "pt", label: "portuguesa" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Spanish" },
  { value: "jp", label: "日本語" },
  { value: "ko", label: "한국어" },
];
if (process.client) {
  const savedLocale = localStorage.getItem("locale");
  if (savedLocale) setLocale(savedLocale);
}

function changeLanguage(lang) {
  setLocale(lang); // 只需调用这个即可
  if (process.client) {
    localStorage.setItem("locale", lang);
  }
  // console.log("翻译结果:", $t("header.home"));
}

function tohome() {
  router.push("/");
}
</script>

<style lang="less" scoped>
.sidebar-logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  z-index: 1000;

  .sidebar-logo-link {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  .left-logo {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: auto;
    .sidebar-logo {
      width: 40px;
      height: 40px;
      margin-right: 12px;
    }

    .sidebar-title {
      font-size: 18px;
      font-weight: 600;
      color: #000;
      margin: 0;
    }
    img {
      border-radius: 4px;
    }
  }

  .nav-menu {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-left: 3rem;
  }

  .nav-link {
    color: #4a5568;
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.3s ease;
    position: relative;
  }

  .nav-link:hover {
    color: #70e0c0;
    background: rgba(112, 224, 192, 0.1);
  }

  .nav-link.active {
    color: #70e0c0;
    font-weight: 600;
  }

  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: #70e0c0;
    border-radius: 50%;
  }

  .right-login {
    padding: 8px 16px;
    background: #6aa4c3;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 14px;
    margin-left: 10px;

    &:hover {
      background: #5890af;
    }
  }

  .right-coin {
    margin-left: 10px;
  }

  img[alt=""] {
    width: 32px;
    height: 32px;
    margin-left: 10px;
  }

  .right-items {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

@media (max-width: 768px) {
  .sidebar-logo-container {
    flex-wrap: wrap;
    height: auto;
    min-height: 60px;
  }

  .sidebar-logo-link {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .nav-menu {
    width: 100%;
    order: 3;
    margin-left: 0;
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
  }

  .nav-link {
    font-size: 14px;
    padding: 0.4rem 0.8rem;
  }
}
</style>
