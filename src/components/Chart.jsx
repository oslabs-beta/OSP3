import React from 'react';
import ReactApexChart from 'react-apexcharts';

// accepting data as a prop
const Chart = ({ data, height, width = '100%' }) => {
  // handle cases when response data has not come back yet, or reponse data array is empty
  if (!data || data.length === 0) {
    return <div>Loading chart data...</div>;
  }

  //setup series (what's on y-axis)
  const series = [];
  //get all keys from first object in data array
  let keys = Object.keys(data[0]);
  //interate through keys array created above
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== 'day') {
      let pointData = [];
      //run a nested for-loop on data array (7 objects) starting from the end
      for (let j = data.length - 1; j >= 0; j--) {
        pointData.push(data[j][keys[i]].toFixed(1));
      }
      let point = {
        name: keys[i],
        data: pointData,
      };
      series.push(point);
    }
  }

  //setup categories (what's on x-axis)
  const categories = [];
  for (let i = data.length - 1; i >= 0; i--) {
    categories.push(data[i].day);
  }

  //setup chart type, assign series, assign xaxis, title
  const options = {
    chart: {
      type: 'line',
      toolbar: { show: false },
    },
    series: series,
    xaxis: {
      categories: categories,
    },
    yaxis: {
      // adding title to y-axis
      title: {
        text: 'Average Latency (Milliseconds)',
        //rotate the text
        rotate: -90,
        style: {
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
        },
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={height}
        width={width}
      />
    </div>
  );
};

export default Chart;
