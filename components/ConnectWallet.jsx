import token from "../public/token.gif";
import { IoCloseOutline } from "react-icons/io5";

import x from "../public/icons/x.svg";

import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ConnectWallet = ({ setLoggedIn }) => {
  //estados para manejar los modals de tutoriales
  const [tutoriales, setTutoriales] = useState(false);
  const [tutorialDonacion, setTutorialDonacion] = useState(false);
  const [tutorialCompra, setTutorialCompra] = useState(false);
  //estados para ver si puede continuar (Ya conecto wallet y X)
  const [loggedWallet, setLoggedWallet] = useState(false);
  const [loggedX, setLoggedX] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center gap-[20px]">
        {/* Tutoriales */}
        <button
          onClick={() => setTutoriales(true)}
          className="mt-[20px] button-3d-2"
        >
          Tutoriales
        </button>
        {tutoriales && (
          <div className="bg-black bg-opacity-90 absolute top-0 left-0 w-full h-full flex flex-col items-center p-2 z-10">
            <div className="bg-black bg-opacity-50 border border-primary rounded-[18px] p-4 relative md:w-[70%] flex flex-col items-center">
              {!tutorialDonacion && !tutorialCompra ? (
                <div className="flex gap-[20px]">
                  <button
                    onClick={() => setTutorialDonacion(true)}
                    className="mt-12 button-3d-2"
                  >
                    Tutorial Donacion
                  </button>
                  <button
                    onClick={() => setTutorialCompra(true)}
                    className="mt-12 button-3d-2"
                  >
                    Tutorial Compra
                  </button>
                </div>
              ) : tutorialDonacion ? (
                <div className="mt-12 w-full max-w-[700px] aspect-video bg-slate-300">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/-ISfTD17gEw?si=lcgBbEWDDYcK5I-Y"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="mt-12 aspect-video w-full max-w-[700px] bg-slate-300">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/-ISfTD17gEw?si=lcgBbEWDDYcK5I-Y"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <button
                onClick={() => {
                  setTutoriales(false);
                  setTutorialDonacion(false);
                  setTutorialCompra(false);
                }}
                className="absolute right-0 top-0"
              >
                <IoCloseOutline className="text-5xl" />
              </button>
            </div>
          </div>
        )}

        {/* Connect Wallet */}
        <div className="w-full py-8 bg-black bg-opacity-80 border border-primary flex flex-col gap-[10px] items-center rounded-[18px]">
          <img
            src={token}
            alt="Token Gif"
            className="object-cover max-w-[200px] md:max-w-[500px]"
          />
          <p className="text-xl font-semibold">
            Conectate con tu wallet favorita!
          </p>
          <button
            onClick={() => setLoggedWallet(true)}
            className={`bg-white text-primary font-semibold rounded-[18px] px-4 py-2 flex gap-[10px] items-center border-2 ${
              loggedWallet ? "border-green-500" : "border-red-500"
            }`}
          >
            <p>Connect wallet</p>
          </button>

          <p className="text-xl font-semibold text-center">
            Logueate con Twitter para apoyar la comunidad!
          </p>

          <button
            onClick={() => setLoggedX(true)}
            className={`bg-white text-primary font-semibold rounded-[18px] px-4 py-2 flex gap-[10px] items-center border-2 ${
              loggedX ? "border-green-500" : "border-red-500"
            }`}
          >
            <img src={x} alt="x" className="object-cover w-[35px]" />
            <p>Log in with X</p>
          </button>

          <button
            onClick={() => {
              if (loggedWallet && loggedX) {
                setLoggedIn(true);
              }
            }}
            disabled={!(loggedWallet && loggedX)}
            className="mt-[20px] button-3d-1"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
