import token from "../../public/token.gif";

// eslint-disable-next-line react/prop-types
const LastTransactions = ({ yaCompro }) => {
  return (
    <div className="rounded-[18px] w-full">
      <p>Tus últimas transacciones:</p>
      {yaCompro ? (
        <div className="flex flex-col gap-[10px] mt-[10px]">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white text-black px-2 py-2 flex flex-col sm:flex-row items-center justify-between rounded-[18px]"
            >
              <div className=" flex flex-col sm:flex-row gap-[10px] items-center p-1 text-center sm:text-start">
                <div className="overflow-hidden w-full">
                  <p className="break-words text-xs sm:text-base">
                    Wallet address: 0x1234567890abcdef
                  </p>
                  <p>{transaction.date}</p>
                  <p>{transaction.time}</p>
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <div className="flex items-center">
                  <p className="">+ ${transaction.amount}</p>
                  <img
                    src={token}
                    alt="Cocay logo"
                    className="w-[40px] object-cover"
                  />
                </div>
                <p>Fee: ${transaction.fee}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-base underline mt-[20px]">
          Todavía no has comprado cocays!!
        </p>
      )}
    </div>
  );
};

export default LastTransactions;

const transactions = [
  {
    id: 1,
    amount: 0.0001,
    fee: 0.0000001,
    currency: "Aleatory",
    price: 1000,
    date: "2022-01-01",
    time: "13:00:23",
  },
  {
    id: 2,
    amount: 0.0001,
    fee: 0.0000001,
    currency: "Aleatory",
    price: 1000,
    date: "2022-01-01",
    time: "13:00:23",
  },
];
