/* eslint-disable react/prop-types */
import token from "../../public/token.gif";
import { GiDiploma } from "react-icons/gi";
import { IoMdOpen } from "react-icons/io";

const CocayInfo = ({
  yaCompro,
  setModalGenerateCode,
  setModalStake,
  setModalEarnCocays,
  setModalTeams,
}) => {
  return (
    <div className="bg-back p-2 rounded-[18px] w-full relative">
      {!yaCompro && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-90 rounded-[18px] w-full h-full flex justify-center items-center">
          <p className="text-2xl text-center">
            Compra cocays para habilitar esta seccion.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[10px] items-center">
          <p>Cocay Token: 10000</p>
          <img src={token} alt="Token Gif" className="object-cover w-[35px]" />
        </div>
        <div className="flex gap-[10px] items-center">
          <p>NFTs: 1</p>
          <GiDiploma className="text-primary text-3xl" />
          <IoMdOpen className="text-white text-3xl" />
        </div>
        <div className="flex gap-[10px] items-center">
          <p>Stake Time Remind:</p>
        </div>
        <div className="flex gap-[10px] items-center">
          <div className="w-full mt-[20px] flex flex-wrap justify-center items-center gap-[5px]">
            <button
              onClick={() => setModalEarnCocays(true)}
              className="bg-white px-4 py-2 rounded-[18px] text-black"
            >
              EARN COCAYS
            </button>
            <button
              onClick={() => setModalStake(true)}
              className="bg-white px-4 py-2 rounded-[18px] text-black"
            >
              STAKE
            </button>
            <button
              onClick={() => setModalTeams(true)}
              className="bg-white px-4 py-2 rounded-[18px] text-black"
            >
              TEAMS
            </button>
            <button
              onClick={() => setModalGenerateCode(true)}
              className="bg-white px-4 py-2 rounded-[18px] text-black"
            >
              GENERATE CODE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocayInfo;
