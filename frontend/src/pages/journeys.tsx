import JourneyCard from '@/components/JourneyCard';
import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client';

const GET_ALL_JOURNEYS = gql`
    query Journeys {
        getJourneys {
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
export const MyJourneys = () => {
const  [journeys, setJourneys] = useState([]);
const { loading, error, data } = useQuery(GET_ALL_JOURNEYS, {
    onCompleted: (data) => {
      setJourneys(data.getJourneys);
    }
  });
  return (
    <div className="my-journeys">
    <h2 className='flex justify-center pt-10 pb-5 text-xl font-bold font-montserrat'>Mes trajets publiés</h2>
    <div className="flex justify-evenly max-w-screen-lg  mx-auto w-full flex-wrap ">
        { journeys.map((journey)=><JourneyCard key={journey.id} journey={ journey} />)}
    </div>
    </div>
  )
}

export default MyJourneys;