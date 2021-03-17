
import {worldNationalZH} from '../config/worldNationalZH'
//以geo坐标系处理散点图数据
export const handleScatterData = (data) => {
  var res = [];
  for (var i = 0; i < data.length; i++) {
      var geoCoord = worldNationalZH[data[i].name];
      if (geoCoord) {
          res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
          });
      }
  }
  return res;
};