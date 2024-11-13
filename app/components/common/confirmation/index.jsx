import Button from "@/app/components/common/button/Button";

const index = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <p className="text-2xl">Have you sent the money?</p>
      <small className="text-gray-500">{`Please sent the money before clicking "Yes"`}</small>
      <div className="flex items-center justify-between gap-x-5 mt-20">
        <Button
          title={"No"}
          className={"bg-slate-200 hover:bg-slate-300 !text-gray-700"}
          onClick={() => setIsOpen(!isOpen)}
        />
        <Button title={"Yes"} onClick={() => setIsOpen(!isOpen)} />
      </div>
    </>
  );
};

export default index;
