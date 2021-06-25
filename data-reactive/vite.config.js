import path from "path";

export default {
  resolve: {
    alias: {
      "/@/": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 8012,
    open: true,
  },
  base: "./",
};
