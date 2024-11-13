import Image from "next/image";

const Items = ({ tutors, open, setOpen }) => {
  return (
    <div className="bg-white rounded shadow-sm p-5 overflow-x-auto">
      <table className="w-full text-nowrap">
        <thead>
          <tr>
            <th className="text-left border-b pb-5 px-5">Image</th>
            <th className="text-left border-b pb-5 px-5">Name</th>
            <th className="text-left border-b pb-5 px-5">Requested</th>
            <th className="text-left border-b pb-5 px-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {tutors.map((tutor, index) => (
            <tr key={index}>
              <td className="text-left border-b py-3 px-5">
                <Image src={tutor.tutorImage} alt="" className="rounded w-16" />
              </td>
              <td className="text-left border-b py-3 px-5">
                {tutor.tutorName}
              </td>
              <td className="text-left border-b py-3 px-5">
                ${tutor.requestMoney}
              </td>
              <td className="text-left border-b py-3 px-5">
                <p
                  className="text-red-400 cursor-pointer hover:text-red-500 transition font-medium underline"
                  onClick={() => setOpen(!open)}
                >
                  Pending
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
