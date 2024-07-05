const Amount = () => {
  return (
    <div className="flex gap-[30px] flex-wrap justify-center">
      <div className="flex flex-col gap-[20px] items-center">
        <div className="flex items-center gap-[20px] w-full">
          <div className="h-[1px] w-full bg-primary" />
          <p className="text-nowrap text-lg font-semibold">Amount in ETH</p>
          <div className="h-[1px] w-full bg-primary" />
        </div>
        <input
          placeholder={0.0}
          type="number"
          className="px-4 py-2 rounded-[18px] text-black max-sm:w-[90%]"
        />
        <button className="px-4 py-2 rounded-[18px] text-black bg-white max-sm:w-[90%]">
          Buy Now
        </button>
      </div>
      <div className="hidden md:block w-[1px] bg-white" />
      <div className="flex flex-col gap-[20px] items-center">
        <div className="flex items-center gap-[20px] w-full">
          <div className="h-[1px] w-full bg-primary" />
          <p className="text-nowrap text-lg font-semibold">Blend</p>
          <div className="h-[1px] w-full bg-primary" />
        </div>
        <input
          placeholder={0.0}
          type="number"
          className="px-4 py-2 rounded-[18px] text-black max-sm:w-[90%]"
        />
        <button className="px-4 py-2 rounded-[18px] text-black bg-white max-sm:w-[90%]">
          Buy with BNB
        </button>
      </div>
    </div>
  );
};

export default Amount;
