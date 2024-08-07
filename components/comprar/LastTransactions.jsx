import { ethers } from "ethers";
import abi from "../../public/abis/ico.json";
import token from "../../public/token.gif";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

const LastTransactions = ({ yaCompro }) => {
  const wallet = useAddress();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!wallet) return;

      const provider = new ethers.providers.JsonRpcProvider("https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3");
      const contractAddress = "0xB02d23e27881fB6eAc740BDfA1AB81FF908435a1";
      const contract = new ethers.Contract(contractAddress, abi, provider);

      const eventSignature = ethers.utils.id("CocaysBought(address,uint256,string,uint256)");

      try {
        const currentBlock = await provider.getBlockNumber();
        const fromBlock = Math.max(currentBlock - 1000, 0); // Ajusta el rango de bloques según sea necesario
        const filter = {
          address: contractAddress,
          topics: [eventSignature],
          fromBlock: 41137000,
          toBlock: currentBlock
        };
        console.log(filter)
        const logs = await provider.getLogs(filter);
        console.log(logs)

        console.log("Logs:", logs);

        const parsedEvents = logs.map(log => contract.interface.parseLog(log));
        console.log("Parsed Events:", parsedEvents);

        const filteredEvents = parsedEvents.filter(event => event.args.buyer.toLowerCase() === wallet.toLowerCase());

        console.log("Filtered Events:", filteredEvents);

        const formattedEvents = await Promise.all(filteredEvents.map(async (event) => {
          const block = await provider.getBlock(event.blockNumber);
          return {
            id: event.transactionHash,
            buyer: event.args.buyer,
            amount: ethers.utils.formatUnits(event.args.amount, 18),
            sponsorCode: event.args.sponsorCode,
            total: ethers.utils.formatUnits(event.args.total, 18),
            date: new Date(block.timestamp * 1000).toLocaleDateString(),
            time: new Date(block.timestamp * 1000).toLocaleTimeString(),
          };
        }));

        console.log("Formatted Events:", formattedEvents);
        setTransactions(formattedEvents);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [wallet]);

  return (
    <div className="rounded-[18px] w-full">
      <p className="text-xl font-semibold">Tus últimas transacciones:</p>
      {yaCompro ? (
        transactions.length > 0 ? (
          <div className="flex flex-col gap-[10px] mt-[10px]">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-secondaryback text-white px-2 py-2 flex flex-col sm:flex-row items-center justify-between rounded-[18px]"
              >
                <div className="flex flex-col sm:flex-row gap-[10px] items-center p-1 text-center sm:text-start">
                  <div className="overflow-hidden w-full">
                    <p className="break-words text-xs sm:text-base">
                      Wallet address: {transaction.buyer}
                    </p>
                    <p>{transaction.date}</p>
                    <p>{transaction.time}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <div className="flex items-center">
                    <p>+ ${transaction.amount}</p>
                    <img
                      src={token}
                      alt="Cocay logo"
                      className="w-[40px] object-cover"
                    />
                  </div>
                  <p>Total: ${transaction.total}</p>
                  <p>Sponsor Code: {transaction.sponsorCode}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-base underline mt-[20px]">Ninguna transacción</p>
        )
      ) : (
        <p className="text-base underline mt-[20px]">Todavía no has comprado cocays!!</p>
      )}
    </div>
  );
};

export default LastTransactions;
