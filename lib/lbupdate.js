async function update() {
  const { GoogleSpreadsheet } = require("google-spreadsheet");
  const env = require("dotenv");
  const fs = require("fs");

  env.config();

  const doc = new GoogleSpreadsheet(
    "1nkuC6f2RCA-QMsFc1uif0uyYE3tYBRu-VEOhRjmrTks"
  );

  const token = require("../tokens/token.json");

  await doc.useServiceAccountAuth(token);

  if (!fs.existsSync("./dbs/db.json")) {
    fs.writeFileSync("./dbs/db.json", JSON.stringify({}));
  }

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  await sheet.loadCells();

  var accessDate = sheet.getCellByA1("C5");

  accessDate.value = Date.now();

  var accessCount = sheet.getCellByA1("C6");

  accessCount.value = parseInt(accessCount.value) + 1;

  await sheet.saveUpdatedCells();

  const dataSheet = doc.sheetsByIndex[1];

  var data = await dataSheet.getRows();

  var savedata = {
    data: [],
    list: []
  };

  data.forEach((row, index) => {
    var tempData;

    switch (row.Type) {
      case "Exploration" || "Ring":
        tempData = {
          mountain: row.Mountain,
          name: row.Name,
          type: row.Type,
          id: index
        };
        break;
      case "Trail":
        tempData = {
          mountain: row.Mountain,
          name: row.Name,
          b: row.Bronze,
          type: row.Type,
          id: index
        };
        break;

      default:
        tempData = {
          mountain: row.Mountain,
          name: row.Name,
          b: row.Bronze,
          s: row.Silver,
          g: row.Gold,
          dd: row.DD,
          td: row.TD,
          type: row.Type,
          id: index
        };

        break;
    }
    savedata.data.push(tempData);
    savedata.list.push(tempData.name)
  });

  fs.writeFileSync("./dbs/db.json", JSON.stringify(savedata, null, 4));
}

function getTrial(trial) {

  const fs = require("fs");

  var db = JSON.parse(fs.readFileSync("./dbs/db.json"))

  return db.data.find((element) => {
    
    return element.name == trial 
  
  })
}

module.exports = { update, getTrial };
