export const convertSexagesimalToDecimal = (SegString) => {
  const parsedSexagesimalArray = [...SegString.matchAll(/-?\+?(\d\d\W?)/g)];
  let decimalValue =
    parseInt(parsedSexagesimalArray[0]) * 15 +
    parseInt(parsedSexagesimalArray[1]) / 4 +
    parseInt(parsedSexagesimalArray[2]) / 240;
  return decimalValue;
};

export function formatDecimal(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export const convertAllSexagesimalToDec = (dataArray) => {
  dataArray.forEach((planet, i) => {
    dataArray[i].rightAscension = formatDecimal(
      convertSexagesimalToDecimal(planet.rightAscension)
    );
    dataArray[i].declination = formatDecimal(
      convertSexagesimalToDecimal(planet.declination)
    );
  });
  return dataArray;
};
