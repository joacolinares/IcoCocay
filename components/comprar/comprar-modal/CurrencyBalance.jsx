// eslint-disable-next-line react/prop-types
const CurrencyBalance = ({ selectedCurrency }) => {
  return (
    <div className="flex items-center gap-[20px] w-full">
      <div className="h-[1px] w-full bg-primary" />
      <p className="text-sm text-nowrap font-bold">
        <span>USDT</span> Disponible: 0.001
      </p>
      <div className="h-[1px] w-full bg-primary" />
    </div>
  );
};

export default CurrencyBalance;
