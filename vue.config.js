module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/nijepa-shoe_store-front/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/global.scss";`
      }
    }
  }
};