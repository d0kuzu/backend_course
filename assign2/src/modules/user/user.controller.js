const ApiError = require("../../utils/ApiError");
const {COUNTRYLAYER_API, EXCANHGERATE_API, NEWS_API} = require("../../config/env");

exports.getUser = async (req, res, next) => {
    try {
        let rndUserResponse = await fetch("https://randomuser.me/api/")
        let rndUserData =  await rndUserResponse.json()
        let result = rndUserData.results[0]
        let user = {
            firstName: result.name.first,
            lastName: result.name.last,
            gender: result.gender,
            picture: result.picture.large,
            age: result.dob.age,
            dob: result.dob.date,
            city: result.location.city,
            country: result.location.country,
            address: `${result.location.street.name} ${result.location.street.number}`
        }

        let countryName = user.country
        let countryResponse = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        let countryData = await countryResponse.json()
        result = countryData[0]
        let country = {
            name: result.name.common,
            capital: result.capital[0],
            languages: Object.values(result.languages),
            currency: result.currencies[Object.keys(result.currencies)[0]].name,
            flag: result.flags.svg,
            code: result.cca2,
        }

        let countryCurrency = Object.keys(result.currencies)[0]
        let exchangerateResponse = await fetch(`https://v6.exchangerate-api.com/v6/latest/${countryCurrency}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${EXCANHGERATE_API}`,
            }
        })
        let exchangerateData = await exchangerateResponse.json()
        result = exchangerateData
        console.log(result)
        let rates = {
            base: countryCurrency,
            KZT: result.conversion_rates.KZT,
            USD: result.conversion_rates.USD,
            EUR: result.conversion_rates.EUR,
        }

        let countryCode = "US"
        let newsResponse = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}`, {
            method: "GET",
            headers: {
                "Authorization": `${NEWS_API}`,
            }
        })
        let newsData = await newsResponse.json()
        result = newsData.articles
        let news = result

        let answer = {
            user: user,
            country: country,
            exchangeRates: rates,
            news: news,
        }


        res.status(200).json(answer);
    } catch (err) {
        next(err);
    }
};
