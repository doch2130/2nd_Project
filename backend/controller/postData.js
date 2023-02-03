const { PostList } = require('../model/index');

exports.defaultData = async (req, res) => {

  const result = await PostList.findAll({
    limit: 5,
    order: [['date', 'DESC']],
  });

  res.send(result);

};
