const ApiError = require("../../utils/ApiError");
const {COUNTRYLAYER_API} = require("../../config/env");

exports.getUser = async (req, res, next) => {
    try {
        let rndUserResponse = await fetch("https://randomuser.me/api/")
        let rndUserData =  await rndUserResponse.json()
        let countryName = rndUserData.results[0].location.country

        let countryResponse = await fetch(`https://api.countrylayer.com/v2/name/${countryName}?access_key=${COUNTRYLAYER_API}`, {
            method: "GET",
            headers: {"Accept": "application/json"}
        })
        let countryData = await countryResponse.json()
        let countryCapital = countryData[0].capital


        countryResponse = await fetch(`https://api.countrylayer.com/v2/capital/${countryCapital}?access_key=${COUNTRYLAYER_API}`, {
            method: "GET",
            headers: {"Accept": "application/json"}
        })
        let countryOtherData = await countryResponse.json()

        // let country = {
        //     name: countryLayerData[0].name,
        //     capital: countryLayerData[0].capital,
        // }
        console.log(countryData)
        console.log("_______")
        console.log(countryLanguagesData)
        console.log("_______")
        console.log(countryCurrencyData)


    } catch (err) {
        next(err);
    }
};
