import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const CountryDetails = () => {
    const [countryData, setCountryData] = useState(null)
    const contrudata = useParams()
    useEffect(() => {
        feathdata()
    }, [countryData])
    const feathdata = async () => {
        try {
            await axios.get(`https://restcountries.com/v3.1/name/${contrudata.name}?fullText=true`).then((res) => {
                const data = res.data[0]
                console.log(data)
                setCountryData({
                    name: data.name.common,
                    nativeName: Object.values(data.name.nativeName)[0].common,
                    population: data.population,
                    region: data.region,
                    subregion: data.subregion,
                    capital: data.capital,
                    flag: data.flags.svg,
                    tld: data.tld,
                    languages: Object.values(data.languages).join(', '),
                    currencies: Object.values(data.currencies)
                        .map((currency) => currency.name)
                        .join(', '),

                    borders: []

                })
                if (!data.borders) {
                    data.borders = []
                }

                Promise.all(data.borders.map((border) => {
                    return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                        .then((res) => res.json())
                        .then(([borderCountry]) => borderCountry.name.common)
                })).then((borders) => {
                    setCountryData((prevState) => ({ ...prevState, borders }))
                })
            })
        } catch (error) {

        }
    }


    return countryData === null ? (
        'loading...'
    ) : (
        <main class="p-6">
            <div class="country-details-container max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white">
                <Link to="/">
                    <span class="back-button flex items-center text-blue-500 hover:text-blue-700 cursor-pointer mb-4" >
                        <i class="fa-solid fa-arrow-left"></i>&nbsp; Back
                    </span>
                </Link>
                <div class="country-details flex flex-col md:flex-row">
                    <img src={countryData.flag} alt={`${countryData.name} flag`} class="w-full md:w-1/2 h-auto object-cover" />
                    <div class="details-text-container p-6 flex-1">
                        <h1 class="text-2xl font-bold mb-4">{countryData.name}</h1>
                        <div class="details-text space-y-2">
                            <p>
                                <b>Native Name: </b><span>{countryData.nativeName}</span>
                            </p>
                            <p>
                                <b>Population: </b><span>{countryData.population.toLocaleString('en-IN')}</span>
                            </p>
                            <p>
                                <b>Region: </b><span>{countryData.region}</span>
                            </p>
                            <p>
                                <b>Sub Region: </b><span>{countryData.subregion}</span>
                            </p>
                            <p>
                                <b>Capital: </b><span>{countryData.capital.join(', ')}</span>
                            </p>
                            <p>
                                <b>Top Level Domain: </b><span>{countryData.tld}</span>
                            </p>
                            <p>
                                <b>Currencies: </b><span>{countryData.currencies}</span>
                            </p>
                            <p>
                                <b>Languages: </b><span>{countryData.languages}</span>
                            </p>
                        </div>
                        {countryData.borders.length !== 0 && <div className="border-countries">
                            <b>Border Countries: </b>&nbsp;
                            {
                                countryData.borders.map((border) => <Link key={border} to={`/country/${border}`}>{border}</Link>)
                            }
                        </div>}
                    </div>
                </div>
            </div>
        </main>

    )
}

export default CountryDetails