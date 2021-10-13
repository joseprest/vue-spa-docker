module.exports = {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "//s.musixise.com/musixise-www"
      : "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true
};
