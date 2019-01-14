import Imagefiles from './Imagefiles';
var sizeOf = require('image-size');

Imagefiles.collection.before.insert(function(userId, doc) {
  var dims = sizeOf(doc.path);
  doc.fileWidth = dims.width;
  doc.fileHeight = dims.height;
});
