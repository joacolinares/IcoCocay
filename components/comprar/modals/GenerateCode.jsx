import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Web3Button} from "@thirdweb-dev/react";
import abiIco from '../../../public/abis/ico.json';
import { Binance } from "@thirdweb-dev/chains";
import { useSigner, ThirdwebSDK,useAddress } from "@thirdweb-dev/react";



// eslint-disable-next-line react/prop-types
const GenerateCode = ({ setModalGenerateCode }) => {
  const [siguiente, setSiguiente] = useState(false);
  const [name, setName] = useState('');
  const [refferal, setRefferal] = useState('');
  const [amount, setAmount] = useState('');
  const [cantReferral, setCantReferral] = useState({
    data: 0,
    status: false
  })
  const signer = useSigner() 
  const wallet = useAddress()



  const loadInfo = async() =>{
    const sdk = ThirdwebSDK.fromSigner(signer, Binance);
    const contractCocay = await sdk.getContract(
      "0x6C3C25145668015a274159984AC8ED99EC3Eb7d6", 
      abiIco,
    );
    const porcentaje = await contractCocay.call(
      "porcentaje", 
      [wallet]
    );
    console.log(porcentaje)

    setCantReferral({
      data: parseInt(porcentaje._hex,16),
      status:true
    })

  }
  useEffect(() => {
    loadInfo()
  }, [])
  

  return (
    <div className="relative bg-back w-full max-w-[700px] my-8 rounded-[18px] border-2 border-primary h-fit pb-12 p-2">
      <button
        onClick={() => {
          //Vuelve para atras
          setModalGenerateCode(false);
        }}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>
      {!siguiente ? (
        <div className="mt-12 w-full flex flex-col gap-[10px] items-center">
          <div className="flex flex-col">
          <div className="flex flex-col">
          <label>Nuevo codigo para el referido:</label>
            
          <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={"Codigo"}
          type="text"
          className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
        />
        </div>
        <br />
        <div className="flex flex-col">
        <label>Wallet del referido:</label>
          <input
          value={refferal}
          onChange={(e) => setRefferal(e.target.value)}
          placeholder={"0x123342fv23"}
          type="text"
          className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
        />
        </div>
        <br />
        <div className="flex flex-col">
        <label>Porcentaje a repartir:</label>
          <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={"0"}
          type="text"
          className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
        />
        </div>
          </div>
          <label>Cantidad disponible a repartir: 0 - {cantReferral.status &&cantReferral.data / 10} %</label>
          <Web3Button
            contractAddress="0x6C3C25145668015a274159984AC8ED99EC3Eb7d6" // Your smart contract address
            contractAbi={abiIco}
            action={async (contract) => {
              console.log(name,refferal,amount)
              await contract.call(
                "addSponsor", 
                [name,refferal,amount * 10]
              );
            }}
            onSuccess={() =>{alert("TODO BIEN")}
              
            }
            onError={()=>{console.log("ERROR")}}
          >
            Crear Código
          </Web3Button>
          {/*<button onClick={() => setSiguiente(true)} className="button-3d-1">
            Siguiente
          </button>*/}
        </div>
      ) : (
        <div className="mt-12 w-full flex flex-col gap-[10px] items-center">
          <div className="flex flex-col">
            <label>Porcentaje Disponible:</label>
            <input
              type="number"
              defaultValue={6}
              className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
            />
          </div>
          <div className="flex flex-col">
            <label>Porcentaje a repartir:</label>
            <input
              type="number"
              defaultValue={3}
              className="rounded-[18px] p-2 text-white border border-orange-500 bg-black"
            />
          </div>
          <p>Wallet USDT BNB: 0x4i5ni5jn3463</p>
          <button
            onClick={() => setModalGenerateCode(false)}
            className="button-3d-1"
          >
            GENERAR
          </button>
          
        </div>
      )}
    </div>
  );
};

export default GenerateCode;
