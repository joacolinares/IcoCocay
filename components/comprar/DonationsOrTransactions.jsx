import { useState } from "react";
import InfoDonaciones from "./InfoDonaciones";
import LastTransactions from "./LastTransactions";

// eslint-disable-next-line react/prop-types, no-unused-vars
const DonationsOrTransactions = ({ yaCompro }) => {
  //La idea es que cuando compren, se ponga como default el estado "trasactions"
  const [mode, setMode] = useState("donations");

  return (
    <div className="relative w-full pt-[50px] p-2">
      <div className="absolute top-0 left-0 flex gap-[5px] w-full justify-center">
        <button
          onClick={() => setMode("donations")}
          className={`bg-[#494949] px-4 py-2 rounded-b-[18px] ${
            mode === "donations" ? "border border-t-0 border-orange-500" : ""
          }`}
        >
          Donaciones
        </button>
        <button
          onClick={() => setMode("transactions")}
          className={`bg-[#494949] px-4 py-2 rounded-b-[18px] ${
            mode === "transactions" ? "border border-t-0 border-orange-500" : ""
          }`}
        >
          Mis transacciones
        </button>
      </div>
      {mode === "donations" ? (
        <InfoDonaciones />
      ) : (
        <LastTransactions yaCompro={yaCompro} />
      )}
    </div>
  );
};

export default DonationsOrTransactions;
