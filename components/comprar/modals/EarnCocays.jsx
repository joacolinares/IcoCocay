import { IoMdArrowRoundBack } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const EarnCocays = ({ setModalEarnCocays }) => {
  return (
    <div className="relative bg-back w-full max-w-[700px] my-8 rounded-[18px] border-2 border-primary h-fit pb-12 p-2">
      <button
        onClick={() => {
          //Vuelve para atras
          setModalEarnCocays(false);
        }}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>

      <div className="mt-12 w-full flex flex-col gap-[30px] items-center">
        <p className="text-2xl font-semibold text-orange-500">Cocays ganados</p>
        <div className="flex flex-col items-center gap-[20px] bg-[#3d3d3d] px-4 py-2 rounded-[18px] border border-orange-500">
          <div className="text-xl font-medium">Staking Cocays = 99.31</div>
          <div className="text-xl font-medium">Teams Cocays = 44.32</div>
        </div>

        <button
          onClick={() => {
            //Vuelve para atras
            setModalEarnCocays(false);
          }}
          className="button-3d-1"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default EarnCocays;
