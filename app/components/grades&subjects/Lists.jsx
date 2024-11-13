'use client'

import ActionBtn from "@/app/components/grades&subjects/ActionBtn";

const Items = ({ subjects, title }) => {
  return (
    <div className="bg-white rounded shadow-sm p-5 overflow-x-auto">
      <table className="w-full text-nowrap">
        <thead>
          <tr>
            <th className="text-left border-b pb-5 px-5">{title}</th>
            <th className="text-left border-b pb-5 px-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((sub, index) => (
            <tr key={index}>
              <td className="text-left py-5 px-5">{sub.item}</td>
              <td className="text-left py-5 px-5">
                <ActionBtn title={title} sub={sub} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
