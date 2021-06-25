const path = require("path");

const pathResolve = dir => path.resolve(__dirname, ".", dir);

export default {
  resolve: {
    alias: [{ find: "/@/", replacement: pathResolve("./src/index") }],
  },
  server: {
    port: 8888,
    open: true,
  },
  base: "./",
};
