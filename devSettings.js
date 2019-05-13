if(Meteor.isDevelopment) {
  Meteor.settings.public['uploads'] = '/Users/mattsears/data/meteor/uploads';
  Meteor.settings.public['ga'] = { "account": "UA-123347068-1" };

  if(Meteor.isServer) {
    // noinspection SpellCheckingInspection
    Meteor.settings['s3'] = {
      "key": "AKIAJEDESCDXUZ7SAJ3Q",
      "secret": "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",
      "bucket": "eyetracking2",
      "region": "us-west-1"
    };
  }
}
