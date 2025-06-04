<template>
  <div class="box">
    <div class="flex">
      <div>
        <p class="text footerlogo">{{ $t("footer.brand.title") }}</p>
        <p class="text footertitle">
          {{ $t("footer.brand.description") }}
        </p>

        <p class="text footertitle">{{ $t("footer.copyright") }}</p>
      </div>
      <div>
        <p class="text footerlogo">{{ $t("footer.agreement.title") }}</p>
        <p class="text footertitle">
          <a href="/privacy-policy"> privacy policy</a>
        </p>
        <p class="text footertitle">
          <a href="/terms-conditions"> Terms Conditions</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    //是否显示订阅页面
    // isAuthenticated: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      orderList: [],
    };
  },

  created() {},
  computed: {
    isAuthenticated() {
      // 假设你有一个方法来判断用户是否已登录
      return this.$store.state.isAuthenticated;
    },
  },
  mounted() {
    this.getInit();
  },
  methods: {
    getInit() {
      if (process.client) {
        window.KODEPAY_APPLICATION_ID = "b2d2d9aa-e2d7-11ee-aef8-1e54e735e3c4"; // 正式application_id-ziyu-开发
        window.KODEPAY_CLIENT_ID = "3fbb457c-fa4e-11ee-a74a-8a74d5f627ee"; //正式client_id-ziyu-
        window.KODEPAY_ENV = "production"; //env,development,production
        (function () {
          const s = document.createElement("script");
          s.src =
            "https://kodepay-global.zingfront.com/common/kodepay-website.js";
          s.async = 1;
          document.head.appendChild(s);
        })();
      }
    },
    getKodepay() {
      if (window.KodePay) {
        window.KodePay.get_user_info();

        window.KodePay.open_user_management_page();
      }
    },
    manageSubscribe() {
      let obj = { email: this.email };
      const emailObj = this.$dealParame(obj);
      this.$axios.post("/user_orders", { val: emailObj }).then((res) => {
        this.orderList = res.orders;
        if (!this.orderList.length) {
          this.$message.warning("There is no Orders Records");
        } else {
          // 打开用户管理中心
          this.getKodepay();
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.box {
  margin-top: 10rem;
}
.flex {
  display: flex;
  width: 75rem;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  // color: #fff;
  font-size: 12px;
}
.text:hover {
  color: rgb(255 255 255);
  opacity: 0.8;
}
.svg {
  width: 2em;
  height: 2em;
}
.footerlogo {
  margin-top: 1rem;
  margin-bottom: 1rem;

  font-size: 26px;
}
.footertitle {
  margin-top: 1rem;
  margin-bottom: 1rem;

  font-size: 14px;
  a {
    // color: #fff;
    text-decoration: none;
  }
  a:hover {
    color: rgba(248, 113, 113, 1);
  }
}
@media (min-width: 340px) and (max-width: 1285px) {
  .flex {
    width: auto; /* 手机端自动宽度 */
    padding-left: 10px;
    padding-right: 10px;
  }
  .footerlogo {
    font-size: 22px;
  }
}
</style>
