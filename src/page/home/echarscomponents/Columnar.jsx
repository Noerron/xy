import React, { useEffect } from "react";
import * as echarts from "echarts";
let myChart = null;
export default function Columnar(props) {
  useEffect(() => {
    columnar();
    screenAdapter();
    window.addEventListener("resize", screenAdapter);

    return () => {
      window.removeEventListener("resize", screenAdapter);
    };
  }, [props]);
  const columnar = () => {
    console.log(props);
    var columnar = document.getElementById("columnar");
    myChart = echarts.getInstanceByDom(columnar);
    if (!myChart) {
      myChart = echarts.init(columnar);
    }
    let option = {
      xAxis: {
        axisLabel: {
          formatter: function (value) {
            var res = value;
            var index = res.indexOf("G");
            res = res.substring(0, index);
            return res;
          },
          fontSize: 12,
          show: true,
          interval: 0,
          rotate: 0,
          textStyle: {
            color: "#ffffff",
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
        type: "category",
        data: props?.xData,
      },
      grid: {
        left: "3%",
        right: "4%",
        top: "10%",

        bottom: "0%",

        containLabel: true,
      },
      yAxis: {
        type: "value",

        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },

        splitArea: { show: false },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#ffffff",
          },
        },
      },
      tooltip: {
        transitionDuration: 0,
      },
      series: [
        {
          data: props?.yData,
          type: "bar",
          itemStyle: {
            barBorderRadius: [5, 5, 0, 0],

            normal: {
              color: function (params) {
                var colorList = ["#5470C6", "#91CC75"];
                return colorList[params.dataIndex];
              },
              label: {
                show: true, //开启显示
                position: "top", //在上方显示
                textStyle: {
                  //数值样式
                  // color: 'black',
                  color: "white",

                  fontSize: 16,
                },
              },
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
  return (
    <div
      style={{ width: "100%", height: "calc(100% - 40px)" }}
      id="columnar"
      className="columnar"
    ></div>
  );
}
