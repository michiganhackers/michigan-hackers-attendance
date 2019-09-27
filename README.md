# About

React program that reads CSV formatted data (created via Google Forms -> Google Spreadsheets -> .csv export) into a text area to output either individual user info or event info

## High-level Overview

### index.js:

- DOM injection point, which wraps all content in modal
- calls dataparse functions to determine content
- formats content using table

### dataparse.js

- reads in data
- processes data for use in index.js/Table.js

### Table.js

- formatting of data into user interface as row with various cells
- handles sorting and searching

### data

- folder that holds attendance information for each hack night
- for now, no functionality except source to paste into textarea to parse

## Contribute:

- fork
- add changes
- open pull request

# TODO:

- calculate consecutive hack nights
- system to flag people who had emails sent to them already (to avoid double sending)
- set data with csv files instead of pasting into textareas
  - preferably read each csv file under data

Less priority:

- other sorting (conditional parsing with 'and' / 'or')
- abstract Modal away into Modal.js
- generalize dataparsing and index.js data editing more
