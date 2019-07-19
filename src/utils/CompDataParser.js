export function translateArrayToJSON(data) {
  let output = new Array();
  for (i = 1; i < Object.keys(data).length; i++) {
    let temp = {};
    for (let j in data[0]) {
      temp[data[0][j]] = data[i][j];
    }
    output.push(temp);
  }
  return output;
}

export function parsePlayerDetail(data) {
  let output = new Array();
  for (let player in data) {
    let playerDetail = data[player].PlayerDetails;
    for (i = 1; i < Object.keys(playerDetail).length; i++) {
      let temp = {};
      for (let j in playerDetail[0]) {
        temp[playerDetail[0][j]] = playerDetail[i][j];
      }
      output.push(temp);
    }
  }
  return output;
}

export function parseBattingDetail(data) {
  let output = new Array();
  for (let player in data) {
    let playerDetail = data[player].PlayerDetails;
    for (i = 1; i < Object.keys(playerDetail).length; i++) {
      let temp = {};
      for (let j in playerDetail[0]) {
        temp[playerDetail[0][j]] = playerDetail[i][j];
      }
      output.push(temp);
    }
  }
  return output;
}
