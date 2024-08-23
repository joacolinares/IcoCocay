import { IoMdArrowRoundBack } from "react-icons/io";
import LoginTwitterModal from "../../LoginTwitterModal";
import { useState } from "react";

const AgradecimientoDeCompra = ({
  setAgradecimiento,
  loggedTwitter,
  setLoggedTwitter,
  modalLoginTwitter,
  setModalLoginTwitter,
  _connectWithX,
  _accessToken,
  _accessSecret
}) => {
  // const tweetMessage = "¡Gracias por ser parte de Cocay Token!";
  // const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetMessage)}`;

  const [loading, setLoading] = useState(false)

  const makeTwitterPost = async () => {

    setLoading(true)

    const data = {
      at: _accessToken,
      as: _accessSecret
    }

    const response = await fetch('http://localhost:8000/post-gratitude', {
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
    <div className="relative bg-back w-full max-w-[700px] my-8 rounded-[18px] border-2 border-primary h-fit pb-12 p-2">
      <button
        onClick={() => {
          //Vuelve para atras
          setAgradecimiento(false);
        }}
        className="absolute left-2 top-2"
      >
        <IoMdArrowRoundBack className="text-4xl text-white" />
      </button>
      <div className="mt-12 w-full flex flex-col gap-[10px] items-center">
        <div className="flex flex-col text-center">
          <p className="text-xl font-semibold">
            Gracias por ser parte de Cocay Token!
          </p>
        </div>
        <div className="flex justify-center items-center flex-wrap gap-[10px]">
          <button
            onClick={() => {
              setAgradecimiento(false);
            }}
            className="button-3d-1 "
          >
            Cerrar
          </button>

          {/* <button
            onClick={() => {
              if (!loggedTwitter) {
                setModalLoginTwitter(true);
              } else {
                window.open(tweetUrl, "_blank");
              }
            }}
            className="button-3d-1 "
          >
            Twittear
          </button> */}

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
          </button>

        </div>
      </div>
      {modalLoginTwitter && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-95 w-full h-full rounded-[18px] flex justify-center items-center">
          <LoginTwitterModal
            modalLoginTwitter={modalLoginTwitter}
            setModalLoginTwitter={setModalLoginTwitter}
            loggedTwitter={loggedTwitter}
            setLoggedTwitter={setLoggedTwitter}
          />
        </div>
      )}
    </div>
  );
};

export default AgradecimientoDeCompra;
