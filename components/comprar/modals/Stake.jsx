import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const Stake = ({ setModalStake }) => {
  const [siguiente, setSiguiente] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <div className="relative bg-back w-full max-w-[700px] my-8 rounded-[18px] border-2 border-primary h-fit pb-12 p-2">
      <button
        onClick={() => {
          //Vuelve para atras
          setModalStake(false);
        }}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>
      {!siguiente ? (
        <div className="mt-12 w-full flex flex-col gap-[20px] items-center">
          <div className="flex flex-col gap-[10px] border rounded-[18px] border-[#636363] w-full px-4 py-2">
            <div className="flex justify-between flex-wrap">
              <p>4 años:</p>
              <p>&gt;</p>
              <p>~100% ROI</p>
            </div>
          </div>
          <div className="flex flex-col gap-[10px] w-full">
            <label>Cantidad en stake</label>
            <div className="flex justify-between border border-orange-500 p-2 rounded-[18px] w-full">
              <input
                type="number"
                placeholder="0.1000 Min."
                className="bg-transparent text-white outline-none w-full"
              />
              <p className="mr-4">Cocays</p>
              <button className="font-semibold">MAX</button>
            </div>
            <p>Saldo: 20 Cocays</p>
          </div>
          <div className="flex flex-col w-full">
            <p>Mi ganancia:</p>
            <div className="border rounded-[18px] border-[#636363] px-4 py-2 flex justify-between items-center">
              <p>Ganancia diaria estimada:</p>
              <p className="text-orange-500 text-sm">+0.05 COCAYS</p>
            </div>
          </div>
          <div>
            <p>Detalles de la orden</p>
            {orderDetails.map((order, index) => (
              <div key={index}>
                <p className="flex items-center gap-[5px]">
                  <span className="flex justify-center items-center w-[20px] h-[20px] text-xs border border-orange-400 rounded-full">
                    {index + 1}
                  </span>{" "}
                  {order.name}
                </p>
                <p className="text-xs text-white text-opacity-70">
                  {order.when}
                </p>
              </div>
            ))}
            <div className="flex flex-col gap-[10px] mt-[20px]">
              <div className="flex gap-[10px] text-sm">
                <input
                  onClick={() => setChecked1(!checked1)}
                  type="checkbox"
                  id="first"
                  name="first"
                />
                <label>
                  La ganancia proviene del staking en cadena. Si el ROI en
                  cadena cambia, el APR se ajustará en consecuencia
                </label>
              </div>
              <div className="flex gap-[10px] text-sm">
                <input
                  onClick={() => setChecked2(!checked2)}
                  type="checkbox"
                  id="second"
                  name="second"
                />
                <label>
                  He leído y aceptado el{" "}
                  <button className="text-blue-500">Acuerdo de Staking.</button>
                </label>
              </div>
            </div>
          </div>

          <button
            disabled={!(checked1 && checked2)}
            onClick={() => setSiguiente(true)}
            className="button-3d-1"
          >
            PARTICIPAR EN STAKING AHORA
          </button>
        </div>
      ) : (
        <div className="mt-12 w-full flex flex-col gap-[10px] items-center">
          <div className="flex flex-col text-center">
            <p className="text-xl font-semibold">Confirmar Stake?</p>
            <p className="mt-[10px]">
              Monto de Stake: 200.002{" "}
              <span className="text-orange-500">Cocays</span>
            </p>
          </div>

          <button onClick={() => setModalStake(false)} className="button-3d-1 ">
            CONFIRMAR
          </button>
        </div>
      )}
    </div>
  );
};

export default Stake;

const orderDetails = [
  {
    name: "Tiempo de staking",
    when: "2024-06-19 13:24:56",
  },
  {
    name: "Hora de inicio del cálculo de intereses",
    when: "2024-06-20 11:00:00",
  },
  {
    name: "Hora de distribución de intereses",
    when: "2024-06-21 19:00:00",
  },
  {
    name: "Tiempo de redención",
    when: "Día D",
  },
  {
    name: "Tiempo de acreditación de redención",
    when: "Día D+4",
  },
];
