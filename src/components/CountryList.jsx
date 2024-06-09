import React, { useEffect, useState } from 'react'
import CountryCard from './CountryCard'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CountriesListShimmer from './CountriesListShimmer'

const CountryList = () => {
    const { searchData } = useSelector((store) => store.app)
    console.log(searchData)
    const [countriesData, setCountriseData] = useState([])


    const fetchData = async () => {
        try {
            await axios.get("https://restcountries.com/v3.1/all").then((res) => {
                console.log(res)
                setCountriseData(res.data)
            })
        } catch (error) {
            throw error
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const FilterData = countriesData?.filter((item) => {
        if (!searchData) return true;
        return item?.name?.common?.toLowerCase()?.includes(searchData?.toLowerCase());
    });

    if (!FilterData.length) {
        return <CountriesListShimmer />
    }
    return (

        <div className="flex flex-wrap mx-2">
            {
                FilterData.map((country) => {
                    return (
                        <>
                            <CountryCard
                                key={country.name.common}
                                name={country.name.common}
                                flag={country.flags.svg}
                                population={country.population}
                                region={country.region}
                                capital={country.capital?.[0]} />
                        </>
                    )
                })
            }

        </div >


    )
}

export default CountryList