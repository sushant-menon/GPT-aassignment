import React, { useEffect, useState } from "react";

const DataTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    const data = await fetch("https://api.coinlore.net/api/tickers/");
    const json = await data.json();
    console.log(json.data);
    setCryptoData(json.data);
  };

  const pageChange = currentPage => {
    if (
      currentPage >= 1 &&
      currentPage <= cryptoData.length / 10 &&
      currentPage !== page
    ) {
      setPage(currentPage);
    }
  };

  return (
    <div className="w-full px-16 py-16">
      <div className="border rounded-xl border-gray-900 h-full w-full text-center">
        {/* Heading and search */}
        <div className="py-8">
          <div className="flex items-center justify-around">
            <h1>DataTable</h1>
            <input
              className="outline-none rounded-lg px-2 py-3 w-72 bg-gray-600"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Crypto data list */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-4 border-gray-900 border-b-4 h-16 font-extrabold text-xl">
              <th>ID</th>
              <th>Name</th>
              <th>Rank</th>
              <th>Price</th>
              <th>Percent Change(24hrs)</th>
              <th>Price(BTC)</th>
              <th>Market Cap(USD)</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.slice((page - 1) * 10, (page - 1) * 10 + 10).map(i => (
              <tr className="" key={i.id}>
                <td className="py-6">{i.id}</td>
                <td className="">{i.name}</td>
                <td className="">{i.rank}</td>
                <td className="">{i.price_usd}</td>

                <td>
                  <div className="flex border-b-0 items-center border-l-0 border-r-0 justify-center">
                    {i.percent_change_24h}

                    {i.percent_change_24h <= 0 ? (
                      <img
                        className="w-10 h-10 mix-blend-multiply"
                        src="https://i.pinimg.com/736x/41/86/fb/4186fb34d5fa7d01b5753bf668655fdc.jpg"
                      />
                    ) : (
                      <img
                        className="w-10 h-8 mix-blend-multiply"
                        src="https://logodix.com/logo/424893.png"
                      />
                    )}
                  </div>
                </td>

                <td className="">{i.price_btc}</td>
                <td className="">{i.market_cap_usd}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {cryptoData.length > 0 && (
          <div className="mt-10 flex justify-center items-center cursor-pointer">
            <span
              onClick={() => pageChange(page - 1)}
              className={`text-3xl ${page > 1 ? "" : "cursor-not-allowed"}`}
            >
              ◀️
            </span>
            {[...Array(cryptoData.length / 10)].map((_, i) => {
              return (
                <span
                  onClick={() => pageChange(i + 1)}
                  className={`rounded-full border-black border mx-3 py-2 px-4  cursor-pointer ${
                    page === i + 1
                      ? "bg-white/45 text-black font-bold"
                      : "bg-black text-white/60"
                  }`}
                  key={i}
                >
                  {i + 1}
                </span>
              );
            })}
            <span
              onClick={() => pageChange(page + 1)}
              className={`text-3xl cursor-pointer ${
                page < cryptoData.length / 10 ? "" : "cursor-not-allowed"
              }`}
            >
              ▶️
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
