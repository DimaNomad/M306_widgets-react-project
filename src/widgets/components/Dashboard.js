import React from "react";
import { Chart } from 'react-charts'


function Dashboard({ price, data }) {
  const primaryAxis = React.useMemo(
    () => ({
      getValue: data => data.label
      
    })
  )

  if (price === "0.00") {
    return <h2>please select a currency pair</h2>;
  }
  return (
    <div className="dashboard">
      <h2>{`$${price}`}</h2>
      <div className="chart-container">
      <Chart options={{data, primaryAxis}} />
      </div>
    </div>
  );
}
export default Dashboard;