// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                @import "@/assets/scss/_shared.scss";
                @import "@/assets/scss/_globals.scss";
                
                `,
      },
    },
  },
};
