import token from "../public/token.gif";

import x from "../public/icons/x.svg";

import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ConnectWallet = ({ setLoggedIn }) => {
  const [loggedWallet, setLoggedWallet] = useState(false);
  const [loggedX, setLoggedX] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center gap-[20px]">
        {/* Tutoriales */}
        <div className="aspect-video w-full max-w-[700px] bg-slate-300">
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
        <div className="aspect-video w-full max-w-[700px] bg-slate-300">
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
            className="mt-[20px] border border-white px-4 py-2 rounded-[18px] bg-primary text-white font-semibold disabled:opacity-50"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
