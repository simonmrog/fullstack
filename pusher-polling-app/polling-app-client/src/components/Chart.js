import { useState, useEffect } from "react";
import CanvasJSReact from "../assets/canvasjs.react";

import API from "../api/methods.js";

import pusher from "../services/pusher";

import styled from "styled-components";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Chart() {

  const [dataPoints, setDataPoints] = useState(
    [
      { label: "Windows", y: 0 },
      { label: "MacOS", y: 0 },
      { label: "Linux", y: 0 },
      { label: "Other", y: 0 }
    ]);
  
  useEffect(() => {
    async function getData() {
      const { data } = await API.get("/poll/results");
      const votes = data.data;
      const voteCounts = [
        { label: "Windows", y: 0 },
        { label: "MacOS", y: 0 },
        { label: "Linux", y: 0 },
        { label: "Other", y: 0 }
      ];
      votes.forEach(function (vote) {
        const index = voteCounts.findIndex(function (voteI) {
          return voteI.label === vote.os;
        });
        voteCounts[index].y += vote.points;
      });

      setDataPoints(voteCounts);
    }

    getData();
  }, []);

  useEffect(() => {

    function updateDataPoints(data) {
      const newData = dataPoints.map(function(os) {
        if (os.label === data.os) {
          os.y += data.points;
        }
        return os;
      });
      setDataPoints(newData);
    }

    const channel = pusher.subscribe("os-poll");
    channel.bind("os-vote", updateDataPoints);

    return function cleanup() {
      channel.unbind()
    }
  }, [dataPoints,]);

  function totalVotes() {
    return dataPoints.reduce(function (acum, vote) {
      return acum + vote.y;
    }, 0);
  }

  const chartConfig = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title:{
      text: `Total votes: ${totalVotes()}`
    },
    axisY: {
      includeZero: true
    },
    data: [{
      type: "column", //change type to bar, line, area, pie, etc
      //indexLabel: "{y}", //Shows y value on all Data Points
      indexLabelFontColor: "#5A5757",
      indexLabelPlacement: "outside",
      dataPoints
    }]
  }

  return (
    <ChartComponent>
      <CanvasJSChart options={chartConfig}/>
    </ChartComponent>
  );
}

export default Chart;

const ChartComponent = styled.div`
  height: 300px;
  width: 100%;
`;
