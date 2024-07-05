import { IoMdArrowRoundBack } from "react-icons/io";
import token from "../../../public/token.gif";
import PrecioCocay from "./PrecioCocay";
import SelectCurrency from "./SelectCurrency";
import { useState } from "react";
import CurrencyBalance from "./CurrencyBalance";
import SmartOrToken from "./SmartOrToken";
import Amount from "./Amount";

// eslint-disable-next-line react/prop-types
const BuyCocay = ({ setBuyCocay }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");

  return (
    <div className="relative bg-back w-full max-w-[700px] my-8 rounded-[18px] border-2 border-primary h-fit pb-12">
      <button
        onClick={() => {
          //Vuelve para atras
          setBuyCocay(false);
        }}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>
      <div className="mt-12 w-full flex flex-col items-center gap-[20px]">
        <img
          src={token}
          alt="Token Gif"
          className="object-cover max-w-[100px]"
        />
        <div className="w-full flex flex-col items-center gap-[15px]">
          <button className="px-4 py-2 border border-primary rounded-[18px]">
            Codigo de referido
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-[18px]">
            Until sold out
          </button>
          <p>USDT Raised: 999/3,000,000</p>
          {/* Precio cocay */}
          <PrecioCocay />
          {/* Con que moneda queres pagar? */}
          <SelectCurrency
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
          {/* Cuanto tiene de esa moneda? */}
          <CurrencyBalance selectedCurrency={selectedCurrency} />
          <SmartOrToken />
          <Amount />
        </div>
      </div>
    </div>
  );
};

export default BuyCocay;
