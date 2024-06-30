const InfoDonaciones = () => {
  return (
    <div className="bg-back p-2 rounded-[18px] w-full">
      <div className="flex flex-col gap-[10px]">
        <p className="text-center w-full text-2xl">Donaciones</p>
        <div className="w-full flex justify-between">
          <p>Fecha</p>
          <p>Hash</p>
          <p>Cantidad</p>
          <p>Wallet</p>
          <p>Links</p>
        </div>
        {donaciones.map((donacion, index) => (
          <div key={index} className="w-full flex justify-between text-sm">
            <p className="max-w-[50px] sm:max-w-[100px] text-ellipsis overflow-hidden">
              {donacion.fecha}
            </p>
            <p className="max-w-[50px] sm:max-w-[100px] text-ellipsis overflow-hidden">
              {donacion.hash}
            </p>
            <p className="max-w-[50px] sm:max-w-[100px] text-ellipsis overflow-hidden">
              {donacion.cantidad}
            </p>
            <p className="max-w-[50px] sm:max-w-[100px] text-ellipsis overflow-hidden">
              {donacion.wallet}
            </p>
            <p className="max-w-[50px] sm:max-w-[100px] text-ellipsis overflow-hidden">
              Links
            </p>
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
];
