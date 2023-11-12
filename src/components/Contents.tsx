import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import { generateRandomColors } from "../util/randomColors";
import { regions } from "../util/region";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

const Contents = () => {
  const [confirmedData, setConfirmedData] = useState<DoughnutProps>({
    labels: [],
    datasets: [],
  });
  const [deathCntData, setDeathCntData] = useState<DoughnutProps>({
    labels: [],
    datasets: [],
  });
  const [vaccineCntData, setVaccineCntData] = useState<DoughnutProps>({
    labels: [],
    datasets: [],
  });
  const [vaccinePercentData, setVaccinePercentData] = useState<DoughnutProps>({
    labels: [],
    datasets: [],
  });

  const Covid19URL = `https://api.corona-19.kr/korea/?serviceKey=${process.env.REACT_APP_API_KEY}`;
  const VaccineURL = `https://api.corona-19.kr/korea/vaccine/?serviceKey=${process.env.REACT_APP_API_KEY}`;

  //Covid 19 Api를 얻어옴

  useEffect(() => {
    const covid19DataFetch = async () => {
      const res = await axios.get(Covid19URL);
      const filteredData: ICovid19Data = Object.keys(res.data)
        .filter((key) => key !== "API")
        .reduce((obj, key) => {
          obj[key] = res.data[key];
          return obj;
        }, {} as ICovid19Data);

      const regionName = regions.map(
        (region) => filteredData[region]?.countryNm
      );

      const regionData = regions.map(
        (region) => filteredData[region]?.totalCnt || 0
      );
      const deathData = regions.map(
        (region) => filteredData[region]?.deathCnt || 0
      );

      const backgroundColors = generateRandomColors(regions.length);

      setConfirmedData({
        labels: regionName,

        datasets: [
          {
            label: "지역별 국내 누적 확진자",
            data: regionData,
            backgroundColor: backgroundColors,
            // borderColor: "salmon",
            borderWidth: 1,
          },
        ],
      });
      setDeathCntData({
        labels: regionName,

        datasets: [
          {
            label: "지역별 국내 누적 사망자",
            data: deathData,
            backgroundColor: backgroundColors,
            // borderColor: "salmon",
            borderWidth: 1,
          },
        ],
      });
    };
    const vaccineDataFetch = async () => {
      const res = await axios.get(VaccineURL);
      const filteredData: IVaccineData = Object.keys(res.data)
        .filter((key) => key !== "API")
        .reduce((obj, key) => {
          obj[key] = res.data[key];
          return obj;
        }, {} as IVaccineData);

      const regionName = regions.map(
        (region) => filteredData[region]?.countryNm
      );

      const vaccine1Data = regions.map(
        (region) => filteredData[region]?.vaccine_1.vaccine_1 || 0
      );
      const vaccine1Percent = regions.map(
        (region) => filteredData[region]?.vaccine_1.vaccine_1_pcnt || 0
      );

      const vaccine2Data = regions.map(
        (region) => filteredData[region]?.vaccine_2.vaccine_2 || 0
      );
      const vaccine2Percent = regions.map(
        (region) => filteredData[region]?.vaccine_2.vaccine_2_pcnt || 0
      );

      setVaccineCntData({
        labels: regionName,

        datasets: [
          {
            label: ["1차 예방 접종 완료"],
            data: vaccine1Data,
            backgroundColor: ["#ff3d67"],
            borderColor: ["#ff3d67"],
            borderWidth: 1,
          },
          {
            label: ["2차 예방 접종 완료"],
            data: vaccine2Data,
            backgroundColor: ["#059bff"],
            borderColor: ["#059bff"],
            borderWidth: 1,
          },
        ],
      });
      setVaccinePercentData({
        labels: regionName,

        datasets: [
          {
            label: ["1차 예방 접종률"],
            data: vaccine1Percent,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            fill: true,
            borderWidth: 1,
          },
          {
            label: ["2차 예방 접종률"],
            data: vaccine2Percent,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            pointBackgroundColor: "rgb(54, 162, 235)",
            pointBorderColor: "#fff",
            fill: true,
            borderWidth: 1,
          },
        ],
      });
    };

    covid19DataFetch();
    vaccineDataFetch();
  }, [Covid19URL, VaccineURL]);

  return (
    <section className="p-16">
      <h2 className="text-3xl font-extrabold text-center mb-24">
        국내 코로나 현황
      </h2>
      <div className="flex justify-between ">
        <div className=" w-1/3">
          <h2 className=" text-center font-bold">확진자 현황</h2>
          <Bar data={confirmedData} />
        </div>
        <div className=" w-1/3">
          <h2 className=" text-center font-bold">예방 접종 완료</h2>
          <Line data={vaccineCntData} />
        </div>
      </div>
      <div className="flex justify-between mt-32 ">
        <div className=" w-1/3">
          <h2 className=" text-center font-bold">누적 사망자 현황</h2>
          <Doughnut data={deathCntData} />
        </div>
        <div className=" w-1/3">
          <h2 className=" text-center font-bold">예방 접종 비율</h2>
          <Radar data={vaccinePercentData} />
        </div>
      </div>
    </section>
  );
};
export default Contents;
