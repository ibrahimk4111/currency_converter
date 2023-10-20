import React, { useContext } from 'react'
import '../Styles/converterForm.css'
import { UserContext } from './ContextApi'
import { useState } from 'react'

const ConverterForm = () => {
    const [amount, setAmount] = useState(1)

    const { countries, fromCurrency, setfromCurrency, fetchRates, currencyRates, toCurrency, settoCurrency } = useContext(UserContext)

    const onchangeHandler = (e) => {
        setfromCurrency(e.target.value)
        fetchRates(e.target.value)
    }

    currencyRates && console.log(currencyRates.rates[`${toCurrency}`])
    currencyRates && console.log(currencyRates.rates[`${toCurrency}`] * amount)

    return (
        <>
            <div className='mainBox'>
                <form className='form'>

                    <input type="number" name="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

                    <label htmlFor="">From Currency</label>
                    <select className='select-from' value={fromCurrency} onChange={onchangeHandler}>
                        {
                            countries.map((country, index) => (
                                <option key={index} value={Object.keys(country.currencies)[0]}>
                                    {Object.keys(country.currencies)[0]} - {country.name.common}
                                </option>
                            ))
                        }
                    </select>

                    <label htmlFor="">To Currency</label>
                    {currencyRates &&
                        <select className='select-to' value={toCurrency} onChange={(e) => settoCurrency(e.target.value)}>
                            {
                                Object.keys(currencyRates.rates).map((rate, index) => (
                                    <option key={index}>
                                        {rate}
                                    </option>
                                ))
                            }
                        </select>
                    }
                </form>
                <p className='result'>
                    {currencyRates &&
                        currencyRates.rates[`${toCurrency}`] * amount
                    }
                </p>
            </div>
        </>
    )
}

export default ConverterForm









/*
const {text} = useContext(userContext)

const APIKEY = 'UEScgk7d2Zhnek9VmDxcp99IJr3ywhFw'
const [countries, setCountries] = useState([])
const [FromCurrency, setFromCurrency] = useState("USD")
const [currenciesData, setCurrenciesData] = useState();
// const [symbolData, setSymbolData] = useState();
const [ToCurrency, setToCurrency] = useState('BDT')

async function fetchRates(baseData) {
      const {data} = await axios.get(`https://api.apilayer.com/fixer/latest?base=BDT&apikey=${APIKEY}`);
      console.log(data)
  }


async function fetchSymbols() {
      const {data} = await axios.get(`https://api.apilayer.com/fixer/symbols?apikey=${APIKEY}`);
      setSymbolData(data)
  }

async function fetchCountry() {
    const { data } = await axios.get('https://restcountries.com/v3.1/all');
    const countryFilter = data.filter(item => "currencies" in item)
    // sort the countries by it's name
    countryFilter.sort((a, b) => a.name.common > b.name.common ? 1 : b.name.common > a.name.common ? -1 : 0)
    setCountries(countryFilter)
}

useEffect(() => {
    fetchCountry()
    fetchRates()
    fetchSymbols()
}, [])

const [inputValue, setinputValue] = useState(1);

const convertedCurrency = (e) => {
    e.preventDefault()
}

const handleBaseChange = (e) =>{
    setFromCurrency(e.target.value)
    setCurrenciesData({...currenciesData, base: e.target.value})
}







<form onSubmit={(e) => convertedCurrency(e)} className='mainBox'>
            <input type="number" className='input-amount' onChange={(e) => setinputValue(e.target.value)} value={inputValue} />

            <label htmlFor="">text</label>
            <select className='select-from' value={FromCurrency} onChange={handleBaseChange}>
                {
                    countries.map((country, index) => (
                        <option key={index} value={Object.keys(country.currencies)[0]}>
                            {Object.keys(country.currencies)[0]} - {country.name.common}
                        </option>
                    ))
                }
            </select>

            <label htmlFor="">To:</label>
            <select className='select-to' onChange={(e) => setToCurrency(e.target.value)}>
                {
                    Object.keys(currenciesData.rates).map((rate, index) => (
                        <option key={index}>{rate}</option>
                    ))
                }
            </select>

            <button type="submit">convert</button>

        </form>
*/