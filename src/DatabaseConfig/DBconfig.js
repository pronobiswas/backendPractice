const mongoose = require("mongoose");
const chalk = require("chalk");

const DBConnection = async () => {
  try {
    const connectionInfo = await mongoose.connect(
      `${process.env.DATABASE_URL}/'exam'`
    );

    console.log(chalk.blue(`${connectionInfo.connection.host}`));
  } catch (error) {
    console.log(error);
    console.log(chalk.red(error));
  }
};

module.exports = { DBConnection };
