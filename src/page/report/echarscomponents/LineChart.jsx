import React, { useEffect } from "react";
import * as echarts from "echarts";
let myChart = null;
export default function LineChart(props) {
  useEffect(() => {
    lineChart();
    screenAdapter();
    window.addEventListener("resize", screenAdapter);

    return () => {
      window.removeEventListener("resize", screenAdapter);
    };
  }, [props]);
  const lineChart = () => {
    var line_Chart = document.getElementById("lineChart");
    myChart = echarts.getInstanceByDom(line_Chart);
    if (!myChart) {
      myChart = echarts.init(line_Chart);
    }
    console.log(props);
    let option = {
      title: {
        left: "center",
        text: "每月站点违章趋势",
        textStyle: {
          fontSize: 22,
          color: "#f0f0f0",
        },
      },
      xAxis: {
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
        boundaryGap: false,
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false, //去除网格线
        },
        splitArea: { show: false }, //去除网格区域
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
      },
      yAxis: {
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        splitArea: { show: false }, //去除网格区域
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
        right: "4%",
      },
      series: [
        {
          smooth: true,
          type: "line",
          animationDuration: 2800,
          animationEasing: "cubicInOut",
          name: props.barChartdata[0]?.monitorName,
          data: props.barChartdata[0]?.count,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(46, 199, 201)",
                },
                {
                  offset: 1,
                  color: "rgb(46, 199, 201,0.1)",
                },
              ]),
            },
          },
        },
        {
          smooth: true,
          type: "line",
          itemStyle: {},
          name: props.barChartdata[1]?.monitorName,
          data: props.barChartdata[1]?.count,
          animationDuration: 2800,
          animationEasing: "quadraticOut",
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgb(44, 203, 146)",
                  },
                  {
                    offset: 1,
                    color: "rgb(44, 203, 146,0.1)",
                  },
                ],
                false
              ),
            },
          },
        },
        {
          smooth: true,
          type: "line",
          itemStyle: {},

          animationDuration: 2800,
          animationEasing: "quadraticOut",
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgb(90, 177, 239)",
                  },
                  {
                    offset: 1,
                    color: "rgb(90, 177, 239,0.1)",
                  },
                ],
                false
              ),
            },
          },
        },
      ],
    };
    myChart.setOption(option);
  };
  const screenAdapter = () => {
    myChart.resize();
  };
  return <div id="lineChart" style={{ width: "100%", height: "330px" }}></div>;
}
