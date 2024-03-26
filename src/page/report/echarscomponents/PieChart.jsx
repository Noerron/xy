import React, { useEffect } from "react";
import * as eCharts from "echarts";
let myChart = null;
export default function PieChart(props) {
  useEffect(() => {
    piechart();
    screenAdapter();
    window.addEventListener("resize", screenAdapter);

    return () => {
      window.removeEventListener("resize", screenAdapter);
    };
  }, [props]);
  console.log(props);
  const piechart = () => {
    var pieChart = document.getElementById("pieChart");
    myChart = eCharts.getInstanceByDom(pieChart);
    if (!myChart) {
      myChart = eCharts.init(pieChart);
    }

    let option = {
      title: {
        left: "center",
        text: "站点违章全年对比",
        textStyle: {
          fontSize: 22,
          color: "#f0f0f0",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: `${props?.pieChartdata[0]?.name}: {c} ({d}%)`,
        transitionDuration: 0, //接鼠标划入页面卡顿闪烁
      },
      legend: {
        orient: "vertical",
        right: 10,
        formatter: function (name) {
          //用来格式化图例文本，支持字符串模板和回调函数两种形式。模板变量为图例名称 {name}
          return name;
        },
        textStyle: {
          //图例文字的样式
          color: "#fff",
        },
      },
      series: [
        {
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: props?.pieChartdata,
        },
      ],
    };
    myChart.setOption(option);
  };
  const screenAdapter = () => {
    myChart.resize();
  };
  return <div id="pieChart" style={{ width: "100%", height: "330px" }}></div>;
}
