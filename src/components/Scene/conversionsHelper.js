export const convertSexagesimalToDecimal = (SegString) => {
    const parsedSexagesimalArray = [...SegString.matchAll(/-?\+?(\d\d\W?)/g)]
    let decimalValue = ((parseInt(parsedSexagesimalArray[0]) * 15) + (parseInt(parsedSexagesimalArray[1]) / 4) + (parseInt(parsedSexagesimalArray[2]) / 240))
    return decimalValue
}

export const convertAllSexagesimalToDec = (dataArray) => {
    dataArray.forEach((planet, i)=> {
        dataArray[i].rightAscension = convertSexagesimalToDecimal(planet.rightAscension)
        dataArray[i].declination = convertSexagesimalToDecimal(planet.declination)
    } )
    return dataArray
}