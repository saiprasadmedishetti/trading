import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import api from "../Axios";
import { Chart as LineChart } from "react-charts";

import moment from "moment";
import Loader from "./Loader";

function Chart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let trackerId = useRouteMatch().params.id;

  const fetchDataById = () => {
    setLoading(true);
    api.get(`/coins/${trackerId}/ohlc?vs_currency=usd&days=180`).then((res) => {
      console.log("res", res);
      res.data.map((dt) => {
        dt.splice(2, 4);
        dt[0] = moment(dt[0]).format("DD/MM/YYYY");
        return dt;
      });
      setData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchDataById();
    console.log(data);
    return () => {
      fetchDataById();
    };
  }, [trackerId]);

  const chartData = React.useMemo(
    () => [
      {
        label: "Series 1",
        series: 10,
        data: data ? data : [],
      },
    ],
    [data]
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    [data]
  );
  const options = React.useMemo(
    () => [
      {
        series: 10,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day",
              },
            },
          ],
        },
      },
    ],
    []
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="card card-body shadow">
          <div
            style={{
              width: "1150px",
              maxWidth: "100%",
              height: "400px",
              margin: "auto",
              overflow: "visible",
            }}
          >
            <LineChart data={chartData} axes={axes} options={options} tooltip />
          </div>
        </div>
      )}
    </>
  );
}

export default Chart;
