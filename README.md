index.js:

- DOM injection point, which wraps all content in modal
- calls dataparse functions to determine content
- formats content using table

dataparse.js

- reads in data
- processes data for use in index.js/Table.js

Table.js

- formatting of data into user interface as row with various cells
- handles sorting and searching

TODO:

- calculate consecutive hack nights
- system to flag people who had emails sent to them already (to avoid double sending)
- set data with csv files instead of pasting into textareas
  - preferably read each csv file under data

Less priority:

- other sorting (conditional parsing with 'and' / 'or')
- abstract Modal away into Modal.js
- generalize dataparsing and index.js data editing more
