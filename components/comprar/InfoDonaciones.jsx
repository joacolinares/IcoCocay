import { ethers } from "ethers";
import abi from "../../public/abis/ico.json";
import money from "../../public/icons/money.png";
import chain from "../../public/icons/chain.png";
import calendar from "../../public/icons/calendar.png";
import { FaWallet } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAddress, useSigner, ThirdwebSDK } from "@thirdweb-dev/react";
import { Binance } from "@thirdweb-dev/chains";
import abiIco from '../../public/abis/ico.json';



const InfoDonaciones = () => {
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const wallet = useAddress();
  const signer = useSigner();

  useEffect(() => {
    const fetchDonaciones2 = async () => {
      if (!wallet || !signer) return;
  
      const sdk = ThirdwebSDK.fromSigner(signer, Binance);
      const contractIco = await sdk.getContract(
        "0x722b6119E079693FAf6B54fa2E737B894151FD4C", 
        abiIco
      );
  
      let index = 0;
      const newTeams = [];
      setLoading(true);
      setError(null);
  
      try {
        while (true) {
          try {
            const recibos = await contractIco.call("donaciones", [wallet, index]);
            console.log(recibos)
            if (!recibos || recibos.length === 0) break;
  
            newTeams.push({
  
              fecha: new Date(recibos.timestamp * 1000).toLocaleDateString(),
              cantidad: ethers.utils.formatUnits(recibos.cantidad, 18),
              wallet: wallet,
            });
            console.log(newTeams)
            index++;
          } catch (err) {
            console.error("Error fetching recibo:", err);
            break; // Exit the loop on error
          }
        }
      } catch (err) {
        console.error("Error in fetching recibos:", err);
        setError("No se pudieron obtener los datos.");
      } finally {
        console.log(newTeams)
        setDonaciones(newTeams);
        setLoading(false);
      }
    };



    fetchDonaciones2();
  }, [wallet]);

  const formatWalletAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 5)}...${address.slice(-5)}`;
  };

  return (
    <div className="rounded-[18px] w-full">
      <div className="flex flex-col gap-[10px]">
        <p className="text-center w-full text-2xl">Donaciones</p>
        <div className="w-full flex justify-between">
          <div className="flex gap-[2px]">
            <p className="hidden lg:block">Fecha</p>
            <img src={calendar} className="w-[20px] object-cover" />
          </div>
          <div className="flex gap-[2px]">
            <p className="hidden lg:block">Cantidad</p>
            <img src={money} className="w-[20px] object-cover" />
          </div>
          <div className="flex gap-[5px] items-center">
            <p className="hidden lg:block">Wallet</p>
            <FaWallet />
          </div>
         {/* <div className="flex gap-[5px] items-center">
            <p className="hidden lg:block">Share</p>
            <FaShareAlt />
          </div>*/}
        </div>
        {donaciones.length > 0 ? (
          donaciones.map((donacion, index) => (
            <div key={index} className="w-full flex justify-between text-sm">
              <p className="max-w-[50px] sm:max-w-[100px] text-ellipsis overflow-hidden">
                {donacion.fecha}
              </p>
              <p className="max-w-[50px] sm:max-w-[100px] text-ellipsis overflow-hidden">
                ${donacion.cantidad}
              </p>
              <p className="max-w-[50px] sm:max-w-[100px] text-ellipsis overflow-hidden">
                {formatWalletAddress(donacion.wallet)}
              </p>
              <div className="max-w-[50px] sm:max-w-[100px] text-ellipsis overflow-hidden">
                <div className="flex gap-[5px] items-center">
                  <p>Links</p>
                  <FaShareAlt />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-base underline mt-[20px]">
            No hay donaciones aún!!
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoDonaciones;
