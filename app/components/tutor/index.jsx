import Lists from "@/app/components/tutor/Lists";

const Index = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/tutors`, {
    cache: "no-store",
  });

  const availability = await fetch(`${process.env.BASE_URL}/api/availability`, {
    cache: "no-store",
  });

  const result = response.status === 200 ? await response.json() : [];

  const resultAvailability =
    availability.status === 200 ? await availability.json() : [];

  return (
    <div className="space-y-5">
      <p className="text-2xl text-nowrap">{result.length} tutors</p>
      <div className="space-y-5 sm:space-y-10">
        {result?.map((tutor) => (
          <Lists
            tutor={tutor}
            key={tutor._id}
            availability={resultAvailability}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
