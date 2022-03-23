require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL,
  FB_VERIFY_TOKEN: process.env.FB_VERIFY_TOKEN,
  FB_PAGE_TOKEN: process.env.FB_PAGE_TOKEN,
};
