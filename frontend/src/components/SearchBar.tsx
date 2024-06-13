import { Input } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { CgShapeCircle } from "react-icons/cg";
import { IoCalendarOutline, IoPersonOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

type SearchBarProps = {
  startingPoint?: string;
  endingPoint?: string;
  dateStart?: string;
  availableSeats?: string;
};

export default function SearchBar({
  startingPoint,
  endingPoint,
  dateStart,
  availableSeats,
}: SearchBarProps) {
  const [start, setStart] = useState<string>(
    startingPoint ? startingPoint : ""
  );
  const [end, setEnd] = useState<string>(endingPoint ? endingPoint : "");
  const [date, setDate] = useState<string>(dateStart ? dateStart : "");
  const [seats, setSeats] = useState<string>(
    availableSeats ? availableSeats : ""
  );
  const [citySuggestionsStart, setCitySuggestionsStart] = useState<any[]>([]);
  const [citySuggestionsEnd, setCitySuggestionsEnd] = useState<any[]>([]);
  const router = useRouter();
  const SearchParams = useSearchParams();

  const getCitySuggestions = async (input: any) => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/autocomplete?q=${encodeURIComponent(input)}&key=pk.41ec9155202c25b414d024e5ca533173&limit=5&dedupe=1&countrycodes=FR`
      );
      if (!response.ok) {
      }
      const data = await response.json();
      setCitySuggestionsStart(data);
      return data;
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const getCitySuggestionsEnd = async (input: any) => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/autocomplete?q=${encodeURIComponent(input)}&key=pk.41ec9155202c25b414d024e5ca533173&limit=5&dedupe=1&countrycodes=FR`
      );
      if (!response.ok) {
        console.error("error");
      }
      const data = await response.json();

      setCitySuggestionsEnd(data);
      return data;
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const search = (event: FormEvent) => {
    event.preventDefault();
    let searchQuery = "";

    if (start) {
      searchQuery += `start=${encodeURIComponent(start)}&`;
    }
    if (end) {
      searchQuery += `end=${encodeURIComponent(end)}&`;
    }
    if (date) {
      searchQuery += `date=${encodeURIComponent(date)}&`;
    }
    if (seats) {
      searchQuery += `seats=${encodeURIComponent(seats)}&`;
    }

    if (searchQuery.endsWith("&")) {
      searchQuery = searchQuery.slice(0, -1);
    }

    router.push(`/search?${searchQuery}`);
  };
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center  mt-28 lg:mt-54   ">
      <div className="flex flex-col items-center justify-center gap-2">
        <Input
          placeholder="Départ"
          classNames={{
            input: "text-gray-400 ",
            inputWrapper:
              "bg-white rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl sm:after:content-[''] sm:after:absolute after:h-10 sm:after:right-0 sm:after:w-1 sm:after:bg-secondary sm:after:rounded ",
          }}
          className="sm:w-68 w-80 shadow-lg "
          radius="none"
          startContent={
            <CgShapeCircle className="text-2xl  pointer-events-none flex-shrink-0 text-secondary" />
          }
          value={start}
          onChange={(e) => {
            setStart(e.target.value);
            getCitySuggestions(e.target.value);
          }}
        />
        {citySuggestionsStart.length > 0 && (
          <div className="absolute top-52 md:top-80 bg-white border border-gray-200 rounded-b-xl sm:rounded-bl-none sm:rounded-r-xl w-68 w-80 z-10">
            {citySuggestionsStart.map((city, index) => (
              <div
                key={index}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setStart(city.address.name);
                  setCitySuggestionsStart([]);
                }}
              >
                {city.display_name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col ">
        <Input
          placeholder="Destination"
          classNames={{
            inputWrapper:
              "bg-white   sm:after:content-[''] sm:after:absolute after:h-10 sm:after:right-0 sm:after:w-1 sm:after:bg-secondary sm:after:rounded",
          }}
          className="sm:w-64 w-80 shadow-lg  "
          radius="none"
          startContent={
            <CgShapeCircle className="text-2xl  pointer-events-none flex-shrink-0 text-secondary" />
          }
          value={end}
          onChange={(e) => {
            setEnd(e.target.value);
            getCitySuggestionsEnd(e.target.value);
          }}
        />

        {citySuggestionsEnd.length > 0 && (
          <div className="absolute top-64 md:top-80 bg-white border border-gray-200 rounded-b-xl sm:rounded-bl-none sm:rounded-r-xl md:w-64 z-10">
            {citySuggestionsEnd.map((city, index) => (
              <div
                key={index}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setEnd(city.address.name);
                  setCitySuggestionsEnd([]);
                }}
              >
                {city.display_name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-row ">
        <Input
          type="datetime-local"
          classNames={{
            inputWrapper:
              "bg-white after:content-[''] after:absolute after:h-10 after:right-0 after:w-1 after:bg-secondary after:rounded",
          }}
          className="sm:w-52 w-48 shadow-lg "
          radius="none"
          startContent={
            <IoCalendarOutline className="text-2xl  pointer-events-none flex-shrink-0 text-secondary" />
          }
          min={new Date().toISOString().split("T")[0]}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          type="number"
          classNames={{
            inputWrapper: "bg-white    ",
          }}
          placeholder="Passager"
          className="sm:w-36 w-32 shadow-lg "
          radius="none"
          startContent={
            <IoPersonOutline className="text-2xl  pointer-events-none flex-shrink-0 text-secondary" />
          }
          min="0"
          max="20"
          step="1"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />
      </div>

      <button
        className="bg-success text-white  w-80 sm:w-32 shadow-lg  rounded-b-xl sm:rounded-bl-none sm:rounded-r-xl p-4"
        onClick={search}
      >
        Rechercher
      </button>
    </div>
  );
}
