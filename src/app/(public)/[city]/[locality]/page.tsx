import { getRestaurantsByLocality } from "@/app/_libs/services/restaurants.service";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { NextPage } from "next";
import RestaurantCard from "./_components/restaurant-card";

type LocalityPageProps = {
  params: { city: string; locality: string };
}

const LocalityPage: NextPage<LocalityPageProps> = ({ params }) => {
  const city = decodeURIComponent(params.city);
  const locality = decodeURIComponent(params.locality);

  const restaurantList = getRestaurantsByLocality({city, locality});

  const capitalizedLocality = locality.charAt(0).toUpperCase() + locality.slice(1);
  const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);

  return (  
    <>
      <main className="container mx-auto py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem key="home">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator key="sep1" />
            <BreadcrumbItem key="city">
              <BreadcrumbLink href={`/${city}`}>{capitalizedCity}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator key="sep2" />
            <BreadcrumbItem key="locality">
              <BreadcrumbPage>{capitalizedLocality}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="mt-6 text-3xl font-bold">
          Delivery Restaurants in {capitalizedLocality}, {city}
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {restaurantList.map((restaurant, index) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index}/>
          ))}
        </div>
      </main>
    </>
  );
};

export default LocalityPage;