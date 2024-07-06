import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import UserInfo from "./UserInfo";
import CocayInfo from "./CocayInfo";
import Camaras from "./Camaras";
import { useState } from "react";
import BuyCocay from "./comprar-modal/BuyCocay";
import DonationsOrTransactions from "./DonationsOrTransactions";
import PeopleTransactions from "./PeopleTransactions";
import GenerateCode from "./GenerateCode";
import Stake from "./Stake";

// eslint-disable-next-line react/prop-types
const Comprar = ({ setComprar }) => {
  //Si alguna vez compro, es true
  // eslint-disable-next-line no-unused-vars
  const [yaCompro, setYaCompro] = useState(true);
  //Para modal de comprar cocay
  const [buyCocay, setBuyCocay] = useState(false);
  //Para modal de avances (Camaras)
  const [modalAvances, setModalAvances] = useState(false);
  //Para modal de Generate Code
  const [modalGenerateCode, setModalGenerateCode] = useState(false);
  //Para modal de stake
  const [modalStake, setModalStake] = useState(false);

  return (
    <div className="w-full py-8 bg-black bg-opacity-80 border border-primary flex flex-col gap-[10px] items-center rounded-[18px] relative p-2 sm:p-4">
      <button
        onClick={() => {
          //Vuelve para atras
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
        {/* Botones agregados */}
        <div className="flex gap-[10px] flex-wrap justify-center">
          <button
            disabled={!yaCompro}
            className={`bg-white text-lg px-4 py-2 rounded-[18px] text-black disabled:opacity-50`}
          >
            Mis Codigos
          </button>
          {/* Este boton abre el modal para comprar cocays */}
          <button
            onClick={() => setBuyCocay(true)}
            className="bg-white text-lg px-4 py-2 rounded-[18px] text-black"
          >
            Buy Cocay
          </button>
          <button
            onClick={() => setModalAvances(true)}
            className={`bg-white text-lg px-4 py-2 rounded-[18px] text-black disabled:opacity-50`}
          >
            Avances
          </button>
          <button
            className={`bg-white text-lg px-4 py-2 rounded-[18px] text-black disabled:opacity-50`}
          >
            Whitepaper
          </button>
          <button
            className={`bg-white text-lg px-4 py-2 rounded-[18px] text-black disabled:opacity-50`}
          >
            Curriculum VITAE
          </button>
          <button
            className={`bg-white text-lg px-4 py-2 rounded-[18px] text-black disabled:opacity-50`}
          >
            Brochure Cocay
          </button>
          <button
            disabled={!yaCompro}
            className={`bg-white text-lg px-4 py-2 rounded-[18px] text-black disabled:opacity-50`}
          >
            Contratos
          </button>
          <button
            className={`bg-white text-lg px-4 py-2 rounded-[18px] text-black disabled:opacity-50`}
          >
            Tutoriales
          </button>
        </div>
      </div>
      <div className="flex justify-between max-md:flex-wrap gap-[5px] w-full">
        <UserInfo />
        <CocayInfo
          yaCompro={yaCompro}
          setModalGenerateCode={setModalGenerateCode}
          setModalStake={setModalStake}
        />
      </div>
      <div className="flex justify-between max-md:flex-wrap gap-[5px] w-full">
        <div className="bg-back rounded-[18px] w-full">
          <DonationsOrTransactions yaCompro={yaCompro} />
        </div>
        {/* Transacciones de personas */}
        <PeopleTransactions />
      </div>
      {/* Modales para los botones */}
      {buyCocay && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center ">
          <BuyCocay setBuyCocay={setBuyCocay} />
        </div>
      )}
      {modalAvances && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center ">
          <Camaras setModalAvances={setModalAvances} />
        </div>
      )}
      {modalGenerateCode && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center items-center">
          <GenerateCode setModalGenerateCode={setModalGenerateCode} />
        </div>
      )}
      {modalStake && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center items-center">
          <Stake setModalStake={setModalStake} />
        </div>
      )}
    </div>
  );
};

export default Comprar;
