const { defineConfig } = require("@vue/cli-service");
const dotenv = require('dotenv');

dotenv.config({ path: '.env.dev' });
//dotenv.config({ path: '.env.prod' });

module.exports = defineConfig({
  transpileDependencies: true,
});
