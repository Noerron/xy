import React, { useEffect } from "react";
import * as echarts from "echarts";
let myChart = null;

export default function Graph(props) {
  useEffect(() => {
    graph();
    screenAdapter();
    window.addEventListener("resize", screenAdapter);

    return () => {
      window.removeEventListener("resize", screenAdapter);
    };
  }, [props]);
  console.log(props);
  const graph = () => {
    console.log(props?.curve_name);
    var graph = document.getElementById("graph");
    myChart = echarts.getInstanceByDom(graph);
    if (!myChart) {
      myChart = echarts.init(graph);
    }
    console.log(props?.curve_ydata[0]);
    let option = {
      xAxis: {
        data: [
          "0",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
        ],
        boundaryGap: false,
        axisTick: {
          show: false,
        },

        axisLabel: {
          color: "#fff", //刻度线标签颜色,
        },
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 20,
        top: 30,
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },

        padding: [5, 10],
        transitionDuration: 0,
      },
      yAxis: {
        splitLine: {
          show: false,
        },
        splitArea: { show: false },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#fff", //刻度线标签颜色
        },
      },
      legend: {
        formatter: function (value) {
          return value;
        },
        icon: "circle",
        textStyle: {
          //图例文字的样式
          color: "#fff",
        },
        data: "",
      },
      series: [
        {
          name: props?.curve_name[0],
          smooth: true,
          type: "line",
          data: props?.curve_ydata[0],
          animationDuration: 2800,
          animationEasing: "cubicInOut",
        },
        {
          name: props?.curve_name[1],
          smooth: true,
          type: "line",
          data: props?.curve_ydata[1],
          animationDuration: 2800,
          animationEasing: "quadraticOut",
        },
      ],
    };
    myChart.setOption(option);
  };
  const screenAdapter = () => {
    myChart.resize();
  };
  return (
    <div
      id="graph"
      style={{ width: "100%", height: "calc(100% - 40px)" }}
    ></div>
  );
}
