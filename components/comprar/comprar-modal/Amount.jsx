import { useEffect, useState } from "react";
import { Binance } from "@thirdweb-dev/chains";
import abiIco from '../../../public/abis/ico.json';
import abiToken from '../../../public/abis/token.json';
import { useSigner, ThirdwebSDK } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const Amount = ({
  setCantidad,
  setAgradecimiento,
  amountCocay,
  loggedTwitter,
  setLoggedTwitter,
  setModalLoginTwitter,
  setConfirmado,
}) => {
  const [checked1, setChecked1] = useState(true);
  const [valueToBuy, setValueToBuy] = useState('');
  const [sponsorCode, setSponsorCode] = useState('');
  
  const signer = useSigner();

  const buyTokens = async() => {
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

    if (!sponsorCode) {
      console.error("sponsorCode is undefined");
      return;
    }

    const sdk = ThirdwebSDK.fromSigner(signer, Binance);

    const contractToken = await sdk.getContract(
      "0x55d398326f99059fF775485246999027B3197955", 
      abiToken,
    );
     await contractToken.call(
      "approve", 
      ["0x708B2FbFfa4f28a0b0e22575eA2ADbE1a8Ab0e0E", ethers.constants.MaxUint256 ]
    );

    const contractIco = await sdk.getContract(
      "0x708B2FbFfa4f28a0b0e22575eA2ADbE1a8Ab0e0E", 
      abiIco,
    );
    
    await contractIco.call(
      "buyCocays", 
      [valueToBuyInTokens, sponsorCode]
    );


    setAgradecimiento(true)
  }

  return (
    <div className="flex gap-[30px] flex-wrap justify-center relative">
      {/*<div className="flex flex-col gap-[20px] items-center">
        <div className="flex items-center gap-[20px] w-full">
          <div className="h-[1px] w-full bg-primary" />
          <p className="text-nowrap text-lg font-semibold">
            Disponible en USDT
          </p>
          <div className="h-[1px] w-full bg-primary" />
        </div>
        <input
          placeholder={0.0}
          type="number"
          className="px-4 py-2 rounded-[18px] text-black max-sm:w-[90%]"
        />
        <button
          onClick={() => {
            //Modal para loguearse con twitter
            setModalLoginTwitter(true);
            //Verificar fondos para habilitar el boton confirmar
          }}
          className="button-3d-1 max-sm:w-[90%]"
        >
          Verificar
        </button>
      </div>*/}
      {/*<div className="hidden md:block w-[1px] bg-white" />*/}
      <div className="flex flex-col gap-[20px] items-center">
        <div className="flex items-center gap-[20px] w-full">
          <div className="h-[1px] w-full bg-primary" />
          <p className="text-nowrap text-lg font-semibold">Compra Cocay</p>
          <div className="h-[1px] w-full bg-primary" />
        </div>
        <input
          value={valueToBuy}
          onChange={(e) => {
            console.log(e.target.value)
            setValueToBuy(e.target.value)
            setCantidad(e.target.value)
          }}
          placeholder={0.0}
          type="number"
          className="px-4 py-2 rounded-[18px] text-black max-sm:w-[90%]"
        />
        <input

          value={sponsorCode}
          onChange={(e) => setSponsorCode(e.target.value)}
          style={{ display: "inline-block", color:"black" }}
          type="text"
          placeholder="CODIGO10%OFF"
          className="px-4 py-2 border border-primary rounded-[18px]"
        />
        <div className="flex gap-[10px] text-sm">
          <input
            onClick={() => setChecked1(!checked1)}
            checked={checked1}
            type="checkbox"
            id="second"
            name="second"
          />
          <label>
            He leído y aceptado el{" "}
            <button className="text-blue-500">Acuerdo de Privacidad.</button>
          </label>
        </div>
        <button
          disabled={!checked1}
          onClick={() => {
            buyTokens();
          }}
          className="button-3d-1 max-sm:w-[90%]"
        >
          Confirmar
        </button>
          <br />
          {/*<button onClick={() =>{setAgradecimiento(true)}}>test</button>*/}

      </div>
    </div>
  );
};

export default Amount;
