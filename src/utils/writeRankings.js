function getNumber(value) {
  if (typeof value === 'number') {
    const num = Number(value);
    const string = value.toString();
    // console.log(num);

    return Math.abs(num) == 0
      ? Math.abs(num)
      : Math.abs(num) > 10 || (string[string.length - 1] == 0 && string[0] != 0)
      ? Number(num.toFixed(0))
      : Math.abs(num) > 1
      ? Number(num.toFixed(1))
      : Number(num.toFixed(2));
  }
}

function writeRankings() {
  // import the boundary data
  let _COUNCIL_DISTRICTS = require('../data/council_districts.json');
  let _COMMUNITY_BOARDS = require('../data/community_boards.json');
  const boundaries = [_COMMUNITY_BOARDS.features, _COUNCIL_DISTRICTS.features];

  //  start new json

  //   get metric lookup table
  const newRanks = {};

  for (let i = 0; i < boundaries.length; i++) {
    const boundary = i == 0 ? 'community' : 'council';
    const data = boundaries[i];

    // basic structure
    let metrics = {
      [boundary]: {
        P_Adt_Asth: [],
        F27_BusSpe: [],
        F25_BusLan: [],
        F29_Dis2Pa: [],
        F14_TmpDev: [],
        F17_GreInf: [],
        F19_Noise_: [],
        F22_BikRac: [],
        F23_CtyBea: [],
        F15_PM25Me: [],
        F24_BikLan: [],
        F28_Trf_De: [],
        F20_TrfKil: [],
        F21_TrfInj: [],
        F16_TreCan: [],
      },
    };

    const metricKeys = Object.keys(metrics[boundary]);

    // loop through metric keys
    for (let j = 0; j < metricKeys.length; j++) {
      // get boundary name and data
      const container = [];
      for (let k = 0; k < data.length; k++) {
        //   check if feature is an analysis units
        const feature = data[k].properties;
        if ((i == 0 && feature.Data_YN == 'Y') || i == 1) {
          const obj = {};
          //   get id
          const community_ID = i == 0 ? feature.CDTA2020 : feature.CounDist;

          const boroughID =
            i == 0 ? community_ID.replace(/[0-9]/g, '') : 'District';
          const borough =
            boroughID == 'MN'
              ? 'Manhattan'
              : boroughID == 'BX'
              ? 'Bronx'
              : boroughID == 'BK'
              ? 'Brooklyn'
              : boroughID == 'QN'
              ? 'Queens'
              : boroughID == 'SI'
              ? 'Staten Island'
              : 'District';
          const boroughNum = i == 0 ? community_ID.replace(/\D/g, '') : '';

          //   get name
          const community =
            i == 0
              ? `${borough} ${boroughNum}`
              : `${boroughID} ${community_ID}`;

          obj['community'] = community;
          obj['community_ID'] = String(community_ID);
          const metric = feature[metricKeys[j]];
          obj['data'] = getNumber(metric);
          container.push(obj);
        }
      }

      // sort container
      container.sort((a, b) => a.data - b.data);

      //   get ranks and accomodate for ties
      let rank = 1;
      let prev = container[0].data;
      for (let k = 0; k < container.length; k++) {
        if (container[k].data == prev) {
          container[k].rank = container.length + 1 - rank;
        } else {
          rank = k + 1;
          container[k].rank = container.length + 1 - rank;
          prev = container[k].data;
        }
      }

      //   push container to metrics[boundary]
      metrics[boundary][metricKeys[j]] = container;
    }

    // console.log(metrics);
    newRanks[boundary] = metrics[boundary];
  }

  //   console.log(newRanks);

  const rankingChartString = JSON.stringify(newRanks);
  const fs = require('fs');
  fs.writeFile('rankings.json', rankingChartString, 'utf8', (err) => {
    if (err) console.log(err);
    else {
      console.log('File written successfully\n');
      //   console.log('The written has the following contents:');
      //   console.log(fs.readFileSync('temp.json', 'utf8'));
    }
  });
}

writeRankings();
