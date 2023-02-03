const { PostList } = require('../model/index');

exports.defaultData = async (req, res) => {

  const result = await PostList.findAll({
    limit: 5,
    order: [['date', 'DESC']],
  });

  res.send(result);
};


exports.testAddData = async (req, res) => {
  console.log('data');
  const data = {
    // number: req.body.number,
    id: req.body.id,
    content: req.body.content,
    filename: req.body.filename,
    // date: req.body.date,
    category: req.body.category,
  }

  const result = await PostList.create(data);

  res.send(result);
};

