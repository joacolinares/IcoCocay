import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const GenerateCode = ({ setModalGenerateCode }) => {
  const [siguiente, setSiguiente] = useState(false);

  return (
    <div className="relative bg-back w-full max-w-[700px] my-8 rounded-[18px] border-2 border-primary h-fit pb-12 p-2">
      <button
        onClick={() => {
          //Vuelve para atras
          setModalGenerateCode(false);
        }}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>
      {!siguiente ? (
        <div className="mt-12 w-full flex flex-col gap-[10px] items-center">
          <div className="flex flex-col">
            <label>Nickname:</label>
            <input
              type="text"
              defaultValue={"pepe"}
              className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
            />
          </div>
          <div className="flex flex-col">
            <label>Wallet:</label>
            <input
              type="text"
              defaultValue={"0x1234567890abcdef1234567890abcdef12345678"}
              className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
            />
          </div>
          <div className="flex flex-col">
            <label>Porcentaje a repartir:</label>
            <input
              type="number"
              defaultValue={6}
              className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
            />
          </div>
          <div className="flex flex-col">
            <label>New User:</label>
            <input
              type="text"
              defaultValue={12}
              className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
            />
          </div>
          <div className="flex flex-col">
            <label>Wallet USDT BNB:</label>
            <input
              type="text"
              defaultValue={12}
              className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
            />
          </div>
          <div className="flex flex-col">
            <label>Porcentaje:</label>
            <input
              type="number"
              defaultValue={6}
              className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
            />
          </div>
          <button
            onClick={() => setSiguiente(true)}
            className="bg-white rounded-[18px] px-4 py-2 font-semibold text-primary"
          >
            Siguiente
          </button>
        </div>
      ) : (
        <div className="mt-12 w-full flex flex-col gap-[10px] items-center">
          <div className="flex flex-col">
            <label>Porcentaje Disponible:</label>
            <input
              type="number"
              defaultValue={6}
              className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
            />
          </div>
          <div className="flex flex-col">
            <label>Porcentaje a repartir:</label>
            <input
              type="number"
              defaultValue={3}
              className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
            />
          </div>
          <p>Wallet USDT BNB: 0x4i5ni5jn3463</p>
          <button
            onClick={() => setModalGenerateCode(false)}
            className="bg-white rounded-[18px] px-4 py-2 font-semibold text-primary"
          >
            GENERAR
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateCode;
