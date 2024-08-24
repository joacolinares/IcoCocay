import gmail from "../../public/icons/gmail.svg";
import usdt from "../../public/icons/usdt.svg";
import bnb from "../../public/icons/bnb.svg";
import { FaWallet } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAddress, useWallet, ThirdwebSDK, useSigner } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Binance } from "@thirdweb-dev/chains";
import abiIco from '../../public/abis/ico.json';
import abiToken from '../../public/abis/token.json';
import { ethers } from "ethers";

const UserInfo = ({ _signInWithX, _xUserName, _googleUserName }) => {
  const [tipo, setTipo] = useState("Billetera");
  const [email, setEmail] = useState("");
  const [balanceUsdt, setBalanceUSDT] = useState(0);
  const [balanceBnb, setBalanceBNB] = useState(0);


  const wallet = useAddress();
  const connectedWallet = useWallet();
  const signer = useSigner();

  const getInfo = async () => {
    if (!connectedWallet) {
      console.error("connectedWallet is undefined");
      return;
    }

    const personalwallet = connectedWallet.getPersonalWallet();
    console.log(personalwallet);
    if (personalwallet && personalwallet.walletId === 'embeddedWallet') {
      const email = personalwallet.connector?.user?.authDetails?.email;
      console.log(email);
      setTipo("Email");
      setEmail(email);
    }

    console.log("TODO BIEN");
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

    const balanceBnb = await sdk.getProvider().getBalance(wallet);
    console.log(balanceBnb);
    setBalanceBNB(parseFloat(ethers.utils.formatEther(balanceBnb)));
  };

  useEffect(() => {
    getInfo();
  }, [wallet]);

  return (
    <div className="bg-back p-2 rounded-[18px] w-full">
      <div className="flex flex-col gap-[10px]">
       
          <div className="flex gap-[10px] items-center bg-[#353535] p-2 rounded-[18px]">
            <p>Gmail</p>
            <img src={gmail} className="object-cover w-[30px]" />
            <p className="">{email}</p>
            <p>{_googleUserName}</p>
          </div>
       <div className="flex gap-[10px] items-center bg-[#353535] p-2 rounded-[18px]">
          <p>Wallet</p>
          <FaWallet className="text-2xl" />
          <p className="text-ellipsis overflow-hidden">
            {wallet}
          </p>
        </div> 

        <div className="flex gap-[10px] items-center bg-[#353535] p-2 rounded-[18px]">
          <p>USDT</p>
          <img src={usdt} className="object-cover w-[30px]" />
          <p>{balanceUsdt}</p>
        </div>
        <div className="flex gap-[10px] items-center bg-[#353535] p-2 rounded-[18px]">
          <p>BNB</p>
          <img src={bnb} className="object-cover w-[30px]" />
          <p>{balanceBnb}</p>
        </div>
        <div className="flex gap-[10px] items-center bg-[#353535] p-2 rounded-[18px]">
          <p>Twitter</p>
          <FaXTwitter className="text-2xl" />
          {!_xUserName ? (
            <button onClick={_signInWithX}>
              Conectar
            </button>
          ) : (
            <p>{_xUserName}</p>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
