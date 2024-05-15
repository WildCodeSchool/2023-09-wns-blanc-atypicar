import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Query {
    getUser {
      id
      role
      firstName
    }
  }
`;

export const SIGN_IN = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($createUserType: CreateUserType!) {
    signUp(createUserType: $createUserType) {
      id
      firstName
      lastName
      birthday
      email
    }
  }
`;

export const CREATE_JOURNEY = gql`
  mutation CreateJourney($JourneyData: CreateJourneyInputType!) {
    createJourney(JourneyData: $JourneyData) {
      id
      startingPoint
      arrivalPoint
      startDate
      endDate
      availableSeats
      price
      description
    }
  }
`;

export const FIND_JOURNEY_BY_DRIVER = gql`
  query FindJourneysByDriver($driverId: Float!) {
    findJourneysByDriver(driverId: $driverId) {
      id
      startingPoint
      arrivalPoint
      description
      startDate
      endDate
      availableSeats
      price
      driver {
        picture
        firstName
      }
    }
  }
`;

export const SEARCH_JOURNEY = gql`
  query Journeys(
    $start: String
    $arrival: String
    $date: DateTime
    $seats: Float
  ) {
    getJourneys(start: $start, arrival: $arrival, date: $date, seats: $seats) {
      id
      startingPoint
      arrivalPoint
      description
      startDate
      endDate
      availableSeats
      price
      driver {
        firstName
        picture
      }
    }
  }
`;

export const GET_JOURNEY_BY_ID = gql`
  query findJourney($findJourneyId: Float!) {
    findJourney(id: $findJourneyId) {
      id
      startingPoint
      arrivalPoint
      description
      startDate
      endDate
      availableSeats
      price
      driver {
        id
        firstName
        lastName
        picture
        description
      }
    }
  }
`;

export const DELETE_JOURNEY = gql`
  mutation deleteJourney($id: Float!) {
    deleteJourney(id: $id)
  }
`;

export const BOOK_JOURNEY = gql`
  mutation BookJourney(
    $bookJourneyId: Float!
    $reservationData: CreateReservationInputType!
  ) {
    bookJourney(id: $bookJourneyId, ReservationData: $reservationData) {
      id
      status
      creationDate
      seatNumber
    }
  }
`;

export const GET_ONE_JOURNEY = gql`
  query Query($findJourneyId: Float!) {
    findJourney(id: $findJourneyId) {
      arrivalPoint
      availableSeats
      description
      endDate
      id
      price
      startDate
      startingPoint
    }
  }
`;

export const UPDATE_JOURNEY = gql`
  mutation UpdateJourney($journeyData: UpdateJourneyInputType!) {
    updateJourney(JourneyData: $journeyData) {
      arrivalPoint
      availableSeats
      description
      endDate
      price
      startDate
      startingPoint
      id
    }
  }
`;

export const GET_ALL_RESERVATIONS = gql`
  query Reservations {
    getReservations {
      id
      status
      journey {
        id
        startingPoint
        arrivalPoint
        description
        startDate
        endDate
        availableSeats
        price
      }
      creationDate
      seatNumber
    }
  }
`;
