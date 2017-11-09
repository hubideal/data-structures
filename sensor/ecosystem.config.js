module.exports = {
  apps : [
      {
        name: "StartPhoton",
        script: "./pugPhoton.js",
        watch: true,
        env: {
          "NODE_ENV": "development",
        }
      },
      {
        name: "PugDatatoWeb",
        script: "./pugWebData.js",
        watch: true,
        env: {
          "NODE_ENV": "development",
        }
      }
  ]
}