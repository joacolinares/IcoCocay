import { IoMdArrowRoundBack } from "react-icons/io";
import x from "/icons/x.svg";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const EarnCocays = ({ setModalEarnCocays, _connectWithX, _accessToken, _accessSecret }) => {

  const [loading, setLoading] = useState(false)

  const makeTwitterPost = async () => {

    setLoading(true)

    const data = {
      at: _accessToken,
      as: _accessSecret,
      earned: 15
    }

    const response = await fetch('http://localhost:8000/share-cocay-earns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.status === 200) {
      setLoading(false)
      alert('Post creado con éxito')
    }
    else {
      setLoading(false)
      alert('Error al crear post')
    }
  }

  return (
    <div key={_accessToken} className="relative bg-back w-full max-w-[700px] my-8 rounded-[18px] border-2 border-primary h-fit pb-12 p-2">
      <button
        onClick={() => {
          //Vuelve para atras
          setModalEarnCocays(false);
        }}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>

      <div className="mt-12 w-full flex flex-col gap-[30px] items-center">
        <p className="text-2xl font-semibold text-orange-500">Ganados</p>
        <div className="flex flex-col items-center gap-[20px] bg-[#3d3d3d] px-4 py-2 rounded-[18px] border border-orange-500">
          <div className="text-xl font-medium">Staking Cocays = 0</div>
          <div className="text-xl font-medium">Teams Cocays = 0</div>
        </div>

        <div className="flex gap-[10px]">
          <button
            onClick={() => {
              //Vuelve para atras
              setModalEarnCocays(false);
            }}
            className="button-3d-1"
          >
            Cerrar
          </button>
          <button
            onClick={() => { _accessToken ? makeTwitterPost() : _connectWithX() }}
            className="button-3d-2 !flex flex-wrap justify-center items-center gap-[10px]"
            disabled={loading}
          >
            {!_accessToken ? (
              <p>Conecta para compartir</p>
            ) : (
              <> {!loading ? <p>Compartir en</p> : <p>Cargando..</p>} </>
            )}


            <span>
              <img src={x} alt="X" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarnCocays;
