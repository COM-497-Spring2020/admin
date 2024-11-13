import ApprovedOrDelete from "@/app/components/tutor/ApprovedOrDelete";
import Percentage from "@/app/components/tutor/Percentage";
import convertScheduleFormat from "@/app/services/convertScheduleFormat";
import Parse from "html-react-parser";
import { CircleCheckBig, MapPin, Video } from "lucide-react";
import moment from "moment";
import Image from "next/image";

const Tutors = ({ tutor, availability }) => {
  const filterByUser = convertScheduleFormat(
    availability.filter((el) => el.user === tutor.user)
  );

  return (
    <div className="bg-white rounded shadow-sm p-5">
      <div className="flex flex-wrap  md:flex-nowrap items-end gap-y-5 gap-x-10">
        <div className="w-full md:w-3/12 space-y-5">
          <Image
            src={tutor?.avatar?.url}
            alt=""
            className="size-full rounded object-cover"
            width={500}
            height={500}
          />
          <div className="flex items-center justify-between text-gray-700">
            <p>Requested</p>
            <p>{moment(tutor.createdAt).format("LL")}</p>
          </div>
          <ApprovedOrDelete tutor={tutor} />
          <Percentage tutor={tutor} />
        </div>
        <div className="w-full md:w-9/12">
          <div className="flex gap-x-5 flex-wrap sm:flex-nowrap justify-between">
            <div>
              <div className="flex items-center gap-x-2">
                <h4 className="text-lg font-semibold">{tutor.name}</h4>
                <CircleCheckBig className="size-5 text-green-500" />
              </div>
              <div className="flex items-center gap-x-5">
                <div className="flex items-center gap-x-1 text-gray-500">
                  <MapPin />
                  <span>{tutor.location?.address}</span>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-0 w-full sm:w-auto rounded sm:rounded-none py-2 px-4 sm:py-0 sm:px-0 flex sm:block justify-between bg-slate-100 sm:bg-white">
              <p className="text-gray-500">Starting from:</p>
              <p className="font-semibold text-secondary text-lg">
                ${tutor.hourlyRate}.00/hr
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-5">
            {tutor.grades.map((subject) => (
              <small
                key={subject._id}
                className="bg-slate-100 rounded px-3 py-1 font-bold text-gray-500"
              >
                {subject.item}
              </small>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-5">
            {filterByUser.map((avil, index) => {
              return (
                <small
                  key={index}
                  className="bg-green-50 rounded px-1 md:px-3 py-1 border uppercase"
                >
                  {avil.day.slice(0, 3)}
                </small>
              );
            })}
          </div>
          <div className="mt-5 grid grid-cols-2 xl:grid-cols-4 gap-3 text-nowrap">
            {tutor.availableOn.map((method, index) => (
              <div
                className="inline-flex items-center justify-center gap-x-3 sm:gap-x-5 bg-slate-50 py-2 px-3 w-full rounded"
                key={index}
              >
                {method === "Online" && <Video className="text-red-400" />}
                {method === "In-Person" && <MapPin className="text-red-400" />}
                <p>{method}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 text-xl flex items-center gap-x-2">
            <p>Miles coverage </p>
            {tutor.miles}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-5">
            {tutor.subjects.map((subject) => (
              <small
                key={subject._id}
                className="bg-slate-100 rounded px-3 py-1 font-bold text-gray-500"
              >
                {subject.item}
              </small>
            ))}
          </div>
          <p className="mt-5 text-gray-600 text-lg">
            {tutor.bio && Parse(tutor.bio)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tutors;
