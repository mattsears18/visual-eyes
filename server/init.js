import jst from "jStat"; // can't write import jStat from 'jStat' as it would override the jStat variable on the client and set it to undefined
import Jobs from "../collections/Jobs/Jobs";
const os = require("os");

require("../devSettings");

Meteor.startup(() => {
  Jobs.startJobServer();
  // Start the myJobs queue running
  // force fail any jobs with "running" status
  runningJobs = Jobs.find({ status: "running" });

  runningJobs.forEach(function(jobDoc) {
    job = Jobs.getJob(jobDoc._id);
    job.fail("server restarted");
  });
});

if (Meteor.isServer) {
  jStat = jst.jStat;
  fs = Npm.require("fs");

  // Make '/data/meteor/uploads' writable by user
  // fs.chmodSync('/data/meteor/uploads', 0o755);

  if (!Meteor.settings.public.uploads) {
    console.log("no uploads directory set in Meteor.settings");

    defaultUploadsDir = `${os.homedir()}/data/meteor/uploads`;
    console.log(`set uploads directory to: ${defaultUploadsDir}`);
    Meteor.settings.public.uploads = defaultUploadsDir;

    settingsFilepath = `${process.env.PWD}/settings.json`;

    if (fs.existsSync(settingsFilepath)) {
      console.log("settings file exists, check for uploads directory");
      fs.readFile(settingsFilepath, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          try {
            settings = JSON.parse(data);
            if (!settings.public.uploads) {
              // No uploads directory set, set to default
              console.log("no uploads directory set");
              console.log(`set uploads directory to: ${defaultUploadsDir}`);
              settings.public.uploads = defaultUploadsDir;
              saveSettings(settingsFilepath, settings);
            } else {
              console.log("uploads directory already set in ./settings.json");
            }
          } catch (err) {
            console.log(
              "error reading settings.json, save new file with just the uploads directory setting"
            );
            settings = { public: { uploads: defaultUploadsDir } };
            saveSettings(settingsFilepath, settings);
          }
        }
      });
    } else {
      settings = { public: { uploads: defaultUploadsDir } };
      saveSettings(settingsFilepath, settings);
    }
  }
}

function saveSettings(settingsFilepath, settings) {
  fs.writeFile(settingsFilepath, JSON.stringify(settings, null, 2), err => {
    if (err) {
      console.log(err);
    } else {
      console.log("update settings.json");
      console.log(settings);
    }
  });
}
