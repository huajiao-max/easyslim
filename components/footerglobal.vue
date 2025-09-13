<template>
  <div class="box">
    <div class="flex">
      <div>
        <p class="text footerlogo">Easy Slim Start</p>
        <p class="text footertitle">
          Easy Slim Planner | Simple Weight Loss Plans That Actually Work
        </p>
        <p class="text footertitle">© 2025 All Rights Reserved</p>
      </div>
        <div>
        <p class="text footerlogo" >Friendship support</p>

        <p class="text footertitle">
          <a href="https://ghibli.best/" target="_blank">Ghibli Ai</a>
        </p>
        <p class="text footertitle">
          <a href="https://www.easy4cut.xyz" target="_blank">Easy4cut</a>
        </p>
             <p class="text footertitle">
          <a href="https://www.projectsekaisticker.online" target="_blank">Project Sekei Sticker</a>
        </p>
      </div>
      <div>
        <p class="text footerlogo">Legal</p>
        <p class="text footertitle">
          <a href="/privacy-policy">Privacy Policy</a>
        </p>
        <p class="text footertitle">
          <a href="/terms-conditions">Terms Conditions</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup></script>

<style scoped lang="less">
.box {
  margin-top: 10rem;
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
