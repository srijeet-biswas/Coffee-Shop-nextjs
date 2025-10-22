import { type Dispatch, type SetStateAction, useState } from "react";

import { getRestaurantsByLocality } from "@/src/app/_libs/services/restaurants.service";

declare type RestaurantsLocalityProp = {
  city: string;
  locality?: string;
  pageSize?: number;
};

declare type RestaurantsReturnType = {
  restaurants: any;
  setRestaurants: Dispatch<SetStateAction<any>>;
  fetchRestaurants: (props?: RestaurantsLocalityProp) => Promise<any>;
};

export const useRestaurants = (): RestaurantsReturnType => {
  const [restaurants, setRestaurants] = useState<any>([]);

  const fetchRestaurants = async (props?: RestaurantsLocalityProp) => {
    const restaurantsData = await getRestaurantsByLocality(
      props || { city: "bengaluru", locality: "koramangala" },
    );
    return restaurantsData;
  };

  return { restaurants, setRestaurants, fetchRestaurants };
};
