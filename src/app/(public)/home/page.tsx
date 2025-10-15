import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import type { Route } from "next";

import { getAllCities, getLocalitiesByCity } from "@/src/app/_libs/services/cities.service";

export default function HomePage() {
  const currentCityName = "Bengaluru";

  const allCities = getAllCities();
  const popularLocalities = getLocalitiesByCity(currentCityName);

  return (
    <div className="relative">
      <main className="w-full">
        <section
          className="relative flex h-[60dvh] flex-col items-center justify-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white">zomato</h1>
            <p className="mt-4 text-2xl text-white">
              Discover the best food & drinks in {currentCityName}
            </p>
          </div>
        </section>

        <div className="container mx-auto">

          <section className="mx-auto mt-12 w-full max-w-6xl">
            <h2 className="text-3xl font-semibold">
              Popular localities in and around Bengaluru
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {popularLocalities.map((locality) => (

                <Link href={locality.path as Route} key={locality.name} passHref>
                  <Card className="cursor-pointer transition-transform duration-200 hover:scale-105">
                    <CardHeader>
                      <CardTitle>{locality.name}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>


          <section className="mx-auto my-12 w-full max-w-6xl">
            <h2 className="text-3xl font-semibold">
              Explore options near me
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {allCities.map((city) => (
                <Link href={city.path as Route} key={city.name} passHref>
                  <Card className="cursor-pointer transition-transform duration-200 hover:scale-105">
                    <CardHeader>
                      <CardTitle>{city.name}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}