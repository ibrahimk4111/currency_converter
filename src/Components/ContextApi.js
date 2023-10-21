import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const ContextApi = ({ children }) => {
  const APIKEY = "UEScgk7d2Zhnek9VmDxcp99IJr3ywhFw";
  const [toCurrency, settoCurrency] = useState("BDT");

  // Start Rest Country API data
  const [countries, setCountries] = useState([]);
  async function fetchCountry() {
    const { data } = await axios.get("https://restcountries.com/v3.1/all");
    const countryFilter = data.filter((item) => "currencies" in item);
    // sort the countries by it's name
    countryFilter.sort((a, b) =>
      a.name.common > b.name.common ? 1 : b.name.common > a.name.common ? -1 : 0
    );
    setCountries(countryFilter);
  }
  // END Rest Country API data

  // Start currency rates API data
  const [fromCurrency, setfromCurrency] = useState("USD");
  const [currencyRates, setcurrencyRates] = useState();
  const [countryName, setCountryName] = useState();

  // fetching rates from api
  async function fetchRates(baseData) {
    const { data } = await axios.get(
      `https://api.apilayer.com/fixer/latest?base=${baseData}&apikey=${APIKEY}`
    );
    setcurrencyRates(data);
  }

  // fetching symbols from api
  async function fetchSymbols() {
    const { data } = await axios.get(
      `https://api.apilayer.com/fixer/symbols?apikey=${APIKEY}`
    );
    setCountryName(data);
  }
  // END currency rates API data

  useEffect(() => {
    fetchCountry();
    fetchRates(fromCurrency);
    fetchSymbols();
  }, [fromCurrency]);

  return (
    <UserContext.Provider
      value={{
        countries,
        fromCurrency,
        setfromCurrency,
        fetchRates,
        currencyRates,
        countryName,
        toCurrency,
        settoCurrency,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextApi;
