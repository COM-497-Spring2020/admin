"use client";

import Input from "@/app/components/common/input/Input";
import Add from "@/app/components/grades&subjects/Add";
import Lists from "@/app/components/grades&subjects/Lists";
import { useState } from "react";

const Index = ({ subjects, title }) => {
  const [search, setSearch] = useState("");

  const performSearch = subjects.filter((res) =>
    res.item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-x-5">
        <p className="text-2xl text-nowrap">
          {performSearch.length} {title}
        </p>
        <div className="w-full sm:w-4/12 ml-auto">
          <Input
            placeholder={"Search with name..."}
            changeHandler={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-5 sm:gap-10">
        <div className="w-full sm:w-4/12">
          <Add title={title} />
        </div>
        <div className="w-full sm:w-8/12">
          <Lists subjects={performSearch} title={title} />
        </div>
      </div>
    </div>
  );
};

export default Index;
