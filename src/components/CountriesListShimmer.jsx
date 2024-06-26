import React from 'react'



export default function CountriesListShimmer() {

    return (
        <div className="countries-container">
            {Array.from({ length: 10 }).map((el, i) => {
                return <div key={i} className="h-[350px] bg-gray-200"></div>
            })}
        </div>
    )
}
