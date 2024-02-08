import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import JourneyCard from "@/components/JourneyCard";
import Link from "next/link";
import { Journey } from "@/types/journey";
import Image from "next/image";
import HeaderPicture from "../assets/images/Header.png";
import SearchBar from "@/components/SearchBar";
import { formattedDate } from "@/utils/formatDates";
import { GoArrowRight } from "react-icons/go";
const SEARCH_JOURNEY = gql`
query Journeys($start: String, $arrival: String, $date: DateTime, $seats: Float) {
  getJourneys(start: $start, arrival: $arrival, date: $date, seats: $seats) {
 id
    startingPoint
    arrivalPoint
    description
    startDate
    endDate
    availableSeats
    price
  }
}
`

export default function SearchPage() {
    const [journeys, setJourneys] = useState<Journey[]>([]);
    const router = useRouter();
    const startingPoint = typeof router.query.start === 'string' ? router.query.start.trim() : null;
    const endingPoint = typeof router.query.end === 'string' ? router.query.end.trim() : null;


    const { loading, error } = useQuery(SEARCH_JOURNEY, {
        variables: {
            "start": startingPoint,
            "arrival": endingPoint,
            "date": router.query.date,
            "seats": typeof router.query.seats === 'string' ? parseInt(router.query.seats) : undefined
        },
        onCompleted: (data => {
            setJourneys(data.getJourneys)

        })
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :-(</p>;



    const sortedByPrice = [...journeys].sort((a, b) => a.price - b.price);


    const sortedByDuration = [...journeys].sort((a, b) => {
        const durationA = new Date(a.endDate).getTime() - new Date(a.startDate).getTime();
        const durationB = new Date(b.endDate).getTime() - new Date(b.startDate).getTime();
        return durationA - durationB;
    });

    return (
        <>
            <div className="absolute top-0 left-0 right-0  h-[50vh]" id="headerSearchPage">
                <Image
                    src={HeaderPicture}
                    alt="Header Image"
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 w-full h-full -z-50 cover opacity-50"
                />
                <div className="mt-36 lg:mt-52" >
                    <SearchBar startingPoint={startingPoint} endingPoint={endingPoint} dateStart={router.query.date} availableSeats={router.query.seats} />
                </div>


            </div>
            {router.query.start && router.query.end && router.query.date && router.query.seats ?
                <div id="contentSearchPage" className="flex flex-col lg:flex-row  justify-center gap-10 pt-[45vh]">
                    <div id="filter" className="lg:text-left text-center lg:w-[20vw] w-screen">
                        <h4 className="text-xl text-default font-montserrat font-bold"> Trier par</h4>
                        <div className="flex flex-col lg:text-left text-center lg:items-start items-center justify-start pt-8 gap-3">
                            <button onClick={() => setJourneys(sortedByPrice)}>Prix le plus bas</button>
                            <button onClick={() => setJourneys(sortedByDuration)}>Trajet le plus court</button>

                        </div>

                    </div>
                    <div className="flex flex-col items-center lg:items-start gap-2 w-100 pt-10">
                        <div className="pb-10">
                            {router.query.date && (
                                <h4 className="pb-7 text-xl text-default font-montserrat font-medium"> Le {formattedDate(router.query.date)}</h4>
                            )}

                            <div className="flex flex-row flex-wrap items-center text-sm text-gray-400 gap-1">
                                <p> {router.query?.start} </p> <GoArrowRight /> <p> {router.query?.end} : </p>
                                <p>{journeys?.length} trajet{journeys.length > 1 ? "s" : ""} disponible{journeys.length > 1 ? "s" : ""}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-7">
                            {[...journeys].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).map((journey) => (
                                <Link href={`/journeys/${journey.id}`} key={journey.id}>
                                    <JourneyCard journey={journey} />
                                </Link>
                            ))}

                        </div>

                    </div>

                </div>
                : <div className="h-[80vh]"></div>}
        </>
    );
};
