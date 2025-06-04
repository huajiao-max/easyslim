export default function ({ app }) {
  app.nuxt.error = (error) => {
    console.log(error, "error---111");
  };
}
