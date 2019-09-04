# Visual Eyes

![Travis (.org)](https://img.shields.io/travis/mattsears18/visual-eyes.svg)
![Coveralls github](https://img.shields.io/coveralls/github/mattsears18/visual-eyes.svg)

A visualization and statistical analysis web application for eye tracking data

- Supports the SMI BeGaze and iMotions file formats
- Compatible with macOS, Windows, and Linux

Visual Eyes is a web application, which means that it runs in your internet browser, but all files uploaded to Visual Eyes are stored on your machine and all computations are run on your machine.

## Example Animation

The video clip below is an example of the interactive animations that can be produced from eye tracking data.

[![VisualEyes - Eye tracking data visualization](https://raw.githubusercontent.com/mattsears18/visual-eyes/master/public/screenshot2.png)](http://www.youtube.com/watch?v=Ed6oByh5tJw)

## Details (From SMI BeGaze Settings)

Fixation begins on the timestamp of the previous row if previous event was saccade
Fixation begins on the timestamp of its first row if previous event was blink
Fixation ends on the timestamp of the following row

Saccade begins on its first row
Saccade ends on its last row

Blink begins on its first row
Blink ends on the timestamp of the following row
