import { IoMdArrowRoundBack } from "react-icons/io";
import usdt from "../public/icons/usdt.svg";
import token from "../public/token.gif";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import gmail from "/icons/gmail.svg";
import { FaWallet } from "react-icons/fa";
import ConfirmarDonacion from "./ConfirmarDonacion";
import { useAddress, useWallet, ThirdwebSDK, useSigner } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Binance } from "@thirdweb-dev/chains";
import abiToken from '../public/abis/token.json';
import abiIco from '../public/abis/ico.json';
import { ethers } from "ethers";



// eslint-disable-next-line react/prop-types
const Donar = ({
  setDonar,
  setComprar,
  loggedTwitter,
  setLoggedTwitter,
  modalLoginTwitter,
  setModalLoginTwitter,
}) => {
  //Metodo de pago usdt o targeta?
  const [metodoPago, setMetodoPago] = useState("usdt");
  const [presionoDonar, setPresionoDonar] = useState(false);
  const [balanceUsdt, setBalanceUSDT] = useState(0);
  const [valueToBuy, setValueToBuy] = useState('');



  const wallet = useAddress();
  const signer = useSigner();

  const getInfo = async () => {

    const sdk = ThirdwebSDK.fromSigner(signer, Binance);
    const contractUsdt = await sdk.getContract(
      "0x55d398326f99059fF775485246999027B3197955",
      abiToken,
    );


    const balanceUsdt = await contractUsdt.call(
      "balanceOf",
      [wallet]
    );


    console.log(balanceUsdt);
    setBalanceUSDT(parseFloat(ethers.utils.formatUnits(balanceUsdt, 18)));
  };

  const donar = async() => {
    // setAgradecimiento(true) AL FINAL
     
     if (!signer) {
       console.error("Signer is undefined");
       return;
     }
 
     if (!valueToBuy) {
       console.error("valueToBuy is undefined");
       return;
     }
 
     const valueToBuyValue = valueToBuy;
     const valueToBuyInTokens = ethers.utils.parseEther(valueToBuyValue);
 
 
     const sdk = ThirdwebSDK.fromSigner(signer, Binance);
 
     const contractToken = await sdk.getContract(
       "0x55d398326f99059fF775485246999027B3197955", 
       abiToken,
     );
      await contractToken.call(
       "approve", 
       ["0xB02d23e27881fB6eAc740BDfA1AB81FF908435a1", ethers.constants.MaxUint256 ]
     );
 
     const contractIco = await sdk.getContract(
       "0xB02d23e27881fB6eAc740BDfA1AB81FF908435a1", 
       abiIco,
     );
     
     await contractIco.call(
       "donar", 
       [valueToBuyInTokens]
     );
 
 
     setAgradecimiento(true)
   }



  useEffect(() => {
    getInfo();
  }, [wallet]);


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

      <div className="mt-8 flex flex-col gap-[40px] items-center justify-center w-full">
        <h2 className="text-2xl md:text-4xl text-center">
          ¿Cómo quiere donar y cuánto?
        </h2>
        {/* USDT o Card? */}
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
            onClick={() => setMetodoPago("card")}
            className={`bg-back font-semibold rounded-[18px] px-4 py-2 flex gap-[10px] items-center text-lg border-2 ${
              metodoPago == "card" ? "border-primary" : "border-white"
            }`}
          >
            <BsFillCreditCard2FrontFill className="text-4xl text-primary" />
            <p>Tarjeta</p>
          </button>
        </div>
       {/* <div className="flex flex-col gap-[10px] w-full">
          <div className="flex gap-[10px] items-center bg-[#353535] p-2 rounded-[18px]">
            <p>Gmail</p>
            <img src={gmail} className="object-cover w-[30px]" />
            <p className="">cocay@gmail.com</p>
          </div>
          <div className="flex gap-[10px] items-center bg-[#353535] p-2 rounded-[18px]">
            <p>Wallet</p>
            <FaWallet className="text-2xl" />
            <p className="text-ellipsis overflow-hidden">
              0xh4ad454v67h27hh28u4h2
            </p>
          </div>
        </div>*/}
        {/* USDT equivalente a ? */}
        <div className="flex flex-col sm:flex-row gap-[20px] items-center justify-center w-full">
          <div className="bg-back px-4 py-2 rounded-[18px] w-full">
            <div className="flex gap-[10px] items-center w-full">
              <img
                src={usdt}
                alt="usdt logo"
                className="w-[40px] object-cover"
              />
              <p>USDT</p>
            </div>
            <p>Disponible: ${balanceUsdt}</p>
            <input
              value={valueToBuy}
              onChange={(e) => setValueToBuy(e.target.value)}
              type="number"
              placeholder="0.00"
              className="bg-[#5e5e5e] font-bold text-xl placeholder:text-white px-4 py-2 rounded-[18px] w-full mt-2"
            />
          </div>
          <div className="rounded-full w-[50px] h-[50px] bg-back text-3xl flex justify-center items-center">
            {" "}
            ={" "}
          </div>
          <div className="bg-back px-4 py-2 rounded-[18px] w-full">
            <div className="flex gap-[10px] items-center w-full">
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
        <button

          onClick={() => {
            
            donar()
           // setPresionoDonar(true)
          }}
          className="button-3d-2 min-w-[150px]"
        >
          Donar
        </button>
      </div>
      {presionoDonar && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center items-center">
          <ConfirmarDonacion
            setPresionoDonar={setPresionoDonar}
            loggedTwitter={loggedTwitter}
            setLoggedTwitter={setLoggedTwitter}
            modalLoginTwitter={modalLoginTwitter}
            setModalLoginTwitter={setModalLoginTwitter}
            setDonar={setDonar}
            setComprar={setComprar}
          />
        </div>
      )}
    </div>
  );
};

export default Donar;
