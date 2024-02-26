import Skeleton from "./Skeleton";


const StatCard = (props) => {
  if (props.Amount && props.Name) {
    return (
      <div className="flex flex-col items-center w-80 h-80 bg-[#6D696A] rounded-lg group cursor-pointer">
      <div className="">
        <div className="group duration-500 group-hover:blur-md hover:!blur-none group-hover:scale-[0.85] hover:!scale-100">
        <div className=" text-white text-center text-3xl font-semibold p-2 ">{props.Name}</div>
        </div>
        <div className="group">
        <div className="hidden group-hover:block mt-20 text-white text-center text-4xl font-bold">{props.Amount}</div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-80 h-80 bg-[#6D696A] rounded-lg">
      <Skeleton />
    </div>
  );
};

export default StatCard;
