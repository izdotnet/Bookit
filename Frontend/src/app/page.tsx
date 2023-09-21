import ApartmentsCatalogue from "@/components/ApartmentsCatalogue";
import ApartmentsNoResults from "@/components/ApartmentsNoResults";
import Card from "@/components/Card";
import Hero from "@/components/Hero";
import { Apartment, FilterProps } from "@/types";
import { getApartments } from "@/utils/Fetchers/Apartments";
import { getNextDay, getToday } from "@/utils/helpers";
import Link from "next/link";

/**
 * Renders the homepage for an apartment booking platform.
 * Fetches apartment data based on search parameters and displays the results.
 * If there are no results, displays a message.
 *
 * @param _ Unused parameter
 * @param searchParams Object containing search parameters for apartments
 * @returns Rendered components for the homepage
 */
export default async function Home({
  _,
  searchParams,
}: {
  _: never;
  searchParams: FilterProps;
}) {
  const startDate = searchParams.startDate ?? getToday();
  const endDate = searchParams.endDate ?? getNextDay();
  const city = searchParams.city ?? "Tel Aviv";

  let apartments: Apartment[] = [];

  try {
    apartments = await getApartments(startDate, endDate, city);
  } catch (error) {
    console.error(error);
  }

  const isDataEmpty = !Array.isArray(apartments) || apartments.length === 0;

  return (
    <main className="overflow-none">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width">
        <ApartmentsCatalogue />
        {!isDataEmpty ? (
          <section>
            <div className="home__apartments-wrapper">
              {apartments?.map((apartment) => (
                <Card key={apartment.id} data={apartment} />
              ))}
            </div>
          </section>
        ) : (
          <ApartmentsNoResults />
        )}
      </div>
    </main>
  );
}
