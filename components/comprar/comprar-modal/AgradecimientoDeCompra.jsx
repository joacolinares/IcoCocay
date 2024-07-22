import { IoMdArrowRoundBack } from "react-icons/io";
import LoginTwitterModal from "../../LoginTwitterModal";

const AgradecimientoDeCompra = ({
  setAgradecimiento,
  loggedTwitter,
  setLoggedTwitter,
  modalLoginTwitter,
  setModalLoginTwitter,
}) => {
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

          <button
            onClick={() => {
              if (!loggedTwitter) {
                setModalLoginTwitter(true);
              } else {
                //Ir a twitter con el mensaje de donacion y entrar a el dashboard de compra de cocays
              }
            }}
            className="button-3d-1 "
          >
            Twittear Donación
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
