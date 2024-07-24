import { IoMdArrowRoundBack } from "react-icons/io";

const OfreceSwap = ({ setDetectoUSDT }) => {
  return (
    <div className="relative bg-back w-full max-w-[700px] my-8 rounded-[18px] border-2 border-primary h-fit pb-12 p-2">
      <button
        onClick={() => {
          //Vuelve para atras
          setDetectoUSDT(false);
        }}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>

      <div className="mt-12 w-full flex flex-col gap-[30px] items-center">
        <p className="text-2xl font-semibold text-orange-500">
          Tienes 12.74 USDT
        </p>
        <div className="flex flex-col items-center gap-[20px] bg-[#3d3d3d] px-4 py-2 rounded-[18px] border border-orange-500">
          <div className="text-xl font-medium">Realizar swap por Cocay?</div>
          <div className="text-xl font-medium">12.74 USDT = 12.74 Cocays</div>
        </div>

        <div className="flex gap-[10px]">
          <button
            onClick={() => {
              //Vuelve para atras
              setDetectoUSDT(false);
            }}
            className="button-3d-1"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              //Vuelve para atras
              setDetectoUSDT(false);
            }}
            className="button-3d-2 !flex flex-wrap justify-center items-center"
          >
            <p>Realizar Swap</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfreceSwap;
