import React, { useEffect } from "react";
import * as eCharts from "echarts";
let myChart = null;

export default function BarChart(props) {
  useEffect(() => {
    barChart();
    screenAdapter();
    window.addEventListener("resize", screenAdapter);

    return () => {
      window.removeEventListener("resize", screenAdapter);
    };
  }, [props]);
  console.log(props);
  const barChart = () => {
    var barChart_main = document.getElementById("barChart-main");
    myChart = eCharts.getInstanceByDom(barChart_main);
    if (!myChart) {
      myChart = eCharts.init(barChart_main);
    }
    let option = {
      title: {
        left: "center",
        text: "每月站点对比",
        textStyle: {
          fontSize: 22,
          color: "#f0f0f0",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 20,
        top: 30,
        containLabel: true,
      },

      legend: {
        formatter: function (value) {
          return value;
        },
        textStyle: {
          //图例文字的样式
          color: "#fff",
        },
        right: "5%",
      },
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          axisPointer: {
            type: "shadow",
          },
          splitLine: {
            show: false,
          },
          splitArea: { show: false }, //去除网格区域
        },
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            show: false,
          },
          splitArea: { show: false }, //去除网格区域
        },
      ],
      series: [
        {
          name: props.barChartdata[0]?.monitorName,
          type: "bar",
          data: props?.barChartdata[0]?.count,
          itemStyle: {
            normal: {
              //这里是重点
              color: "#2EC7C9",
            },
          },
        },
        {
          name: props.barChartdata[1]?.monitorName,
          type: "bar",
          data: props?.barChartdata[1]?.count,
          itemStyle: {
            normal: {
              //这里是重点
              color: "#2CCB92",
            },
          },
        },
        {
          type: "bar",
        },
      ],
    };

    myChart.setOption(option);
  };
  const screenAdapter = () => {
    myChart.resize();
  };
  return (
    <div id="barChart-main" style={{ width: "100%", height: "330px" }}></div>
  );
}
