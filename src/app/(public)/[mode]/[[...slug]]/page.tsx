import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import type { Route } from "next";

// NOTE: SubHeader is now provided by the parent layout, so it is REMOVED from here.
// import SubHeader from "@/src/components/layouts/SubHeader"; 

import { getLocalitiesByCity } from "@/src/app/_libs/services/cities.service";
import { getRestaurantsByLocality } from "@/src/app/_libs/services/restaurants.service";
import RestaurantCard from "@/components/ui/restaurant-card";

type ModeContentPageProps = {
  params: {
    // Mode is the first mandatory segment (e.g., 'delivery' or 'dining')
    mode: 'delivery' | 'dining' | string; 
    // Slug is the optional catch-all segment (e.g., ['pune'] or ['pune', 'koregaon-park'])
    slug?: string[];
  };
};

export default async function ModeContentPage({ params }: ModeContentPageProps) {
  const { mode, slug = [] } = params;

  // 1. EXTRACT CITY AND LOCALITY
  // Example: slug = ['pune'] -> city = 'pune', locality = null
  // Example: slug = ['pune', 'koregaon-park'] -> city = 'pune', locality = 'koregaon-park'
  const city = slug[0] ? decodeURIComponent(slug[0]) : null;
  const locality = slug.length > 1 ? decodeURIComponent(slug[1]) : null;

  // Handle case where path is just /delivery or /dining (e.g., the root of the app)
  if (!city) {
     // You may want to redirect to a default city or a city selector page
     return <p className="text-center py-10">Please select a city to view the menu.</p>;
  }

  const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
  const capitalizedLocality = locality ? locality.charAt(0).toUpperCase() + locality.slice(1) : null;
  
  // 2. CONDITIONAL DATA FETCHING
  
  let restaurants;
  // If locality exists, fetch restaurants only for that locality
  if (locality) {
    restaurants = await getRestaurantsByLocality({ city, locality });
  } else {
    // If only city exists, fetch restaurants for the whole city (as per your original file logic)
    restaurants = await getRestaurantsByLocality({ city });
  }

  // Localities are only relevant if we are at the city level
  const localities = locality ? [] : getLocalitiesByCity(city);
  
  const currentTitle = capitalizedLocality 
    ? `${capitalizedLocality} in ${capitalizedCity}` 
    : capitalizedCity;
  
  const currentPathSegments = slug.join('/');

  return (
    <main className="container mx-auto py-8">
      
      {/* 3. BREADCRUMBS (UPDATED FOR NEW ROUTE STRUCTURE) */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem key="home">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator key="sep1" />
          
          <BreadcrumbItem key="city">
            {/* Link back to the City's default mode (which is delivery via the redirect) */}
            <BreadcrumbLink href={`/${city}` as Route}>{capitalizedCity}</BreadcrumbLink>
          </BreadcrumbItem>

          {locality && (
            <>
              <BreadcrumbSeparator key="sep2" />
              <BreadcrumbItem key="locality">
                <BreadcrumbPage>{capitalizedLocality}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="mt-6 text-3xl font-bold">
        {mode.charAt(0).toUpperCase() + mode.slice(1)} Restaurants in {currentTitle}
      </h1>

      {/* RESTAURANT LIST */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {restaurants.map((restaurant, index) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
        ))}
      </div>

      {/* LOCALITY LIST (Only shown on City-level pages) */}
      {!locality && localities.length > 0 && (
        <>
          <h1 className="mt-6 text-3xl font-bold">
            Popular Localities in {capitalizedCity}
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {localities.map((loc) => (
              <Link 
                // Link to the base locality path (e.g., /pune/koramangla) which will redirect to /delivery/pune/koramangla
                href={`/${currentPathSegments}/${loc.slug}` as Route} 
                key={loc.name} 
                passHref
              >
                <Card className="cursor-pointer transition-transform duration-200 hover:scale-105">
                  <CardHeader>
                    <CardTitle>{loc.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}