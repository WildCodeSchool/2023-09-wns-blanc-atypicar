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
  const router = useRouter();
  const SearchParams = useSearchParams();

  const search = (event: FormEvent) => {
    event.preventDefault();
    let searchQuery = "";
    let categoryId = ""; // Assuming categoryId is defined somewhere

    // Building the search query dynamically based on the filled values
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
      <Input
        placeholder="Départ"
        classNames={{
          input: "text-gray-400	",
          inputWrapper:
            "bg-white rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl sm:after:content-[''] sm:after:absolute after:h-10 sm:after:right-0 sm:after:w-1 sm:after:bg-secondary sm:after:rounded ",
        }}
        className="sm:w-68 w-80 shadow-lg "
        radius="none"
        startContent={
          <CgShapeCircle className="text-2xl  pointer-events-none flex-shrink-0 text-secondary" />
        }
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
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
        onChange={(e) => setEnd(e.target.value)}
      />
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
