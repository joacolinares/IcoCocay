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
  const [error2, setError2] = useState(null);
  const [teams2, setTeams2] = useState([]);
  const signer = useSigner();
  const wallet = useAddress();




  const fetchRecibos = async () => {
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
          const recibos = await contractIco.call("recibos", [wallet, index]);
          console.log(recibos)
          if (!recibos || recibos.length === 0) break;

          newTeams.push({

            wallet: recibos[0],
            cocaysComprados: ethers.utils.formatUnits(recibos[1], 18), // Convert _BigNumber to string
            cocaysReferidos: recibos[2].toString(),  // Convert _BigNumber to string
            codigoReferido: recibos[3].toString()    // Convert _BigNumber to string
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
      setTeams(newTeams);
      setLoading(false);
    }
  };




  
  const fetchSponsorEvents3 = async () => {
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
          const recibos = await contractIco.call("sponsors", [wallet, index]);
          console.log(recibos)
          if (!recibos || recibos.length === 0) break;

          newTeams.push({
            id: parseInt(recibos.rep._hex,16),
            name: recibos.name,
            refferal: recibos.refferal,
            amount: parseInt(recibos.porcentaje._hex,16),
            sender: wallet,  // Dirección del remitente
            date: new Date(recibos.timestamp * 1000).toLocaleDateString(),
            time: new Date(recibos.timestamp * 1000).toLocaleTimeString(),
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
      setTeams2(newTeams);
      console.log(newTeams)
      setLoading(false);

    }
  };
  

  useEffect(() => {
    console.log("aaa")
    fetchSponsorEvents3()
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
                    Cantidad USDT recibidos:{" "}
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
        ) : error2 ? (
          <p className="text-base text-red-500">{error2}</p>
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
                    <span className="text-orange-400">{team.amount / 10}%</span>
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
