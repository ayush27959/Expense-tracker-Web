import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="flex text-white h-screen bg-black items-center justify-center">
      <Spin description="Loading..." size="large" />
    </div>
  );
};

export default Loader;
