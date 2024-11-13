import Lists from "@/app/components/student/Lists";

const Index = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/student`, {
    cache: "no-store",
  });

  const result = response.status === 200 ? await response.json() : [];

  return (
    <div className="space-y-5">
      <p className="text-2xl text-nowrap">{result.length} Students</p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {result?.map((student) => (
          <Lists student={student} key={student._id} />
        ))}
      </div>
    </div>
  );
};

export default Index;
