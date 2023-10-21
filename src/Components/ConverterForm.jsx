import React, { useContext } from 'react'
import '../Styles/converterForm.css'
import { UserContext } from './ContextApi'
import { useState } from 'react'

const ConverterForm = () => {
    const [amount, setAmount] = useState(1)

    const { countries, fromCurrency, setfromCurrency, fetchRates, currencyRates, countryName, toCurrency, settoCurrency } = useContext(UserContext)

    const onchangeFromHandler = (e) => {
        setfromCurrency(e.target.value)
        fetchRates(e.target.value)
    }

    // currencyRates && console.log()
    const toggleHandler = () =>{
        setfromCurrency(toCurrency)
        settoCurrency(fromCurrency)
        fetchRates(toCurrency)
    }

    currencyRates && console.log(currencyRates)
    return (
        <>
            <div className='mainBox'>
                <div>
                    <form className='form'>

                        <div className='formDivs'>
                            <input className='amount' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>

                        <div className='formDivs'>
                            <p style={{ marginTop: '2px', }}>FROM CURRENCY :</p>
                            <select className='select-from' value={fromCurrency} onChange={onchangeFromHandler}>
                                {
                                    countries.map((country, index) => (
                                        <option key={index} value={Object.keys(country.currencies)[0]}>
                                            {Object.keys(country.currencies)[0]} - {country.name.common}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='toggle formDivs' onClick={toggleHandler}>
                            <span style={{color: 'white'}}>||</span>
                        </div>

                        <div className='formDivs'>
                            <p style={{ marginTop: '2px' }}>TO CURRENCY :</p>
                            {currencyRates &&
                                <select className='select-to' value={toCurrency} onChange={(e) => settoCurrency(e.target.value)}>
                                    {
                                        Object.keys(currencyRates.rates).map((rate, index) => (
                                            <option key={index} value={rate}>
                                                {rate} - {countryName && countryName.symbols[`${toCurrency}`]}
                                            </option>
                                        ))
                                    }
                                </select>
                            }
                        </div>
                    </form>
                </div>

                <div className='result'>
                    <p className='totalAmount'>
                        <span>Converted amount is = </span>
                        <span style={{ fontWeight: 'bold' }}>
                            {currencyRates &&
                                currencyRates.rates[`${toCurrency}`] * amount
                            }
                        </span>
                        <span> in </span>
                        <span style={{ fontWeight: 'bold' }}> {toCurrency} </span>
                    </p>
                    <span className='time'>
                        {currencyRates &&
                            <div>
                                <p style={{ fontSize: '10px' }}>Market rates collected - {currencyRates.date}, {new Date(currencyRates.timestamp).toLocaleTimeString()}</p>
                            </div>
                        }
                    </span>
                </div>

                <footer style={{ color: 'gray', display: 'flex', justifyContent: 'space-between' }}>
                    <span> Good project to understand OOP </span>
                    <span style={{ fontSize: '8px' }}>
                        Developed by <a href='https://github.com/ibrahimk4111' target='_blank' rel='noreferrer'>Md. Ibrahim Khalil</a>
                    </span>
                </footer>
            </div>
        </>
    )
}

export default ConverterForm

