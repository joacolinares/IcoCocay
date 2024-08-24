import { IoMdArrowRoundBack } from "react-icons/io";
import token from "../../../public/token.gif";
import PrecioCocay from "./PrecioCocay";
import SelectCurrency from "./SelectCurrency";
import { useState } from "react";
import CurrencyBalance from "./CurrencyBalance";
import SmartOrToken from "./SmartOrToken";
import Amount from "./Amount";
import LoginTwitterModal from "../../LoginTwitterModal";
import AgradecimientoDeCompra from "./AgradecimientoDeCompra";
import { ethers } from "ethers"; // Import ethers
import { ThirdwebSDK } from "@thirdweb-dev/react"; // Import Thirdweb SDK

// eslint-disable-next-line react/prop-types
const BuyCocay = ({
  cantInv,
  setBuyCocay,
  loggedTwitter,
  setLoggedTwitter,
  modalLoginTwitter,
  setModalLoginTwitter,
  _connectWithX,
  _accessToken,
  _accessSecret
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [confirmado, setConfirmado] = useState(false);
  const [agradecimiento, setAgradecimiento] = useState(false);
  const [cantidad, setCantidad] = useState()

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
         {/* <button className="bg-white text-black px-4 py-2 rounded-[18px]">
            Hasta agotar el suministro
          </button>*/}
          <p>USDT Recaudados: {cantInv}/22,000,000</p>
          {/* Precio cocay */}
          <PrecioCocay />
          {/* Con que moneda queres pagar? */}
          <SelectCurrency
            cantidad={cantidad}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
          {/* Cuanto tiene de esa moneda? */}
          <CurrencyBalance selectedCurrency={selectedCurrency} />
         {/* <SmartOrToken />*/}
          <Amount
            setCantidad={setCantidad}
            setAgradecimiento={setAgradecimiento}
            loggedTwitter={loggedTwitter}
            setLoggedTwitter={setLoggedTwitter}
            setModalLoginTwitter={setModalLoginTwitter}
            setConfirmado={setConfirmado}

            _connectWithX={_connectWithX}
            _accessToken={_accessToken}
            _accessSecret={_accessSecret}
          />
        </div>
      </div>
      {/* Este es el modal para que se logueen */}
      {modalLoginTwitter && !loggedTwitter && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center items-center">
          <LoginTwitterModal
            loggedTwitter={loggedTwitter}
            setLoggedTwitter={setLoggedTwitter}
            setModalLoginTwitter={setModalLoginTwitter}
          />
        </div>
      )}
      {/* Este es el modal para confirmar la compra */}
      {confirmado && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center items-center">
          <div className="mt-12 w-full flex flex-col gap-[10px] items-center">
            <div className="flex flex-col text-center">
              <p className="text-xl font-semibold">Confirmar Compra?</p>
              <p className="mt-[10px]">Monto de Compra: 200.002 USDT </p>
            </div>

            <button
              onClick={() => {
                setConfirmado(false);
                setAgradecimiento(true);
              }}
              className="button-3d-1 "
            >
              CONFIRMAR
            </button>
          </div>
          
        </div>
      )}
      {agradecimiento && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center items-center">
          <AgradecimientoDeCompra
            setAgradecimiento={setAgradecimiento}
            loggedTwitter={loggedTwitter}
            setLoggedTwitter={setLoggedTwitter}
            modalLoginTwitter={modalLoginTwitter}
            setModalLoginTwitter={setModalLoginTwitter}
            _connectWithX={_connectWithX}
            _accessToken={_accessToken}
            _accessSecret={_accessSecret}
          />
        </div>
      )}
    </div>
  );
};

export default BuyCocay;
