import React, { useEffect } from "react";
import * as echarts from "echarts";

let myChart = null;

export default function Pie(props) {
  useEffect(() => {
    pie();
    screenAdapter();
    window.addEventListener("resize", screenAdapter);

    return () => {
      window.removeEventListener("resize", screenAdapter);
    };
  }, [props]);

  const pie = () => {
    var graph = document.getElementById("pie");
    myChart = echarts.getInstanceByDom(graph);
    if (!myChart) {
      myChart = echarts.init(graph);
    }
    let option = {
      legend: {
        orient: "vertical",
        textStyle: {
          color: "#ffffff", //字体颜色
        },
        right: "right",
      },
      tooltip: {
        trigger: "item",
        formatter: `{a}  <br/>{b}: {c} ({d}%)`,
        transitionDuration: 0, //接鼠标划入页面卡顿闪烁
      },
      series: [
        {
          name: "车辆违章",
          type: "pie",
          radius: "80%",
          data: props?.pie_data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
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
    <div id="pie" style={{ width: "100%", height: "calc(100% - 40px)" }}>
      Pie
    </div>
  );
}
