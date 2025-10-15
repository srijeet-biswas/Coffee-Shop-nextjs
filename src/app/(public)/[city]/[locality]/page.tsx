import { getRestaurantsByLocality } from "@/app/_libs/services/restaurants.service";
import RestaurantCard from "./_components/restaurant-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Mock data for restaurants
/*const mockRestaurants = [
  {
    name: "Toit",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=300&fit=crop",
    cuisine: "Italian, Continental",
    rating: 4.5,
  },
  {
    name: "The Black Pearl",
    imageUrl: "https://images.unsplash.com/photo-1590846406792-04422bb7c1b2?w=500&h=300&fit=crop",
    cuisine: "North Indian, BBQ",
    rating: 4.2,
  },
  {
    name: "Truffles",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
    cuisine: "American, Burger",
    rating: 4.8,
  },
  {
    name: "The Hole in the Wall Cafe",
    imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&h=300&fit=crop",
    cuisine: "Cafe, American",
    rating: 4.6,
  },
];*/

type LocalityPageProps = {
  params: { city: string; locality: string };
};

export default function LocalityPage({ params }: LocalityPageProps) {
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
}