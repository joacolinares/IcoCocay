import { IoMdArrowRoundBack } from "react-icons/io";

const Teams = ({ setModalTeams }) => {
  return (
    <div className="relative bg-back w-full max-w-[700px] my-8 rounded-[18px] border-2 border-primary h-fit pb-12 p-2">
      <button
        onClick={() => {
          //Vuelve para atras
          setModalTeams(false);
        }}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>

      <div className="mt-12 w-full flex flex-col gap-[30px] items-center ">
        <p className="text-2xl font-semibold text-orange-500">
          Teams referidos
        </p>
        <div className="overflow-y-scroll  max-h-[400px] flex flex-col items-center gap-[20px] w-full">
          {teams.map((team, i) => (
            <div
              key={i}
              className="flex flex-col gap-[20px] bg-[#3d3d3d] px-4 py-2 rounded-[18px] border border-orange-500 w-full"
            >
              <div className="text-lg">
                <p>
                  Nickname:{" "}
                  <span className="text-orange-400">{team.nickname}</span>
                </p>
                <p>
                  Wallet: <span className="text-orange-400">{team.wallet}</span>
                </p>
                <p>
                  Cocays comprados:{" "}
                  <span className="text-orange-400">
                    {team.cocaysComprados}
                  </span>
                </p>
                <p>
                  Cocays referidos:{" "}
                  <span className="text-orange-400">
                    {team.cocaysReferidos}
                  </span>
                </p>
                <p>
                  Codigo de referido:{" "}
                  <span className="text-orange-400">{team.codigoReferido}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            //Vuelve para atras
            setModalTeams(false);
          }}
          className="bg-white rounded-[18px] px-4 py-2 font-semibold text-primary"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Teams;

const teams = [
  {
    nickname: "Jhon Doe",
    wallet: "0x123456789",
    cocaysComprados: 100,
    cocaysReferidos: 50,
    codigoReferido: "132456",
  },
  {
    nickname: "Jhon Doe",
    wallet: "0x123456789",
    cocaysComprados: 100,
    cocaysReferidos: 50,
    codigoReferido: "132456",
  },
  {
    nickname: "Jhon Doe",
    wallet: "0x123456789",
    cocaysComprados: 100,
    cocaysReferidos: 50,
    codigoReferido: "132456",
  },
  {
    nickname: "Jhon Doe",
    wallet: "0x123456789",
    cocaysComprados: 100,
    cocaysReferidos: 50,
    codigoReferido: "132456",
  },
  {
    nickname: "Jhon Doe",
    wallet: "0x123456789",
    cocaysComprados: 100,
    cocaysReferidos: 50,
    codigoReferido: "132456",
  },
  {
    nickname: "Jhon Doe",
    wallet: "0x123456789",
    cocaysComprados: 100,
    cocaysReferidos: 50,
    codigoReferido: "132456",
  },
  {
    nickname: "Jhon Doe",
    wallet: "0x123456789",
    cocaysComprados: 100,
    cocaysReferidos: 50,
    codigoReferido: "132456",
  },
  {
    nickname: "Jhon Doe",
    wallet: "0x123456789",
    cocaysComprados: 100,
    cocaysReferidos: 50,
    codigoReferido: "132456",
  },
  {
    nickname: "Jhon Doe",
    wallet: "0x123456789",
    cocaysComprados: 100,
    cocaysReferidos: 50,
    codigoReferido: "132456",
  },
];
