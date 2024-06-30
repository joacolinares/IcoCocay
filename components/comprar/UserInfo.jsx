import gmail from "../../public/icons/gmail.svg";
import usdt from "../../public/icons/usdt.svg";
import bnb from "../../public/icons/bnb.svg";
import { FaWallet } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const UserInfo = () => {
  return (
    <div className="bg-back p-2 rounded-[18px] w-full">
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[10px] items-center">
          <p>Gmail</p>
          <img src={gmail} className="object-cover w-[30px]" />
          <p className="">cocay@gmail.com</p>
        </div>
        <div className="flex gap-[10px] items-center">
          <p>Wallet</p>
          <FaWallet className="text-2xl" />
          <p className="text-ellipsis overflow-hidden">
            0xh4ad454v67h27hh28u4h2
          </p>
        </div>
        <div className="flex gap-[10px] items-center">
          <p>USDT</p>
          <img src={usdt} className="object-cover w-[30px]" />
          <p>150.7</p>
        </div>
        <div className="flex gap-[10px] items-center">
          <p>BNB</p>
          <img src={bnb} className="object-cover w-[30px]" />
          <p>150.7</p>
        </div>
        <div className="flex gap-[10px] items-center">
          <p>Nickname: cocay123</p>
        </div>
        <div className="flex gap-[10px] items-center">
          <p>Twitter</p>
          <FaXTwitter className="text-2xl" />
          <p>cocay token</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
