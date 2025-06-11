import COS from "cos-js-sdk-v5";

export default defineNuxtPlugin(() => {
  const cos = new COS({
    SecretId: "AKIDz49D5rUCsW3Smz8unppxzzpUAzgbYO55",
    SecretKey: "66Lcs1ISk7XNi6QlGnRClFmQEuTG957J",
    Bucket: "Ghibli ai-1326829800",
    Region: "na-siliconvalley",
  });

  return {
    provide: {
      cos,
    },
  };
});
