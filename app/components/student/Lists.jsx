import DeleteStudent from "@/app/components/student/Delete";
import { CircleCheckBig } from "lucide-react";
import moment from "moment";
import Image from "next/image";

const Tutors = ({ student }) => {
  return (
    <div className="bg-white rounded shadow-sm p-5 flex flex-wrap lg:flex-nowrap gap-5">
      <div className="w-full lg:w-5/12 space-y-5">
        <Image
          src={student?.avatar?.url}
          alt=""
          className="rounded-full size-40 object-cover mx-auto"
          width={500}
          height={500}
        />
      </div>
      <div className="w-full lg:w-7/12 space-y-5">
        <div className="flex items-center gap-x-2">
          <h4 className="text-lg font-semibold">{student.name}</h4>
          <CircleCheckBig className="size-5 text-green-500" />
        </div>
        <div>
          <p>Joined</p>
          <p>{moment(student.createdAt).format("LL")}</p>
        </div>
        <DeleteStudent student={student} />
      </div>
    </div>
  );
};

export default Tutors;
