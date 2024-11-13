const index = async () => {
  const tutorResponse = await fetch(`${process.env.BASE_URL}/api/tutors`, {
    cache: "no-store",
  });
  const tutors = await tutorResponse.json();

  const studentResponse = await fetch(`${process.env.BASE_URL}/api/student`, {
    cache: "no-store",
  });
  const students = await studentResponse.json();

  return (
    <>
      <div>
        <p className="text-xl">Hi Admin,</p>
        <p className="text-4xl">Welcome Back!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 mt-5 sm:mt-10">
        <div className="bg-white rounded py-10 px-5 text-center shadow-sm">
          <p className="opacity-80">Total Tutors</p>
          <p className="text-2xl mt-5">{tutors.length}</p>
        </div>
        <div className="bg-white rounded py-10 px-5 text-center shadow-sm">
          <p className="opacity-80">Total Students</p>
          <p className="text-2xl mt-5">{students.length}</p>
        </div>
      </div>
    </>
  );
};

export default index;
