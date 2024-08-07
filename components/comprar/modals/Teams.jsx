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

  useEffect(() => {
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
          Teams referidos
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
                    USDT Recibidos:{" "}
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
