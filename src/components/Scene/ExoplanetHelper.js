//const planetdata = new Array(1024).fill(0).map((d,id) => ({id}));

//Right Ascension: decimal ra = 15 * h + m/4 + s/240
//Declination: dd = d + m/60 + s/3600
//https://physics.stackexchange.com/questions/434569/convert-sexagesimal-to-decimal
import { convertAllSexagesimalToDec } from "./conversionsHelper";

let planetdata = [
  {
    name: "TOI-1000.01",
    disposition: "FP",
    rightAscension: "07h29m25.85s",
    declination: "-12d41m45.46s",
    distance: 4.85, //"485.735±11.9515",
    starData: {
      stellarDistance: "485.735±11.9515",
      effectiveTemperature: "10249±264.7",
      log: "4.19±0.07",
      radius: "2.16986±0.0725729",
    },
  },
  {
    name: "TOI-10001.01",
    disposition: "PC",
    rightAscension: "08h10m19.31s",
    declination: " -05d30m49.87s",
    distance: 2.95, //"295.862+5.91",
    starData: {
      stellarDistance: "295.862±5.91",
      effectiveTemperature: "7070±126.4",
      log: "4.03±0.09",
      radius: "2.01±0.09",
    },
  },
  {
    name: "TOI-1002.01",
    disposition: "FP",
    rightAscension: "06h58m54.47s",
    declination: "-10d34m49.64s",
    distance: 9.43, //"943.109+106.333",
    starData: {
      stellarDistance: "943.109±106.333",
      effectiveTemperature: "8924±124",
      log: "",
      radius: "5.73",
    },
  },
  {
    name: "TOI-1003.01",
    disposition: "FP",
    rightAscension: "07h22m14.39s",
    declination: "-25d12m25.26s",
    distance: 77.28, //7728.17+1899.57
    starData: {
      stellarDistance: "7728.17±1899.57",
      effectiveTemperature: "5388.5±567",
      log: "4.15±1.64",
      radius: "",
    },
  },
  {
    name: "TOI-1004.01",
    disposition: "FP",
    rightAscension: "08h08m42.77s",
    declination: "-48d48m10.12s",
    distance: 3.56, //356.437+4.6175
    starData: {
      stellarDistance: "356.437±4.6175",
      effectiveTemperature: "9219±171.1",
      log: "4.14±0.07",
      radius: "2.15±0.06",
    },
  },
  {
    name: "TOI-1005.01",
    disposition: "FP",
    rightAscension: "08h02m49.15s",
    declination: "-11d06m05.48s",
    distance: 1.0, //100.711+14.121
    starData: {
      stellarDistance: "100.711±14.121",
      effectiveTemperature: "5613±179.9",
      log: "",
      radius: "1.09±0.07",
    },
  },
  {
    name: "TOI-1006.01",
    disposition: "FP",
    rightAscension: "08h17m26.22s",
    declination: "-27d16m24.68s",
    distance: 9.43, //"943.1"09+106.333",
    starData: {
      stellarDistance: "",
      effectiveTemperature: "6616±200",
      log: "",
      radius: "1.53429±1.4887",
    },
  },
  {
    name: "TOI-1007.01",
    disposition: "PC",
    rightAscension: "07h31m00.57s",
    declination: "-04d27m48.09s",
    distance: 2.83, //283.291+3.0025
    starData: {
      stellarDistance: "283.291±3.0025",
      effectiveTemperature: "6596±139.2",
      log: "3.71±0.09",
      radius: "2.7±0.13",
    },
  },
  {
    name: "TOI-1008.01",
    disposition: "FP",
    rightAscension: "07h17m31.88s",
    declination: "+13d23m42.79s",
    distance: 1.44, //144.297
    starData: {
      stellarDistance: "144.297",
      effectiveTemperature: "6858.5±584.6",
      log: "4.2±1.9",
      radius: "0.99±0.18",
    },
  },
  {
    name: "TOI-1009.01",
    disposition: "PC",
    rightAscension: "07h26m40.28s",
    declination: " -24d27m43.6s",
    distance: 8.66, //866.147+172.097
    starData: {
      stellarDistance: "866.147±172.097",
      effectiveTemperature: "8868.7±809.8",
      log: "",
      radius: "",
    },
  },
];

planetdata = convertAllSexagesimalToDec(planetdata);

export default planetdata;
