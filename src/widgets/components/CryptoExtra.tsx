import React from "react";
import "../style/CryptoExtra.css";

interface CryptoExtraProps {
  symbol: any;
  rank: any;
  cap: any;
  vol: any;
  arr: any;
  link: any;
}

const CryptoExtra: React.FC<CryptoExtraProps> = (props: CryptoExtraProps) => {
  const { symbol, rank, cap, vol, arr, link } = props;
  return (
    <div
      className="extraInfo"
      style={
        arr
          ? {
              height: "150px",
            }
          : { height: "0px" }
      }
    >
      <div className="symbol">{symbol}</div>
      <div className="rank">Rank: {rank}</div>

      <div>Cap: ${Math.floor(cap / 1000000).toFixed(2)}M</div>
      <div>Vol: ${Math.floor(vol / 1000000).toFixed(2)}M</div>
      <p className="website">
        <a href={link}>{link}</a>
      </p>
    </div>
  );
};
export default CryptoExtra;
