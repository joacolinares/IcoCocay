import { useState } from "react";
import ConnectWalletComp from "./ConnectWallet";
import DonarOComprar from "./DonarOComprar";

const Pasos = () => {
  //Si no estan logueados, se loguean en ConnectWallet, si lo estan, se les muestra DonarOComprar
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedTwitter, setLoggedTwitter] = useState(false);
  const [modalLoginTwitter, setModalLoginTwitter] = useState(false);
  const [googleUserName, setGoogleUserName] = useState('')

  return (
    <div className="text-white w-full h-full max-w-[1200px]">
      {!loggedIn ? (<>
        
        <ConnectWalletComp setLoggedIn={setLoggedIn} _setGoogleUserName={setGoogleUserName} />
      
      </>
      ) : (
        <DonarOComprar
          loggedTwitter={loggedTwitter}
          setLoggedTwitter={setLoggedTwitter}
          modalLoginTwitter={modalLoginTwitter}
          setModalLoginTwitter={setModalLoginTwitter}
          _googleUserName={googleUserName}
        />
      )}
    </div>
  );
};

export default Pasos;
