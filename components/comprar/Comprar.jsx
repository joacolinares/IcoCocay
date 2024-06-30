import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import UserInfo from "./UserInfo";
import CocayInfo from "./CocayInfo";
import Camaras from "./Camaras";
import InfoDonaciones from "./InfoDonaciones";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Comprar = ({ setComprar }) => {
  //Si alguna vez compro, es true
  // eslint-disable-next-line no-unused-vars
  const [yaCompro, setYaCompro] = useState(false);

  return (
    <div className="w-full py-8 bg-black bg-opacity-80 border border-primary flex flex-col gap-[10px] items-center rounded-[18px] relative p-2 sm:p-4">
      <button
        onClick={() => {
          setComprar(false);
        }}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>
      {/* Info */}
      <div className="mt-8 w-full flex flex-col gap-[10px]">
        <div className="flex gap-[10px] items-center">
          <p>
            <span className="text-orange-500">Referido:</span> 12345678
          </p>
          <button>
            <FaCopy className="text-xl" />
          </button>
        </div>
        <div className="flex gap-[10px]">
          <button className="bg-white text-lg px-4 py-2 rounded-[18px] text-black">
            Mis Codigos
          </button>
          <button className="bg-white text-lg px-4 py-2 rounded-[18px] text-black">
            Buy Cocay
          </button>
        </div>
      </div>
      <div className="flex justify-between max-md:flex-wrap gap-[5px] w-full">
        <UserInfo />
        <CocayInfo yaCompro={yaCompro} />
      </div>
      <div className="flex justify-between max-md:flex-wrap gap-[5px] w-full">
        <InfoDonaciones />
        <Camaras />
      </div>
    </div>
  );
};

export default Comprar;
