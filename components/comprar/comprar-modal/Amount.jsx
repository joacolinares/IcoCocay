import { useState } from "react";

const Amount = ({
  loggedTwitter,
  setLoggedTwitter,
  setModalLoginTwitter,
  setConfirmado,
}) => {
  const [checked1, setChecked1] = useState(true);

  return (
    <div className="flex gap-[30px] flex-wrap justify-center relative">
      <div className="flex flex-col gap-[20px] items-center">
        <div className="flex items-center gap-[20px] w-full">
          <div className="h-[1px] w-full bg-primary" />
          <p className="text-nowrap text-lg font-semibold">
            Disponible en USDT
          </p>
          <div className="h-[1px] w-full bg-primary" />
        </div>
        <input
          placeholder={0.0}
          type="number"
          className="px-4 py-2 rounded-[18px] text-black max-sm:w-[90%]"
        />
        <button
          onClick={() => {
            //Modal para loguearse con twitter
            setModalLoginTwitter(true);
            //Verificar fondos para habilitar el boton confirmar
          }}
          className="button-3d-1 max-sm:w-[90%]"
        >
          Verificar
        </button>
      </div>
      <div className="hidden md:block w-[1px] bg-white" />
      <div className="flex flex-col gap-[20px] items-center">
        <div className="flex items-center gap-[20px] w-full">
          <div className="h-[1px] w-full bg-primary" />
          <p className="text-nowrap text-lg font-semibold">Compra Cocay</p>
          <div className="h-[1px] w-full bg-primary" />
        </div>
        <input
          placeholder={0.0}
          type="number"
          className="px-4 py-2 rounded-[18px] text-black max-sm:w-[90%]"
        />
        <div className="flex gap-[10px] text-sm">
          <input
            onClick={() => setChecked1(!checked1)}
            checked={checked1}
            type="checkbox"
            id="second"
            name="second"
          />
          <label>
            He leído y aceptado el{" "}
            <button className="text-blue-500">Acuerdo de Privacidad.</button>
          </label>
        </div>
        <button
          disabled={!checked1}
          onClick={() => {
            setConfirmado(true);
          }}
          className="button-3d-1 max-sm:w-[90%]"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Amount;
