import { IoMdArrowRoundBack } from "react-icons/io";
import usdt from "../public/icons/usdt.svg";
import token from "../public/token.gif";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Donar = ({ setDonar }) => {
  //Metodo de pago usdt o credit?
  const [metodoPago, setMetodoPago] = useState("usdt");

  return (
    <div className="w-full py-8 bg-black bg-opacity-80 border border-primary flex flex-col gap-[10px] items-center rounded-[18px] relative p-2 sm:p-4">
      <button
        onClick={() => {
          setDonar(false);
        }}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>

      <div className="mt-8 flex flex-col gap-[40px] items-center justify-center">
        <h2 className="text-2xl md:text-4xl text-center">
          ¿Cómo quiere donar y cuánto?
        </h2>
        {/* USDT o Credit card? */}
        <div className="flex flex-wrap gap-[20px] justify-center">
          <button
            onClick={() => setMetodoPago("usdt")}
            className={`bg-back font-semibold rounded-[18px] px-4 py-2 flex gap-[10px] items-center text-lg border-2 ${
              metodoPago == "usdt" ? "border-primary" : "border-white"
            }`}
          >
            <img src={usdt} alt="usdt logo" className="w-[40px] object-cover" />
            <p>USDT</p>
          </button>
          <button
            onClick={() => setMetodoPago("credit")}
            className={`bg-back font-semibold rounded-[18px] px-4 py-2 flex gap-[10px] items-center text-lg border-2 ${
              metodoPago == "credit" ? "border-primary" : "border-white"
            }`}
          >
            <BsFillCreditCard2FrontFill className="text-4xl text-primary" />
            <p>Targeta de crédito</p>
          </button>
        </div>
        {/* USDT equivalente a ? */}
        <div className="flex flex-col sm:flex-row gap-[20px] items-center justify-center">
          <div className="bg-back px-4 py-2 rounded-[18px]">
            <div className="flex gap-[10px] items-center ">
              <img
                src={usdt}
                alt="usdt logo"
                className="w-[40px] object-cover"
              />
              <p>USDT</p>
            </div>
            <input
              type="number"
              placeholder="0.00"
              className="bg-[#5e5e5e] font-bold text-xl placeholder:text-white px-4 py-2 rounded-[18px] w-full mt-2"
            />
          </div>
          <div className="rounded-full w-[50px] h-[50px] bg-back text-3xl flex justify-center items-center">
            {" "}
            ={" "}
          </div>
          <div className="bg-back px-4 py-2 rounded-[18px]">
            <div className="flex gap-[10px] items-center ">
              <img
                src={token}
                alt="cocay token"
                className="w-[40px] object-cover"
              />
              <p>Cocay</p>
            </div>
            {/* Equivalente a Y,YY cocays */}
            <input
              type="number"
              placeholder="0.00"
              className="bg-[#5e5e5e] font-bold text-xl placeholder:text-white px-4 py-2 rounded-[18px] w-full mt-2"
            />
          </div>
        </div>
        {/* Boton de donar */}
        <button className="bg-primary text-white font-semibold rounded-[18px] px-4 py-4 flex gap-[10px] items-center justify-center text-2xl min-w-[200px]">
          Donar
        </button>
      </div>
    </div>
  );
};

export default Donar;
