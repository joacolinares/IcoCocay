import { useState } from "react";
import token from "../public/token.gif";
import Comprar from "./comprar/Comprar";
import Donar from "./Donar";

const DonarOComprar = () => {
  const [comprar, setComprar] = useState(false);
  const [donar, setDonar] = useState(false);

  return (
    <div>
      {!comprar && !donar ? (
        <div className="w-full py-8 bg-black bg-opacity-80 border border-primary flex flex-col gap-[10px] items-center rounded-[18px]">
          <img
            src={token}
            alt="Token Gif"
            className="object-cover max-w-[200px] md:max-w-[500px]"
          />
          <p>
            Bienvenid@{" "}
            <span className="text-primary font-semibold">Pepit@!</span>
          </p>
          <div className="flex gap-[20px] flex-wrap mt-[20px]">
            <button
              onClick={() => setDonar(true)}
              className="bg-primary text-white font-semibold rounded-[18px] px-4 py-2 flex gap-[10px] items-center"
            >
              <p>Donar</p>
            </button>
            <button
              onClick={() => setComprar(true)}
              className="bg-white text-primary font-semibold rounded-[18px] px-4 py-2 flex gap-[10px] items-center"
            >
              <p>Comprar</p>
            </button>
          </div>
        </div>
      ) : comprar ? (
        <Comprar setComprar={setComprar} />
      ) : (
        <Donar setDonar={setDonar} />
      )}
    </div>
  );
};

export default DonarOComprar;
