import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import UserInfo from "./UserInfo";
import CocayInfo from "./CocayInfo";
import Camaras from "./modals/Camaras";
import { useState } from "react";
import BuyCocay from "./comprar-modal/BuyCocay";
import DonationsOrTransactions from "./DonationsOrTransactions";
import PeopleTransactions from "./PeopleTransactions";
import GenerateCode from "./modals/GenerateCode";
import Stake from "./modals/Stake";
import EarnCocays from "./modals/EarnCocays";
import Teams from "./modals/Teams";

// eslint-disable-next-line react/prop-types
const Comprar = ({ setComprar, setDonar }) => {
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
  //Para modal de EARN COCAYS
  const [modalEarnCocays, setModalEarnCocays] = useState(false);
  //Para modal de EARN COCAYS
  const [modalTeams, setModalTeams] = useState(false);

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
          {/* Este boton abre el modal para comprar cocays */}
          <button onClick={() => setBuyCocay(true)} className="button-3d-2">
            Comprar Cocay
          </button>
          <button
            onClick={() => {
              setComprar(false);
              setDonar(true);
            }}
            className="button-3d-2"
          >
            Donar
          </button>
          <button onClick={() => setModalTeams(true)} className="button-3d-2">
            Mi Red
          </button>
          <button disabled={!yaCompro} className={`button-3d-2`}>
            Mis Codigos
          </button>
          <button
            onClick={() => setModalGenerateCode(true)}
            className="button-3d-2"
          >
            GENERAR CÓDIGO
          </button>
        </div>
      </div>
      <div className="flex justify-between max-md:flex-wrap gap-[5px] w-full">
        <UserInfo />
        <CocayInfo
          yaCompro={yaCompro}
          setModalGenerateCode={setModalGenerateCode}
          setModalStake={setModalStake}
          setModalEarnCocays={setModalEarnCocays}
          setModalTeams={setModalTeams}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-[10px]">
        <button onClick={() => setModalAvances(true)} className={`button-3d-1`}>
          Avances
        </button>
        <button className={`button-3d-1`}>Whitepaper</button>
        <button className={`button-3d-1`}>Curriculum VITAE</button>
        <button className={`button-3d-1`}>Brochure Cocay</button>
        <button disabled={!yaCompro} className={`button-3d-1`}>
          Contratos
        </button>
        <button className={`button-3d-1`}>Tutoriales</button>
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
      {modalEarnCocays && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center items-center">
          <EarnCocays setModalEarnCocays={setModalEarnCocays} />
        </div>
      )}
      {modalTeams && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center items-center">
          <Teams setModalTeams={setModalTeams} />
        </div>
      )}
    </div>
  );
};

export default Comprar;
