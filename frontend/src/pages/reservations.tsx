import React, { useContext, useState } from "react";
import ReservationCard from "@/components/ReservationCard";
import { useQuery } from "@apollo/client";
import { useEffect } from 'react';
import { IoIosHome, IoIosArrowForward } from "react-icons/io";
import { Reservation } from "@/types/reservation";
import { GET_RESERVATIONS_USER } from "@/graphql/client";
import { AuthContext } from "@/contexts/authContext";
import { useLazyQuery } from "../../node_modules/@apollo/client/index";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const { currentUser } = useContext(AuthContext);


  const [getReservationByUser, { loading, error, data }] = useLazyQuery(GET_RESERVATIONS_USER, {
    variables: {
      getReservationByUserId: currentUser?.id
    },
    onCompleted: (data) => {
      console.log(data);
      setReservations(data.getReservationByUser);
    },
  });


  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      getReservationByUser();
    }
  }, [currentUser])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div>
      <nav className="flex pt-16 justify-center" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-secondary dark:text-gray-400 dark:hover:text-white"
            >
              <IoIosHome className="text-lg mb-1" /> &nbsp; Accueil
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <IoIosArrowForward />
              <a
                href="/journeys"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-secondary md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                Mes trajets
              </a>
            </div>
          </li>
        </ol>
      </nav>

      <div className="pt-10">
        <h1
          data-testid="journey-title"
          className="flex justify-center pt-3 pb-8 text-xl font-bold font-montserrat"
        >
          Toutes mes réservations
        </h1>
        <div className="flex justify-evenly max-w-screen-lg  mx-auto w-full flex-wrap gap-8 ">
          {reservations && reservations.map((reservation: any) => (
            <ReservationCard key={reservation._id} reservation={reservation} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationsPage;