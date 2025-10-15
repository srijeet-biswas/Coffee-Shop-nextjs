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

import { getLocalitiesByCity } from "@/src/app/_libs/services/cities.service";

type CityPageProps = {
  params: {
    city: string;
  };
};

export default async function CityPage({ params }: CityPageProps) {
  const city = decodeURIComponent(params.city);
  const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
  const localities = getLocalitiesByCity(city);

  return (
    <>
      <main className="container mx-auto py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem key="home">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator key="sep" />
            <BreadcrumbItem key="city">
              <BreadcrumbPage>{capitalizedCity}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="mt-6 text-3xl font-bold">
          Popular Localities in {capitalizedCity}
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {localities.map((locality) => (
            <Link href={locality.path as Route} key={locality.name} passHref>
              <Card className="cursor-pointer transition-transform duration-200 hover:scale-105">
                <CardHeader>
                  <CardTitle>{locality.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}