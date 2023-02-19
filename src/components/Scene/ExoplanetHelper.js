
//const planetdata = new Array(1024).fill(0).map((d,id) => ({id}));

//Right Ascension: decimal ra = 15 * h + m/4 + s/240
//Declination: dd = d + m/60 + s/3600
//https://physics.stackexchange.com/questions/434569/convert-sexagesimal-to-decimal

import { convertAllSexagesimalToDec } from "./conversionsHelper";

let planetdata = [
    {
        name: "TOI-1000.01",
        disposition: "FP",
        rightAscension: '07h29m25.85s',
        declination: "-12d41m45.46s",
        distance:  4.85, //"485.735±11.9515",
    },
    {
        name: "TOI-10001.01",
        disposition: "PC",
        rightAscension: "08h10m19.31s",
        declination:" -05d30m49.87s",
        distance:  2.95, //"295.862+5.91",
    },
    {
        name: "TOI-1002.01",
        disposition: "FP",
        rightAscension: "06h58m54.47s",
        declination: "-10d34m49.64s",
        distance:  9.43, //"943.109+106.333",
    },
    {
        name: "TOI-1003.01",
        disposition: "FP",
        rightAscension: "07h22m14.39s",
        declination: "-25d12m25.26s",
        distance:  77.28, //7728.17+1899.57
    },
    {
        name: "TOI-1004.01",
        disposition: "FP",
        rightAscension: "08h08m42.77s",
        declination: "-48d48m10.12s",
        distance:  3.56, //356.437+4.6175
    },
    {
        name: "TOI-1005.01",
        disposition: "FP",
        rightAscension: "08h02m49.15s",
        declination: "-11d06m05.48s",
        distance:  1.0, //100.711+14.121
    },
    {
        name: "TOI-1006.01",
        disposition: "FP",
        rightAscension: "08h17m26.22s",
        declination: "-27d16m24.68s",
        distance:  9.43, //"943.1"09+106.333",
    },
    {
        name: "TOI-1007.01",
        disposition: "PC",
        rightAscension: "07h31m00.57s",
        declination: "-04d27m48.09s",
        distance:  2.83, //283.291+3.0025
    },
    {
        name: "TOI-1008.01",
        disposition: "FP",
        rightAscension: "07h17m31.88s",
        declination: "+13d23m42.79s",
        distance:  1.44, //144.297
    },
    {
        name: "TOI-1009.01",
        disposition: "PC",
        rightAscension: "07h26m40.28s",
        declination:" -24d27m43.6s",
        distance:  8.66, //866.147+172.097
    }
]

planetdata = convertAllSexagesimalToDec(planetdata)

export default planetdata;