import React, { useContext } from 'react'
import '../Styles/converterForm.css'
import { UserContext } from './ContextApi'
import { useState } from 'react'

const ConverterForm = () => {

    const { countries, fromCurrency, setfromCurrency, fetchRates, currencyRates, toCurrency, settoCurrency } = useContext(UserContext)

    const [amount, setAmount] = useState(1)

    const onchangeFromHandler = (e) => {
        setfromCurrency(e.target.value)
        fetchRates(e.target.value)
    }

    // currencyRates && console.log()
    const toggleHandler = () => {
        setfromCurrency(toCurrency)
        settoCurrency(fromCurrency)
        fetchRates(toCurrency)
    }

    currencyRates && console.log(currencyRates.rates)
    return (
        <>
            <div className='mainBox'>
                <div>
                    <form className='form'>

                        {/* input field */}
                        <div className='formDivs'>
                            <input className='amount' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>

                        {/* From currency fields */}
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

                        {/* Toggler */}
                        <div className='toggle formDivs' onClick={toggleHandler}>
                            <span style={{ color: 'white' }}>||</span>
                        </div>

                        {/* To currency fields */}
                        <div className='formDivs'>
                            <p style={{ marginTop: '2px' }}>TO CURRENCY :</p>
                            {currencyRates ?
                                <select className='select-to' value={toCurrency} onChange={(e) => settoCurrency(e.target.value)}>
                                    {
                                        countries.map((country, index) => (
                                            <option key={index} value={Object.keys(country.currencies)[0]}>
                                                {Object.keys(country.currencies)[0]} - {country.name.common}
                                            </option>
                                        ))
                                    }
                                </select> :
                                <select className='select-to' defaultValue=" Loading ">
                                    <option defaultValue=" Loading ">
                                        Loading
                                    </option>
                                </select>
                            }
                        </div>
                    </form>
                </div>

                {/* calculated result part */}
                <div className='result'>
                    <p className='totalAmount'>
                        <span>Converted amount is = </span>
                        {currencyRates ?
                            <span style={{ fontWeight: 'bold' }}>
                                {currencyRates.rates[`${toCurrency}`] * amount}
                            </span> :
                            <span style={{ fontWeight: 'bold' }}></span>
                        }
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
                    <span> Thank you for here. </span>
                    <span style={{ fontSize: '8px' }}>
                        Developed by <a href='https://github.com/ibrahimk4111' target='_blank' rel='noreferrer'>Md. Ibrahim Khalil</a>
                    </span>
                </footer>
            </div>
        </>
    )
}

export default ConverterForm

