import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import UserInfo from "./UserInfo";
import CocayInfo from "./CocayInfo";
import Camaras from "./modals/Camaras";
import { useEffect, useState } from "react";
import BuyCocay from "./comprar-modal/BuyCocay";
import DonationsOrTransactions from "./DonationsOrTransactions";
import PeopleTransactions from "./PeopleTransactions";
import GenerateCode from "./modals/GenerateCode";
import Stake from "./modals/Stake";
import EarnCocays from "./modals/EarnCocays";
import Teams from "./modals/Teams";
import OfreceSwap from "./modals/OfreceSwap";
import { useAddress, ThirdwebSDK, useSigner } from "@thirdweb-dev/react";
import abiToken from '../../public/abis/token.json';
import { Binance } from "@thirdweb-dev/chains";
import { ethers } from "ethers";
import abiIco from '../../public/abis/ico.json';

const Comprar = ({
  setComprar,
  setDonar,
  loggedTwitter,
  setLoggedTwitter,
  modalLoginTwitter,
  setModalLoginTwitter,
}) => {
  const [yaCompro, setYaCompro] = useState(true);
  const [buyCocay, setBuyCocay] = useState(false);
  const [modalAvances, setModalAvances] = useState(false);
  const [modalGenerateCode, setModalGenerateCode] = useState(false);
  const [modalStake, setModalStake] = useState(false);
  const [modalEarnCocays, setModalEarnCocays] = useState(false);
  const [modalTeams, setModalTeams] = useState(false);
  const [detectoUSDT, setDetectoUSDT] = useState(true);
  const [balanceCocay, setBalanceCocay] = useState(0);
  const [cantInv, setCantInv] = useState(0);
  
  const [sponsor, setSponosor] = useState(0);
  const [codigoReferido, setCodigoReferido] = useState(0);

  const [parentMessage, setParentMessage] = useState("");
  const [sponsorCodeMessage, setSponsorCodeMessage] = useState("");

  const wallet = useAddress();
  const signer = useSigner();

  const data = async () => {
    const sdk = ThirdwebSDK.fromSigner(signer, Binance);
    const contractCocayToken = await sdk.getContract(
      "0x68d54B7C15CbdEC9B632A261D45f5D8786DD3530",
      abiToken,
    );

    const balanceCocay = await contractCocayToken.call(
      "balanceOf",
      [wallet]
    );

    console.log(balanceCocay);
    setBalanceCocay(parseFloat(ethers.utils.formatUnits(balanceCocay, 18)));

    const contractCocay = await sdk.getContract(
      "0x708B2FbFfa4f28a0b0e22575eA2ADbE1a8Ab0e0E", 
      abiIco,
    );

    const parent = await contractCocay.call(
      "parent", 
      [wallet]
    );
    const sponsorCodesOfWallet = await contractCocay.call(
      "sponsorCodesOfWallet", 
      [wallet]
    );

    const cantInv = await contractCocay.call(
      "cantInv", 
      []
    );
    console.log(cantInv)
    setCantInv(parseFloat(ethers.utils.formatUnits(cantInv, 18)));
    console.log(parent);
    console.log(sponsorCodesOfWallet);

    // Update messages based on the data received
    if (parent.toLowerCase() === "0x0000000000000000000000000000000000000000") {
      setParentMessage("No tienes Patrocinador");
    } else {
      setParentMessage(`${parent}`);
    }

    if (sponsorCodesOfWallet === "") {
      setSponsorCodeMessage("No tienes código aún");
    } else {
      setSponsorCodeMessage(`${sponsorCodesOfWallet}`);
    }
  };

  useEffect(() => {
    console.log("data");
    data();
  }, [wallet]);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(sponsorCodeMessage)
      .then(() => {
        alert("Código de referido copiado al portapapeles");
      })
      .catch(err => {
        console.error("Error al copiar el código de referido: ", err);
      });
  };

  return (
    <div className="w-full py-8 bg-black bg-opacity-80 border border-primary flex flex-col gap-[10px] items-center rounded-[18px] relative p-2 sm:p-4">
      <button
        onClick={() => setComprar(false)}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>
      <div className="mt-8 w-full flex flex-col gap-[10px]">
        <div className="flex gap-[10px] items-center">
          <p>
          Patrocinador: <span className="text-orange-500">{parentMessage}</span>
            <br />
           Codigo de referidos: <span onClick={copyToClipboard} className="text-orange-500">{sponsorCodeMessage}</span>
          </p>
          {/*<button >
            <FaCopy className="text-xl" />
          </button>*/}
        </div>
        <br />
        <div className="flex gap-[10px] flex-wrap justify-center">
          <button onClick={() => setBuyCocay(true)} className="button-3d-2">
            Comprar Cocay
          </button>
          <button
            onClick={() => {
              setComprar(false);
              setDonar(true);
            }}
            className="button-3d-2"
          >
            Donar
          </button>
          <button onClick={() => setModalTeams(true)} className="button-3d-2">
            Mi Red
          </button>
         {/* <button disabled={!yaCompro} className="button-3d-2">
            Mis Códigos
          </button>*/}
          <button
            onClick={() => setModalGenerateCode(true)}
            className="button-3d-2"
          >
            GENERAR CÓDIGO
          </button>
        </div>
      </div>
      <div className="flex justify-between max-md:flex-wrap gap-[5px] w-full">
        <UserInfo />
        <CocayInfo
          balanceCocay={balanceCocay}
          yaCompro={yaCompro}
          setModalGenerateCode={setModalGenerateCode}
          setModalStake={setModalStake}
          setModalEarnCocays={setModalEarnCocays}
          setModalTeams={setModalTeams}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-[10px]">
        <button onClick={() => setModalAvances(true)} className={`button-3d-1`}>
          Avances
        </button>
        <a href="https://drive.google.com/drive/folders/1qvpAyLTP8aKQsPKlCanEy2THV7L5tCL1"><button  className={`button-3d-1`}>Whitepaper</button></a>
        <a href="https://drive.google.com/file/d/1JktHqJdwwbNR1iae-lhYCOt7RsaMmHCm/view?usp=drivesdk"><button className={`button-3d-1`}>Curriculum VITAE</button></a>
       <a href="https://drive.google.com/drive/folders/1RsHZPwcxTnMYIkhvGXYroo3_Q3dszxiA"> <button className={`button-3d-1`}>Brochure Cocay</button></a>
        <a href="https://bscscan.com/address/0x708B2FbFfa4f28a0b0e22575eA2ADbE1a8Ab0e0E"><button disabled={!yaCompro} className={`button-3d-1`}>
          Contratos
        </button></a>
        <button className={`button-3d-1`}>Tutoriales</button>
      </div>

      <div className="flex justify-between max-md:flex-wrap gap-[5px] w-full">
        <div className="bg-back rounded-[18px] w-full">
          <DonationsOrTransactions yaCompro={yaCompro} />
        </div>
      </div>
      {buyCocay && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center">
          <BuyCocay
          cantInv={cantInv}
            setBuyCocay={setBuyCocay}
            loggedTwitter={loggedTwitter}
            setLoggedTwitter={setLoggedTwitter}
            modalLoginTwitter={modalLoginTwitter}
            setModalLoginTwitter={setModalLoginTwitter}
          />
        </div>
      )}
      {modalAvances && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center items-center">
          <Camaras setModalAvances={setModalAvances} />
        </div>
      )}
      {modalGenerateCode && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center">
          <GenerateCode setModalGenerateCode={setModalGenerateCode} />
        </div>
      )}
      {modalStake && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center items-center">
          <Stake setModalStake={setModalStake} />
        </div>
      )}
      {modalEarnCocays && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center items-center">
          <EarnCocays setModalEarnCocays={setModalEarnCocays} />
        </div>
      )}
      {modalTeams && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center">
          <Teams setModalTeams={setModalTeams} />
        </div>
      )}
      {/*detectoUSDT && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center">
          <OfreceSwap setDetectoUSDT={setDetectoUSDT} />
        </div>
      )*/}
    </div>
  );
};

export default Comprar;
