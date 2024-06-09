import { configureStore } from "@reduxjs/toolkit";
import countryreducer from '../features/CountrySlice'

const store = configureStore({
    reducer: {
        app: countryreducer
    },
})

export default store