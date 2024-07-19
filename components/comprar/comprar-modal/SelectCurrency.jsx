import usdt from "../../../public/icons/usdt.svg";
import card from "/icons/card.png";

// eslint-disable-next-line react/prop-types
const SelectCurrency = ({ selectedCurrency, setSelectedCurrency }) => {
  return (
    <div className="flex flex-wrap gap-[20px] justify-center">
      {currencies.map((currency) => (
        <button
          key={currency.name}
          className={`bg-[#262626] px-4 py-2 min-w-[120px] border rounded-[18px] ${
            selectedCurrency === currency.name
              ? "border-orange-500"
              : "border-white"
          } hover:scale-105 transition-all duration-300 flex gap-[10px] items-center justify-center`}
          onClick={() => {
            setSelectedCurrency(currency.name);
          }}
        >
          <span>
            <img src={currency.logo} alt="logo" className="max-w-[20px]" />
          </span>
          {currency.name}
        </button>
      ))}
    </div>
  );
};

export default SelectCurrency;

const currencies = [
  {
    name: "USDT",
    logo: usdt,
  },
  {
    name: "Tarjeta",
    logo: card,
  },
];
