import xLogo from "/icons/x.svg";

const LoginTwitterModal = ({
  modalLoginTwitter,
  setModalLoginTwitter,
  loggedTwitter,
  setLoggedTwitter,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-between h-full p-4">
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
      <button
        onClick={() => setModalLoginTwitter(false)}
        className="button-3d-1"
      >
        Continuar
      </button>
    </div>
  );
};

export default LoginTwitterModal;
