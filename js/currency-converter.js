/*const axios = require('axios');*/


const getExchangeRate = async (fromCurrency, toCurrency) => {
	try {
		const response = await axios.get('http://www.apilayer.net/api/live?access_key=69e020664dd7fdc579f6dd57983e31d6');
		const rate = response.data.quotes;
		const baseCurrency = response.data.source;
		const usd = 1 / rate[`${baseCurrency}${fromCurrency}`];
		const exchangeRate = usd * rate[`${baseCurrency}${toCurrency}`];
		return exchangeRate;
	} catch (error) {
		throw new Error(`You can't get currency ${fromCurrency} and  ${toCurrency}`);
	}
};


const getCountries = async (currencyCode) => {
	try {
		const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
		return response.data.map(country => country.name);
	} catch (error) {
		throw new Error(`You can't get countries that use ${currencyCode}`);
 	}
};


const convertCurrency = async (fromCurrency, toCurrency) => {
	try {
	    const enterAmount = document.querySelector('#amount').value;
	    const fromCurrency = document.querySelector('#unitValue').value;
	    const toCurrency = document.querySelector('#unitCurrency').value;

	    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
	    const countries = await getCountries(toCurrency);
	    const convertedAmount = (enterAmount * exchangeRate).toFixed(1);
		return `${enterAmount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. 
		You can spend these in the following countries: ${countries}`;
	} catch (error) {
		throw new Error("You can't get currency converter");
 	}
}


document.querySelector('#result').addEventListener('click', function () {
	convertCurrency()
    .then((message) => {
        document.querySelector('#use').innerHTML = message;
    }).catch((error) => {
        document.querySelector('#use').innerHTML = error.message;
    });
});
