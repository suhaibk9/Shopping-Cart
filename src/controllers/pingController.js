const pingController = (req, res) => {
  return res.json({
    message: 'pong',
  });
};
module.exports = pingController;
