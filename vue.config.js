// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Recursos Humanos - Municipalidad de Tinogasta";
      return args;
    });
  },
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
