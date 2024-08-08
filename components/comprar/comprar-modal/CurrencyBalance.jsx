// eslint-disable-next-line react/prop-types
import { useAddress, useWallet, ThirdwebSDK, useSigner } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Binance } from "@thirdweb-dev/chains";
import abiToken from '../../../public/abis/token.json';
import { ethers } from "ethers";

const CurrencyBalance = ({ selectedCurrency }) => {
  const [balanceUsdt, setBalanceUSDT] = useState(0);
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

  useEffect(() => {
    getInfo();
  }, [wallet]);

  return (
    <div className="flex items-center gap-[20px] w-full">
      <div className="h-[1px] w-full bg-primary" />
      <p className="text-sm text-nowrap font-bold">
        <span>USDT</span> Disponible: {balanceUsdt} $
      </p>
      <div className="h-[1px] w-full bg-primary" />
    </div>
  );
};

export default CurrencyBalance;
