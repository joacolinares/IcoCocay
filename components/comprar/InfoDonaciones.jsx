import money from "../../public/icons/money.png";
import chain from "../../public/icons/chain.png";
import calendar from "../../public/icons/calendar.png";
import { FaWallet } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";

const InfoDonaciones = () => {
  return (
    <div className="rounded-[18px] w-full">
      <div className="flex flex-col gap-[10px]">
        <p className="text-center w-full text-2xl">Donaciones</p>
        <div className="w-full flex justify-between">
          <div className="flex gap-[2px]">
            <p className="hidden lg:block">Fecha</p>
            <img src={calendar} className="w-[20px] object-cover" />
          </div>
          <div className="flex gap-[2px]">
            <p className="hidden lg:block">Hash</p>
            <img src={chain} className="w-[20px] object-cover" />
          </div>
          <div className="flex gap-[2px]">
            <p className="hidden lg:block">Cantidad</p>
            <img src={money} className="w-[20px] object-cover" />
          </div>
          <div className="flex gap-[5px] items-center">
            <p className="hidden lg:block">Wallet</p>
            <FaWallet />
          </div>
          <div className="flex gap-[5px] items-center">
            <p className="hidden lg:block">Share</p>
            <FaShareAlt />
          </div>
        </div>
        {donaciones.map((donacion, index) => (
          <div key={index} className="w-full flex justify-between text-sm">
            <p className="max-w-[50px] sm:max-w-[100px] text-ellipsis overflow-hidden">
              {donacion.fecha}
            </p>
            <p className="max-w-[50px] sm:max-w-[70px] text-ellipsis overflow-hidden">
              {donacion.hash}
            </p>
            <p className="max-w-[50px] sm:max-w-[100px] text-ellipsis overflow-hidden">
              {donacion.cantidad}
            </p>
            <p className="max-w-[50px] sm:max-w-[70px] text-ellipsis overflow-hidden">
              {donacion.wallet}
            </p>
            <div className="max-w-[50px] sm:max-w-[100px] text-ellipsis overflow-hidden">
              <div className="flex gap-[5px] items-center">
                <p>Links</p>
                <FaShareAlt />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoDonaciones;

const donaciones = [
  {
    fecha: "18/2/2024",
    hash: "0xh4ad454v67h27hh28u4h2",
    cantidad: "$150.7",
    wallet: "0xh4ad454v67h27hh28u4h2",
    twitter: "asd",
    mensaje: "Mensaje de la donacion",
  },
  {
    fecha: "18/2/2024",
    hash: "0xh4ad454v67h27hh28u4h2",
    cantidad: "$150.7",
    wallet: "0xh4ad454v67h27hh28u4h2",
    twitter: "asd",
    mensaje: "Mensaje de la donacion",
  },
  {
    fecha: "18/2/2024",
    hash: "0xh4ad454v67h27hh28u4h2",
    cantidad: "$150.7",
    wallet: "0xh4ad454v67h27hh28u4h2",
    twitter: "asd",
    mensaje: "Mensaje de la donacion",
  },
  {
    fecha: "18/2/2024",
    hash: "0xh4ad454v67h27hh28u4h2",
    cantidad: "$150.7",
    wallet: "0xh4ad454v67h27hh28u4h2",
    twitter: "asd",
    mensaje: "Mensaje de la donacion",
  },
];
