module.exports = {
  HOST: "localhost",
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: "social_media",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
