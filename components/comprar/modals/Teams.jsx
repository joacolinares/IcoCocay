import { IoMdArrowRoundBack } from "react-icons/io";
import { Binance } from "@thirdweb-dev/chains";
import abiIco from '../../../public/abis/ico.json';
import { useAddress, useSigner, ThirdwebSDK } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";



// eslint-disable-next-line react/prop-types
const Teams = ({ setModalTeams }) => {
  const [teams, setTeams] = useState([]);  // Cambiado a teams para mostrar datos dinámicos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teams2, setTeams2] = useState([]);
  const signer = useSigner();
  const wallet = useAddress();

  const fetchRecibos = async () => {
    if (!wallet || !signer) return;

    const sdk = ThirdwebSDK.fromSigner(signer, Binance);
    const contractIco = await sdk.getContract(
      "0xB02d23e27881fB6eAc740BDfA1AB81FF908435a1", 
      abiIco
    );

    let index = 0;
    const newTeams = [];
    setLoading(true);
    setError(null);

    try {
      while (true) {
        try {
          const recibos = await contractIco.call("recibos", [wallet, index]);

          if (!recibos || recibos.length === 0) break;

          newTeams.push({

            wallet: recibos[0],
            cocaysComprados: ethers.utils.formatUnits(recibos[1], 18), // Convert _BigNumber to string
            cocaysReferidos: recibos[2].toString(),  // Convert _BigNumber to string
            codigoReferido: recibos[3].toString()    // Convert _BigNumber to string
          });

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
      setTeams(newTeams);
      setLoading(false);
    }
  };


  const fetchSponsorEvents = async () => {
    if (!wallet) return;
  
    const provider = new ethers.providers.JsonRpcProvider("https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3");
    const contractAddress = "0xB02d23e27881fB6eAc740BDfA1AB81FF908435a1";
    const contract = new ethers.Contract(contractAddress, abiIco, provider);
  
    const eventSignature = ethers.utils.id("SponsorAdded(string,address,uint256)");
  
    try {
      const currentBlock = await provider.getBlockNumber();
      const fromBlock = Math.max(currentBlock - 1000, 0); // Ajusta el rango de bloques según sea necesario
      const filter = {
        address: contractAddress,
        topics: [eventSignature],
        fromBlock: 41137000,
        toBlock: currentBlock
      };
  
      const logs = await provider.getLogs(filter);
      const parsedEvents = await Promise.all(logs.map(async (log) => {
        const parsedLog = contract.interface.parseLog(log);
        const tx = await provider.getTransaction(log.transactionHash);
        return { ...parsedLog, sender: tx.from };
      }));
  
      console.log(parsedEvents)

      const filteredEvents = parsedEvents.filter(event => event.sender.toLowerCase() === wallet.toLowerCase());
      console.log(filteredEvents)

      const formattedEvents = await Promise.all(filteredEvents.map(async (event) => {
        const block = await provider.getBlock(event.blockNumber);
        return {
          id: event.transactionHash,
          name: event.args.name,
          refferal: event.args.refferal,
          amount: parseInt(event.args.amount._hex,16),
          sender: event.sender,  // Dirección del remitente
          date: new Date(block.timestamp * 1000).toLocaleDateString(),
          time: new Date(block.timestamp * 1000).toLocaleTimeString(),
        };
      }));
      
      setTeams2(formattedEvents);
    } catch (error) {
      console.error("Error fetching sponsor events:", error);
      setError("No se pudieron obtener los datos de los eventos.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  useEffect(() => {
    fetchSponsorEvents()
    fetchRecibos();
  }, [wallet, signer]);

  return (
    <div className="relative bg-back w-full max-w-[700px] my-8 rounded-[18px] border-2 border-primary h-fit pb-12 p-2">
      <button
        onClick={() => setModalTeams(false)}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>

      <div className="mt-12 w-full flex flex-col gap-[30px] items-center ">
        <p className="text-2xl font-semibold text-orange-500">
          Ganancias de mi arbol
        </p>

        {loading ? (
          <p className="text-base">Cargando...</p>
        ) : error ? (
          <p className="text-base text-red-500">{error}</p>
        ) : (
          <div className="overflow-y-scroll max-h-[400px] flex flex-col items-center gap-[20px] w-full">
            {teams.map((team, i) => (
              <div
                key={i}
                className="flex flex-col gap-[20px] bg-[#3d3d3d] px-4 py-2 rounded-[18px] border border-orange-500 w-full"
              >
                <div className="text-lg">
                  <p>
                    Comprador: <span className="text-orange-400">{team.wallet}</span>
                  </p>
                  <p>
                    Codigo:{" "}
                    <span className="text-orange-400">
                      {team.cocaysComprados}$
                    </span>
                  </p>
                  <p>
                    Porcentaje del referido:{" "}
                    <span className="text-orange-400">
                      {team.cocaysReferidos / 10}%
                    </span>
                  </p>
                  <p>
                    ID:{" "}
                    <span className="text-orange-400">{team.codigoReferido}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

 
      </div>


      <div className="mt-12 w-full flex flex-col gap-[30px] items-center ">
        <p className="text-2xl font-semibold text-orange-500">
          Mi equipo
        </p>

        {loading ? (
          <p className="text-base">Cargando...</p>
        ) : error ? (
          <p className="text-base text-red-500">{error}</p>
        ) : (
          <div className="overflow-y-scroll max-h-[400px] flex flex-col items-center gap-[20px] w-full">
            {teams2.map((team, i) => (
              <div
                key={i}
                className="flex flex-col gap-[20px] bg-[#3d3d3d] px-4 py-2 rounded-[18px] border border-orange-500 w-full"
              >
                {console.log(teams2)}
                <div className="text-lg">
                  <p>
                  Wallet del referido: <span className="text-orange-400">{team.refferal}</span>
                  </p>
                  <p>
                    Codigo de Descuento:{" "}
                    <span className="text-orange-400">
                      {team.name}
                    </span>
                  </p>

                  <p>
                    Porcentaje negociado:{" "}
                    <span className="text-orange-400">{team.amount} %</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setModalTeams(false)}
          className="button-3d-1"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Teams;
