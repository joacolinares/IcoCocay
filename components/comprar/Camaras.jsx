import { FaCamera } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const Camaras = ({ setModalAvances }) => {
  return (
    <div className="bg-back p-2 pt-[50px] rounded-[18px] relative h-fit w-full flex justify-center">
      <button
        onClick={() => {
          //Vuelve para atras
          setModalAvances(false);
        }}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-[5px] max-w-[500px] w-full">
        {camaras.map((camara, i) => (
          <div
            key={i}
            className="p-2 bg-secondaryback bg-opacity-50 w-full max-w-[350px] sm:max-w-[500px] min-w-[250px] flex justify-center items-center aspect-square rounded-[18px]"
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
