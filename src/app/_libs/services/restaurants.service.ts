import restaurants from "@/src/data/restaurants.json";

export type RestaurantsLocalityProp = {
    city: string,
    locality: string
}

export const getRestaurantsByLocality = ({city, locality}: RestaurantsLocalityProp) => {
    const cityKey = decodeURIComponent(city);
    const localityKey = decodeURIComponent(locality);

    return restaurants.filter(
        (restaurant) =>
            restaurant.city_path.toLowerCase() === '/'+cityKey &&
            restaurant.locality_path.toLowerCase() === '/'+cityKey+'/'+localityKey
    );
}