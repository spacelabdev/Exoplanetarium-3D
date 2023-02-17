
//const planetdata = new Array(1024).fill(0).map((d,id) => ({id}));

//Right Ascension: decimal ra = 15 * h + m/4 + s/240
//Declination: dd = d + m/60 + s/3600
//https://physics.stackexchange.com/questions/434569/convert-sexagesimal-to-decimal

const planetdata = [
    {
        name: "TOI-1000.01",
        disposition: "FP",
        rightAscension: ((15 * 7) + (29 / 4) + (25.85 / 240)), //07h29m25.85s
        declination: ((-12 ) + (41/60) + (45.46/3600)), //"-12d41m45.46s",
        distance:  4.85, //"485.735±11.9515",
    },
    {
        name: "TOI-10001.01",
        disposition: "PC",
        rightAscension: ((15 * 8) + (10 / 4) + (19.31 / 240)), //08h10m19.31s
        declination: ((-5 ) + (30/60) + (49.87/3600)), //-05d30m49.87s,
        distance:  2.95, //"295.862+5.91",
    },
    {
        name: "TOI-1002.01",
        disposition: "FP",
        rightAscension: ((15 * 6) + (58 / 4) + (54.47 / 240)), //06h58m54.47s
        declination: ((-10 ) + (34/60) + (49.64/3600)), //-10d34m49.64s,
        distance:  9.43, //"943.109+106.333",
    },
    {
        name: "TOI-1003.01",
        disposition: "FP",
        rightAscension: ((15 * 7) + (22 / 4) + (14.39 / 240)), //07h22m14.39s
        declination: ((-25 ) + (12/60) + (25.26/3600)), //-25d12m25.26s,
        distance:  77.28, //7728.17+1899.57
    },
    {
        name: "TOI-1004.01",
        disposition: "FP",
        rightAscension: ((15 * 8) + (8 / 4) + (42.77 / 240)), //08h08m42.77s
        declination: ((-48 ) + (48/60) + (10.12/3600)), //-48d48m10.12s,
        distance:  3.56, //356.437+4.6175
    },
    {
        name: "TOI-1005.01",
        disposition: "FP",
        rightAscension: ((15 * 8) + (2 / 4) + (49.15 / 240)), //08h02m49.15s
        declination: ((-11) + (6/60) + (5.48/3600)), //-11d06m05.48s
        distance:  1.0, //100.711+14.121
    },
    {
        name: "TOI-1006.01",
        disposition: "FP",
        rightAscension: ((15 * 8) + (17 / 4) + (26.22 / 240)), //08h17m26.22s
        declination: ((-27 ) + (16/60) + (24.68/3600)), //-27d16m24.68s,
        distance:  9.43, //"943.109+106.333",
    },
    {
        name: "TOI-1007.01",
        disposition: "PC",
        rightAscension: ((15 * 7) + (31 / 4) + (.57 / 240)), //07h31m00.57s
        declination: ((-4 ) + (27/60) + (48.09/3600)), //-04d27m48.09s,
        distance:  2.83, //283.291+3.0025
    },
    {
        name: "TOI-1008.01",
        disposition: "FP",
        rightAscension: ((15 * 7) + (17 / 4) + (31.88 / 240)), //07h17m31.88s
        declination: ((13 ) + (23/60) + (42.79/3600)), //+13d23m42.79s,
        distance:  1.44, //144.297
    },
    {
        name: "TOI-1009.01",
        disposition: "PC",
        rightAscension: ((15 * 7) + (26 / 4) + (40.28 / 240)), //07h26m40.28s
        declination: ((-24 ) + (27/60) + (43.6/3600)), //-24d27m43.6s
        distance:  8.66, //866.147+172.097
    }
]

export default planetdata;