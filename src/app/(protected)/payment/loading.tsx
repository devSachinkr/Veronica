import { Loader } from "@/components/global/loader";

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Loader loading={true} />
    </div>
  );
};

export default loading;
