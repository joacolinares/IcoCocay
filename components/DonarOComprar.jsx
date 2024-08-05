import { useState } from "react";
import token from "../public/token.gif";
import Comprar from "./comprar/Comprar";
import Donar from "./Donar";
import {  useAddress} from "@thirdweb-dev/react";
const DonarOComprar = ({
  loggedTwitter,
  setLoggedTwitter,
  modalLoginTwitter,
  setModalLoginTwitter,
}) => {
  const [comprar, setComprar] = useState(false);
  const [donar, setDonar] = useState(false);

  const wallet = useAddress()

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
            Bienvenido {" "}
            <span className="text-primary font-semibold">{`${wallet.slice(0, 4)}...${wallet.slice(-4)}`}</span>
          </p>
          <div className="flex gap-[20px] flex-wrap mt-[20px]">
            <button onClick={() => setDonar(true)} className="button-3d-2">
              Donar
            </button>
            <button onClick={() => setComprar(true)} className="button-3d-1">
              Comprar
            </button>
          </div>
        </div>
      ) : comprar ? (
        <Comprar
          setComprar={setComprar}
          setDonar={setDonar}
          loggedTwitter={loggedTwitter}
          setLoggedTwitter={setLoggedTwitter}
          modalLoginTwitter={modalLoginTwitter}
          setModalLoginTwitter={setModalLoginTwitter}
        />
      ) : (
        <Donar
          setDonar={setDonar}
          setComprar={setComprar}
          loggedTwitter={loggedTwitter}
          setLoggedTwitter={setLoggedTwitter}
          modalLoginTwitter={modalLoginTwitter}
          setModalLoginTwitter={setModalLoginTwitter}
        />
      )}
    </div>
  );
};

export default DonarOComprar;
