# VisualEyes
A visualization and statistical analysis app for eye tracking data
- Supports the SMI BeGaze, and iMotions file formats

## Install
1. Install Node.js and NPM: https://nodejs.org
2. Install Meteor.js: https://www.meteor.com/install
3. Install git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
4. Clone this repository and change to the directory
```
git clone git@github.com:mattsears18/VisualEyes.git
cd VisualEyes
```
5. Install NPM dependencies
```
npm install
```
6. Launch the application
```
meteor
```
7. Navigate to the app: http://localhost:3000

## Quick Start
1. Launch the app and navigate to: http://localhost:3000
2. Register for an account (top right corner of the app).
3. Create a `study` with at least one eye tracking data file. SMI and iMotions file formats will automatically be recognized. Study participants should have individual eye tracking data files. `Participants` and `stimuli` are generated from the eye tracking data files.
4. Add a stimulus file (reference image) to each `stimulus` by editing each `stimulus`.
5. Confirm the `width` and `height` of each `stimulus`. By default, the `width` and `height` are set to the width and height of the uploaded stimulus file (reference image).
6. If desired, create `variables` for the `participants`, e.g. age, gender, etc.
7. Create an `analysis`. `Viewings` are generated from the `analysis`.
8. If desired, on the `analysis` page, click "Download Data as .CSV" to download the results of the `analysis` in tabular format, along with the input `participant` `variables`.
9. On the `analysis` page, scroll down to the `viewings` table and click on a `viewing`.
10. Choose "Convex Hull Areas" for the `analysis type` to view the convex hull animation of the `viewing`.
