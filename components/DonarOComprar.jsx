import { useEffect, useState } from "react";
import token from "../public/token.gif";
import Comprar from "./comprar/Comprar";
import Donar from "./Donar";
import {  useAddress, useWallet } from "@thirdweb-dev/react";
const DonarOComprar = ({
  loggedTwitter,
  setLoggedTwitter,
  modalLoginTwitter,
  setModalLoginTwitter,
  _googleUserName
}) => {
  const [comprar, setComprar] = useState(false);
  const [donar, setDonar] = useState(false);
  const [tipo, setTipo] = useState("Billtera")
  const [email, setEmail] = useState("Cargando...")


  const wallet = useAddress()
  const connectedWallet = useWallet()

  const getEmail = () =>{

    if (!connectedWallet) {
      console.error("connectedWallet is undefined");
      return;
    }

    const personalwallet = connectedWallet.getPersonalWallet();
    console.log(personalwallet)
    if(personalwallet && (personalwallet).walletId === 'embeddedWallet') {
     const email = (personalwallet).connector?.user?.authDetails?.email;
     console.log(email)
     setTipo("Email")
     setEmail(email)
     return email;
   }
 }

 useEffect(() => {
  getEmail()
 }, [wallet])
 

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
            <span className="text-primary font-semibold">{tipo === "Email" ? <>{} {email}</> : wallet ? `${wallet.substring(0, 4)}...${wallet.substring(wallet.length - 4)}` : ''}</span>
          </p>
          <div className="flex gap-[20px] flex-wrap mt-[20px]">
           {/* <button onClick={() => setDonar(true)} className="button-3d-2">
              Donar
            </button>*/}
            <button onClick={() => setComprar(true)} className="button-3d-1">
              Ir a mi Dashboard
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
          _googleUserName={_googleUserName}
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
