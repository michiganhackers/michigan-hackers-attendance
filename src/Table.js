import React, { useState, Fragment } from "react";
import {
  buttonStyle,
  defaultStyle,
  headerStyle,
  arrayItemStyle,
  rowStyle
} from "../style.js";

/** Table with functionality to sort by header values
 * and filter using search queries
 */
function Table({ style, title, data }) {
  const [sort, changeSort] = useState([]);
  const [searchQuery, changeQuery] = useState("");
  const [truncate, setTruncate] = useState(false);
  // empty data safeguard
  if (!data || Object.values(data).length === 0)
    return (
      <h2
        style={{
          ...defaultStyle,
          ...style,
          textAlign: "center",
          color: "gray",
          borderBottom: "1px dotted gray"
        }}
      >
        {title}
      </h2>
    );
  // headers can be found for the first json map
  let headers = Object.keys(Object.values(data)[0]);

  return (
    <div style={{ ...defaultStyle, ...style }}>
      <h2
        style={{
          textAlign: "center",
          color: "gray",
          borderBottom: "1px dotted gray"
        }}
      >
        {title}
      </h2>
      {headers.map((header, index) => (
        <div
          key={index}
          style={{
            ...headerStyle,
            color: "#F15D24",
            width: 100 / (headers.length + 0.5) + "%"
          }}
          onClick={() => {
            if (sort.length === 0 || header !== sort[0])
              changeSort([header, true]);
            else changeSort([header, !sort[1]]);
          }}
          children={header}
        />
      ))}
      <br />
      {Object.values(data)
        .filter(data => queryFilter(data, searchQuery))
        .sort((a, b) => sortCols(a, b, sort))
        .map((json, index) => (
          <Row
            key={index}
            headers={headers}
            content={json}
            truncate={truncate}
          />
        ))}
      <button
        style={{ ...buttonStyle, marginTop: 70 }}
        onClick={() => setTruncate(!truncate)}
        children={truncate ? "Expand All List Contents" : "Hide List Contents"}
      />
      <br />
      Search:
      <input
        value={searchQuery}
        onChange={e => changeQuery(e.target.value)}
        style={{ width: 200, margin: 20 }}
      />
      <div style={{ textAlign: "right" }}>
        Total Items:{Object.values(data).length}
      </div>
    </div>
  );
}

/** Group of several cells that represent the attributes of a single entity */
function Row({ headers, content, truncate }) {
  return (
    <Fragment>
      <hr />
      {headers.map(header => (
        <div
          key={header}
          style={{
            ...rowStyle,
            width: 100 / (headers.length + 0.5) + "%"
          }}
          children={<Cell content={content[header]} hide={truncate} />}
        />
      ))}
    </Fragment>
  );
}

/** Cell within a row that's either a plain string/number, or an array cell */
function Cell({ content = "", hide }) {
  if (typeof content === "string" || Number.isInteger(content)) return content;

  if (content.constructor === Array)
    return <ArrayCell content={content} hide={hide} />;

  return Object.keys(content)
    .filter(a => a !== "")
    .map(key => (
      <div key={key} style={{ fontSize: 14 }}>
        {key}: {content[key]}
      </div>
    ));
}

/** Special type of cell holding 1+ array items
 * with functionality yo hide its contents */
function ArrayCell({ content, hide }) {
  const [hidden, setHide] = useState(true);
  if (hide)
    return (
      <Fragment>
        <span style={{ cursor: "pointer" }} onClick={() => setHide(!hidden)}>
          {hidden ? (
            ""
          ) : (
            <Fragment>
              {content.map((listItem, index) => (
                <div key={index} style={arrayItemStyle} children={listItem} />
              ))}
              <br />
              <br />
            </Fragment>
          )}
          Total:
          {content.length}
        </span>
      </Fragment>
    );

  return (
    <Fragment>
      {content.map((listItem, index) => (
        <div key={index} style={arrayItemStyle} children={listItem} />
      ))}
      <span
        style={{
          fontSize: 12,
          color: "gray",
          marginTop: 5,
          display: "block"
        }}
      >
        Total:
        {content.length}
      </span>
    </Fragment>
  );
}

/** Returns boolean value on whether or not a given row
 * should be displayed, while being case-insensitive */
function queryFilter(data, query) {
  return (
    query.length === 0 ||
    JSON.stringify(data)
      .toLowerCase()
      .includes(query.toLowerCase())
  );
}

/** Compares cells based on the type of sort */
// need to check if a and b are undefined, otherwise may cause error
function sortCols(item1 = "", item2 = "", sort) {
  if (sort.length > 0) {
    let a = item1[sort[0]];
    let b = item2[sort[0]];
    if (a !== undefined && b !== undefined) {
      if (a.constructor === Array)
        return otherCompare(a.length, b.length, sort[1]);
      else if (typeof a != "string" && !Number.isInteger(a))
        return otherCompare(
          Object.keys(a).length,
          Object.keys(b).length,
          sort[1]
        );
      if (isDate(a)) return otherCompare(new Date(a), new Date(b), sort[1]);
      return stringCompare(a, b, sort[1]);
    }
  }
  return 0;
}

/** Compares strings (i.e. which one alphabetically goes first) */
function stringCompare(str1, str2, reverse) {
  if (reverse) return str1.localeCompare(str2);
  return str2.localeCompare(str1);
}

/** Compares objects */
function otherCompare(obj1, obj2, reverse) {
  if (reverse) return obj2 - obj1;
  return obj1 - obj2;
}

/** Check whether or not a string is a date */
function isDate(str) {
  str = str.split("/");
  // proper date string here is: ['MM', 'DD', 'YYYY']
  // MM and DD can also be length of 1 and be valid
  // return if lenghth of array and each item fits this
  return (
    str.length === 3 &&
    0 < str[0].length &&
    str[0].length < 3 &&
    0 < str[1].length &&
    str[1].length < 3 &&
    str[2].length === 4
  );
}

export default Table;
