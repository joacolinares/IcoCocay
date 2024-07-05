import { FaCamera } from "react-icons/fa";

const Camaras = () => {
  return (
    <div className="bg-back p-2 rounded-[18px] w-full">
      <div className="grid grid-cols-2 gap-[5px]">
        {camaras.map((camara, i) => (
          <div
            key={i}
            className="p-2 bg-[#585858] bg-opacity-50 w-full flex justify-center items-center aspect-square rounded-[18px]"
          >
            <FaCamera className="text-5xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Camaras;

const camaras = [
  {
    nombre: "camara1",
  },
  {
    nombre: "camara1",
  },
  {
    nombre: "camara1",
  },
  {
    nombre: "camara1",
  },
];
