
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'We are moving, please update your bookmarks' });
};