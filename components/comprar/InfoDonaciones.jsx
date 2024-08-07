import { ethers } from "ethers";
import abi from "../../public/abis/ico.json";
import money from "../../public/icons/money.png";
import chain from "../../public/icons/chain.png";
import calendar from "../../public/icons/calendar.png";
import { FaWallet } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

const InfoDonaciones = () => {
  const [donaciones, setDonaciones] = useState([]);
  const wallet = useAddress();

  useEffect(() => {
    const fetchDonaciones = async () => {
      if (!wallet) return;

      const provider = new ethers.providers.JsonRpcProvider("https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3");
      const contractAddress = "0xB02d23e27881fB6eAc740BDfA1AB81FF908435a1";
      const contract = new ethers.Contract(contractAddress, abi, provider);

      const eventSignature = ethers.utils.id("DonationMade(address,uint256)");

      try {
        const currentBlock = await provider.getBlockNumber();
        const fromBlock = Math.max(currentBlock - 1000, 0); // Ajusta el rango de bloques según sea necesario
        const filter = {
          address: contractAddress,
          topics: [eventSignature],
          fromBlock: fromBlock,
          toBlock: currentBlock,
        };

        const logs = await provider.getLogs(filter);
        const parsedEvents = logs.map(log => contract.interface.parseLog(log));
        
        // Filtrar eventos para que solo se incluyan los de la wallet conectada
        const filteredEvents = parsedEvents
          .filter(event => event.args.donor.toLowerCase() === wallet.toLowerCase())
          .map(async event => {
            const block = await provider.getBlock(event.blockNumber);
            return {
              fecha: new Date(block.timestamp * 1000).toLocaleDateString(),
              cantidad: ethers.utils.formatUnits(event.args.amount, 18),
              wallet: event.args.donor,
            };
          });

        const eventsWithBlockData = await Promise.all(filteredEvents);
        setDonaciones(eventsWithBlockData);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonaciones();
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
