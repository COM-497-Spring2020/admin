import Header from "@/app/components/common/header";
import GradesSubjects from "@/app/components/grades&subjects";

const page = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/grade`, {
    cache: "no-store",
  });

  return (
    <Header>
      <GradesSubjects subjects={await response.json()} title="Grades" />
    </Header>
  );
};

export default page;
