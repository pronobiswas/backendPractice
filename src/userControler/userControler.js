const createUserControler = async (req, res) => {
  try {
    res.send("everything is ok");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUserControler };
