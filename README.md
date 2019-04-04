# VisualEyes
[![Build Status](https://travis-ci.org/mattsears18/VisualEyes.svg?branch=master)](https://travis-ci.org/mattsears18/VisualEyes)

A visualization and statistical analysis web application for eye tracking data
- Supports the SMI BeGaze and iMotions file formats
- Compatible with macOS, Windows, and Linux

VisualEyes is a web application, which means that it runs in your internet browser, but all files uploaded to VisualEyes are stored on your machine and all computations are run on your machine.

## Installation Prerequisites
Follow the installation instructions for your operating system for each of the following applications:
1. Install Node.js (includes NPM): https://nodejs.org
2. Install Meteor.js: https://www.meteor.com/install
3. Install git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
4. Recommended to Windows Users - Install and use cmder instead of the default Windows Command Line: https://cmder.net/

## Installation
1. Open your terminal (macOS), cmder (Windows), or Command Line (Windows).
2. Navigate to the directory where you would like to install VisualEyes. For example:
### macOS
```
cd ~/
```
or (replace [your username] with your actual macOS username)
```
cd /Users/[your username]
```
### Windows
(replace [your username] with your actual Windows username)
```
cd C:\Users\[your username]
```
3. Clone this repository and change to the "VisualEyes" directory.
```
git clone https://github.com/mattsears18/VisualEyes.git
cd VisualEyes
```
5. Install NPM dependencies.
```
npm install
```
6. Launch the application.
```
npm start
```
7. When you see "App running at: http://localhost:3000/" that means that you have usccessfully installed and launched the application. Open your internet browser (e.g. Google Chrome) and navigate to the app: http://localhost:3000

## Quick Start
1. After installing VisualEyes (see installation instructions above), launch the app and navigate to: http://localhost:3000
2. Register for an account (top right corner of the app).
3. Create a `study` with at least one eye tracking data file.

    Notes:
    * `Participants` should have individual eye tracking data files.
    * SMI and iMotions file formats will automatically be recognized.
    * `Participants` and `stimuli` are generated from the eye tracking data files and the Participants receive the same name as the datafiles.
    * This file may be used as an example (right-click and "Save Link As"): https://github.com/mattsears18/VisualEyes/raw/master/testFiles/realFile/Participant%2001.csv

4. Add a stimulus file (reference image) to each `stimulus` by editing each `stimulus`.

    Note:
    * If you used the example data file above, then this reference image can be used for the "Spool 1" `stimulus` (right-click and "Save Link As"): https://github.com/mattsears18/VisualEyes/raw/master/testFiles/realFile/DWG01.png


5. Confirm the `width` and `height` of each `stimulus`. By default, the `width` and `height` are set to the width and height of the uploaded stimulus file (reference image).
6. If desired, create `variables` for the `participants`, e.g. age, gender, etc.
7. Create an `analysis`. `Viewings` are generated from the `analysis`.
8. If desired, on the `analysis` page, click "Download Data as .CSV" to download the results of the `analysis` in tabular format, along with the input `participant` `variables`.
9. On the `analysis` page, scroll down to the `viewings` table and click on a `viewing`.
10. Choose "Convex Hull Areas" for the `analysis type` to view the convex hull animation of the `viewing`.
