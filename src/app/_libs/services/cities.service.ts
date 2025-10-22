import citiesData from "@/src/data/cities.json";

export const getAllCities = () => {
    return citiesData;
}

export const getLocalitiesByCity = (cityName: string) => {
    const cityData = citiesData.find((city) => city.name.toLowerCase() == cityName.toLowerCase());
    return  cityData ? cityData.localities : [];
}