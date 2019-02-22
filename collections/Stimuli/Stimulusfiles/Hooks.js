import Stimulusfiles from './Stimulusfiles';
import Stimuli from '../Stimuli';
var sizeOf = require('image-size');

Stimulusfiles.collection.before.insert(function(userId, doc) {
  var dims = sizeOf(doc.path);
  doc.fileWidth = dims.width;
  doc.fileHeight = dims.height;
});

Stimulusfiles.collection.after.remove(function(userId, doc) {
  Stimuli.update({ stimulusfileId: doc._id }, { $unset: { stimulusfileId: true }});
});
