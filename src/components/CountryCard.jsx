import React from 'react'
import { useNavigate } from 'react-router-dom'

const CountryCard = ({ name, flag, population, region, capital }) => {
    const navigate = useNavigate()
    const contriesHandle = () => {
        navigate(`/country/${name}`)
    }
    
    return (
        <>

            <div className="w-full  md:w-1/3 px-2 mb-4" onClick={contriesHandle}>
                <div className="flex cursor-pointer max-w-2xl items-center rounded-md border">
                    <div className="h-full w-full md:h-[200px] md:w-[300px]">
                        <img src={flag} alt="Laptop" className="h-full w-full rounded-md object-cover" />
                    </div>
                    <div>
                        <div className="p-4">
                            <h1 className="inline-flex items-center text-lg font-semibold">
                                {name}

                            </h1>
                            <p className="mt-3 text-sm text-gray-600">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
                                debitis?
                            </p>
                            <div className="mt-4">
                                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                                    <b>Population: </b>
                                    {population.toLocaleString('en-IN')}
                                </span>
                                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                                    <b>Region: </b>{region}
                                </span>
                                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                                    <b>Capital: </b>{capital}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>





        </>
    )
}

export default CountryCard