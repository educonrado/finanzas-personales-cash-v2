const { defineConfig } = require("@vue/cli-service");
const dotenv = require('dotenv');

dotenv.config({ path: '.env.testing' });
//dotenv.config({ path: '.env.production' });

module.exports = defineConfig({
  transpileDependencies: true,
});
