import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Agradecimiento from "./Agradecimiento";

const ConfirmarDonacion = ({
  setPresionoDonar,
  loggedTwitter,
  setLoggedTwitter,
  modalLoginTwitter,
  setModalLoginTwitter,
  setDonar,
  setComprar,
}) => {
  const [siguiente, setSiguiente] = useState(false);
  const [agradecimiento, setAgradecimiento] = useState(false);

  return (
    <div className="relative bg-back w-full max-w-[700px] my-8 rounded-[18px] border-2 border-primary h-fit pb-12 p-2">
      <button
        onClick={() => {
          //Vuelve para atras
          setPresionoDonar(false);
        }}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>
      {!siguiente ? (
        <div className="mt-12 w-full flex flex-col gap-[10px] items-center">
          <p className="text-2xl">Antes ingresa tus datos:</p>
          <div className="flex flex-col">
            <label>Nombre y apellido:</label>
            <input
              type="text"
              defaultValue={"pepe"}
              className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
            />
          </div>
          <div className="flex flex-col">
            <label>Email:</label>
            <input
              type="email"
              defaultValue={"cocay@gmail.com"}
              className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
            />
          </div>
          <div className="flex flex-col">
            <label>Telefono:</label>
            <input
              type="number"
              className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
            />
          </div>

          <button onClick={() => setSiguiente(true)} className="button-3d-1">
            Siguiente
          </button>
        </div>
      ) : (
        <div className="mt-12 w-full flex flex-col gap-[10px] items-center">
          <p className="text-2xl"> Resumen de su donación:</p>
          <div className="flex flex-col">
            <p>Subtotal: $123 USD</p>
            <p>Impuestos: $0 USD</p>
            <div className="h-[2px] w-full bg-gray-500" />
            <p>Total: $123 USD</p>
          </div>
          <button
            onClick={() => {
              setAgradecimiento(true);
            }}
            className="button-3d-1"
          >
            Confirmar donación
          </button>
        </div>
      )}
      {agradecimiento && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center items-center">
          <Agradecimiento
            setAgradecimiento={setAgradecimiento}
            setPresionoDonar={setPresionoDonar}
            loggedTwitter={loggedTwitter}
            setLoggedTwitter={setLoggedTwitter}
            modalLoginTwitter={modalLoginTwitter}
            setModalLoginTwitter={setModalLoginTwitter}
            setDonar={setDonar}
            setComprar={setComprar}
          />
        </div>
      )}
    </div>
  );
};

export default ConfirmarDonacion;
