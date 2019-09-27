/*
TODO: team data, position data, visualizations.
click user/date/team/position = stats
 */

// Returns 2 maps based on attendance data:
// 1. dates mapped to users
// 2. users mapped to dates
export function parseData(attendanceData = getAttendanceData()) {
  const eventMap = {};
  const userMap = {};
  let dataArr = attendanceData.split("\n");
  dataArr.shift();
  // headings are "Timestamp" and "uniquename"
  for (let row = 0; row < dataArr.length; ++row) {
    // transform into 3D list separated by commas
    // trim whitespace, remove empty cells
    dataArr[row] = dataArr[row]
      .split(",")
      .map(cell => cell.trim())
      .filter(cell => cell !== "");
    // update map info with transformed data
    const date = dataArr[row][0].split(" ")[0]; // date = mm/dd/yyyy of timestamp str
    const uniquename = dataArr[row][1].toLowerCase();
    const year = dataArr[row][2];
    // init vals if they aren't in the map
    if (!(date in eventMap)) {
      eventMap[date] = {
        date,
        gradYearCounts: { [year]: 1 },
        positionCounts: {},
        teamCounts: {},
        uniquenames: [uniquename]
      };
    } else {
      eventMap[date].uniquenames.push(uniquename);
      if (year in eventMap[date].gradYearCounts)
        ++eventMap[date].gradYearCounts[year];
      else eventMap[date].gradYearCounts[year] = 1;
    }
    if (!(uniquename in userMap)) {
      userMap[uniquename] = {
        uniquename,
        events: [date],
        graduationYear: year,
        positions: [],
        teams: []
      };
    } else userMap[uniquename]["events"].push(date);
  }
  return { eventMap, userMap };
}

// Returns 2 maps based on the 2 inputted maps and user data:
// Each map simply has additional info added about users
export function parseDataDetails(
  userData = getUserData(),
  eventMap = parseData()["eventMap"],
  userMap = parseData()["userMap"]
) {
  const teamMap = {}; // team distribution / hack night and out of all users
  const positionMap = {}; // position distr / hack night and out of all users
  const gradYearMap = {}; // grad year distr / hack night and out of all users
  let dataArr = userData.split("\n");
  dataArr.shift();
  // headings are "Timestamp,uniquename,Graduation Year,
  // Position,Team,Position2,Team2,"
  for (let row = 0; row < dataArr.length; ++row) {
    // transform into 3D list separated by commas, takeout empty items
    dataArr[row] = dataArr[row].split(",").map(cell => cell.trim());
    //.filter(cell => cell !== "");
    const userData = dataArr[row];
    const uniquename = userData[1].toLowerCase();
    const positions = [userData[2], userData[4]].filter(cell => cell !== "");
    const teams = [userData[3], userData[5]].filter(cell => cell !== "");
    userMap[uniquename] = {
      events: [],
      uniquename,
      ...userMap[uniquename],
      positions,
      teams
    };
  }
  Object.keys(userMap).forEach(user => {
    const { positions, teams } = userMap[user];
    const userEventArr = userMap[user]["events"];
    for (const i in userEventArr) {
      const date = userEventArr[i];
      if (date in eventMap) {
        positions.map(position => {
          if (!(position in eventMap[date]))
            eventMap[date].positionCounts[position] = 1;
          else ++eventMap[date].positionCounts[position];
        });
        teams.map(team => {
          if (!(team in eventMap[date])) eventMap[date].teamCounts[team] = 1;
          else ++eventMap[date].teamCounts[team];
        });
      }
    }
  });
  return { userMap, eventMap };
}
/** DUMMY DATA FOR NOW */
export function getUserData() {
  return `
  12/6/2018 20:41:55,carneyb,Executive,Leadership,,Creative,,
  12/6/2018 20:41:55,chafke,Lead,Leadership,,Web,,`;
}
/**
  12/13/2018 18:53:27,human,2020,Core Member,Interviewing,,,
  12/20/2018 18:53:27,pal,2019,Team Lead,React Native,,Leadership,
  2/14/2019 18:35:13,hacker,2021,Core Member,Creative,,,
  2/14/2019 18:35:13,sentient being,2022,Executive,Leadership,,,
  2/14/2019 18:35:13,yes,2021,Senior Advisor,Leadership,,,
  2/14/2019 18:35:13,maybe,2020,Team Lead,Android,Senior Advisor,Leadership,
  2/7/2019 18:31:12,friend,2022,Core Member,Web,iOS,,
   */
export function getAttendanceData() {
  return `Timestamp,Uniqname,Anticipated Grad Date,Questions/Suggestions?
9/19/2019 19:05:46,ranyoo,2022,
9/19/2019 19:06:01,drodz,2022,
9/19/2019 19:06:01,rogr,2023,
9/19/2019 19:06:07,chafke,2020,
9/19/2019 19:06:39,dharivib,2023,
9/19/2019 19:07:04,ibhuiyan,2021,`;
}
/**

  12/6/2018 20:41:55,person,
  12/13/2018 18:53:27,human,
  12/6/2018 18:53:27,pal,
  12/13/2018 18:53:27,sentient being,
  12/20/2018 18:53:27,yes,
  12/20/2018 18:53:27,pal,
  2/7/2019 18:32:47,person,
  2/14/2019 18:35:13,hacker,
  2/7/2019 18:31:12,friend,
 */
