import usdt from "../../../public/icons/usdt.svg";
import card from "/icons/card.png";
import { useAddress} from "@thirdweb-dev/react";
// eslint-disable-next-line react/prop-types
const SelectCurrency = ({ cantidad,selectedCurrency, setSelectedCurrency }) => {

  const wallet = useAddress();
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
            if(currency.name == "Tarjeta"){
              console.log("a")
              console.log(cantidad)
              window.location.href = `https://global.transak.com/?apiKey=0f4beee9-e541-442c-b6bc-bc41a442dfc3&cryptoCurrencyCode=USDT&fiatAmount=${cantidad}&fiatCurrency=USD&paymentMethod=credit_debit_card&redirectURL=https%3A%2F%2Fportfolio.metamask.io%2Fbuy%2Forder-process%2Ftransak-b&productsAvailed=BUY&walletAddress=${wallet}&partnerOrderId=null&walletRedirection=true&network=bsc`
            }
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
