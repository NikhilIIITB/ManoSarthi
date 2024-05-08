import React, { useRef, useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Import Chart.js
import AdminService from "../../Services/AdminService";

const AdminDashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [surveyStats, setSurveyStats] = useState([]); // [{dictrict: patientCount}]
  const [PatientAccordingtoSubcategory, setfetchPatientAccordingtoSubcategory] = useState([]);
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const data = {
      labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9', 'Label 10', 'Label 11', 'Label 12', 'Label 13', 'Label 14', 'Label 15', 'Label 16', 'Label 17', 'Label 18', 'Label 19', 'Label 20'],
      values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]
    };
    new Chart(ctx, {
      type: 'bar', // Change type to 'bar' for horizontal bar graph
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Value',
          data: data.values,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            ticks: {
              callback: function(value) {
                return value;
              }
            }
          }]
        }
      }
    });
  },[]);

  useEffect(() => {
    fetchPatientCountAccordingtoDistrict();
    // fetchPatientAccordingtoSubcategory();
  }, []);

  const fetchPatientCountAccordingtoDistrict = async () => {
    try {
      const response = await AdminService.getPatientCountAccordingtoDistrict();
      console.log("getPatientCountAccordingtoDistrict response", response.data);
      setSurveyStats(response.data);
    } catch (error) {
      console.error("Error fetching survey stats: ", error);
    }
  };
  const fetchPatientAccordingtoSubcategory = async () => {
    try {
      const response = await AdminService.getPatientAccordingtoSubcategory();
      setfetchPatientAccordingtoSubcategory(response.data);
      console.log("getPatientAccordingtoSubcategory response", response.data);
    } catch (error) {
      console.error("Error fetching survey stats: ", error);
    }
  };

  useEffect(() => {
    if (surveyStats.length === 0) return; // Don't proceed if surveyStats is empty

    const labels = ["jan", "feb", "march", "april", "may", "june", "july"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Survey Dataset",
          data: [23, 6, 7, 12, 8, 30, 3],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
    setChartData(data);

    const pieLabels = ["Referred", "Not Referred", "Not Surveyed"];
    const pieData = {
      labels: pieLabels,
      datasets: [
        {
          label: "Pie Dataset",
          data: [12, 19, 3],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };
    setPieChartData(pieData);
    // Sample data for the bar chart
    const barLabels = surveyStats.map((stat) => stat[0]); //All Districts
    const barData = {
      labels: barLabels,
      datasets: [
        {
          label: "Bar Dataset",
          data: surveyStats.map((stat) => stat[1]), // Patient count in a district
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
        },
      ],
    };
    setBarChartData(barData);
  }, [surveyStats]);


  return (
    <div>
      <div>
        <div className="mt-2">
          <p className="flex justify-center items-center mb-1 text-lg font-semibold">Diseases Count</p>
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 md:px-24 md:py-16 lg:px-8 lg:py-20 dark:bg-gray-800">
            <canvas ref={chartRef} />
          </div>
        </div>
        <div className="flex mt-4 justify-center items-center">
          <p className="text-lg font-semibold mb-4">Top 5 Diseases Count Based on SubCategory</p>
        </div>
        <div className="row-gap-8 flex grid-cols-2 md:grid-cols-4 justify-center items-center">
          {PatientAccordingtoSubcategory.map((subcategory, index) => (
            <div
              key={index}
              className="mb-12 text-center md:mb-0 md:border-r-2 dark:md:border-slate-500 p-3"
            >
              <div className="font-heading text-[2.6rem] font-bold dark:text-white lg:text-5xl xl:text-6xl">
                {subcategory[1]}
              </div>
              <p className="text-sm font-medium uppercase tracking-widest text-gray-800 dark:text-slate-400 lg:text-base">
                {subcategory[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 px-1 py-1 mb-4 h-12">
        <div className="w-1/2 bg-gray-400 mt-10">
          <div className="bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4">Patient Registered</h2>
            {pieChartData && (
              <Pie data={pieChartData} options={{}} ref={pieChartRef} />
            )}
          </div>
          <div className="bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4">Patient Registered</h2>
            {pieChartData && (
              <Pie data={pieChartData} options={{}} ref={pieChartRef} />
            )}
          </div>
        </div>
        <div className="w-1/2 bg-gray-500">
          <div className="bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4">Survey Registrations</h2>
            {chartData && (
              <Line
                data={chartData}
                options={{ scales: { x: { type: "category" } } }}
                ref={chartRef}
              />
            )}
          </div>
          <div className="bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              District wise patients stats
            </h2>
            {barChartData && (
              <Bar
                data={barChartData}
                options={{ scales: { y: { suggestedMin: 1 } } }}
                ref={barChartRef}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
