import xLogo from "/icons/x.svg";

const LoginTwitterModal = ({
  setModalLoginTwitter,
  loggedTwitter,
  setLoggedTwitter,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-between h-full p-4 max-h-[250px]">
      <p className="text-xl font-semibold text-center">
        Logueate con Twitter para apoyar la comunidad!
      </p>
      <button
        onClick={() => setLoggedTwitter(true)}
        className={`bg-white text-primary font-semibold rounded-[18px] px-4 py-2 flex gap-[10px] items-center border-2 ${
          loggedTwitter ? "border-green-500" : "border-red-500"
        }`}
      >
        <img src={xLogo} alt="x" className="object-cover w-[35px]" />
        <p>Logueate con X</p>
      </button>
      <div className="flex items-center gap-[10px]">
        <button
          onClick={() => setModalLoginTwitter(false)}
          className="button-3d-1"
        >
          Cancelar
        </button>
        <button
          onClick={() => setModalLoginTwitter(false)}
          className="button-3d-2"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default LoginTwitterModal;
