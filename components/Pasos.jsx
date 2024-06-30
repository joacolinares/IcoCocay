import { useState } from "react";
import ConnectWallet from "./ConnectWallet";
import DonarOComprar from "./DonarOComprar";

const Pasos = () => {
  //Si no estan logueados, se loguean en ConnectWallet, si lo estan, se les muestra DonarOComprar
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="text-white w-full h-full max-w-[1200px]">
      {!loggedIn ? (
        <ConnectWallet setLoggedIn={setLoggedIn} />
      ) : (
        <DonarOComprar />
      )}
    </div>
  );
};

export default Pasos;
