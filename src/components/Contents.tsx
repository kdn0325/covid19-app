import { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { generateRandomColors } from "../util/randomColors";

ChartJS.register(ArcElement, Tooltip, Legend);

const Contents = () => {
  const [confirmedData, setConfirmedData] = useState<DoughnutProps>({
    labels: [],
    datasets: [],
  });
  const [deathCntData, setDeathCntData] = useState<DoughnutProps>({
    labels: [],
    datasets: [],
  });

  // const [comparedData, setComparedData] = useState({});

  //Covid 19 Api를 얻어옴

  console.log(
    `https://api.corona-19.kr/korea/?serviceKey=${process.env.REACT_APP_API_KEY}`
  );

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(
        `https://api.corona-19.kr/korea/?serviceKey=${process.env.REACT_APP_API_KEY}`
      );
      const filteredData: ICoronaData = Object.keys(res.data)
        .filter((key) => key !== "API")
        .reduce((obj, key) => {
          obj[key] = res.data[key];
          return obj;
        }, {} as ICoronaData);

      const regions = [
        "busan",
        "chungbuk",
        "chungnam",
        "daegu",
        "daejeon",
        "gangwon",
        "gwangju",
        "gyeongbuk",
        "gyeonggi",
        "gyeongnam",
        "incheon",
        "jeju",
        "jeonbuk",
        "jeonnam",
        "sejong",
        "seoul",
        "ulsan",
      ];
      const regionName = regions.map(
        (region) => filteredData[region]?.countryNm
      );

      const regionData = regions.map(
        (region) => filteredData[region]?.totalCnt || 0
      );
      const deathData = regions.map(
        (region) => filteredData[region]?.deathCnt || 0
      );
      const dataLength = regions.length;

      const backgroundColors = generateRandomColors(dataLength);

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

    fetchEvents();
  }, []);

  console.log("confirmedData?", confirmedData);

  // console.log("data?", data.busan.totalCnt);
  // console.log("data?", data.chungbuk.totalCnt);
  // console.log("data?", data.chungnam.totalCnt);
  // console.log("data?", data.daegu.totalCnt);
  // console.log("data?", data.daejeon.totalCnt);
  // console.log("data?", data.gangwon.totalCnt);
  // console.log("data?", data.gwangju.totalCnt);
  // console.log("data?", data.gyeongbuk.totalCnt);
  // console.log("data?", data.gyeonggi.totalCnt);
  // console.log("data?", data.gyeongnam.totalCnt);
  // console.log("data?", data.incheon.totalCnt);
  // console.log("data?", data.jeju.totalCnt);
  // console.log("data?", data.jeonbuk.totalCnt);
  // console.log("data?", data.jeonnam.totalCnt);
  // console.log("data?", data.sejong.totalCnt);
  // console.log("data?", data.seoul.totalCnt);
  // console.log("data?", data.ulsan.totalCnt);

  // const {busan.totalCnt,
  //   chungbuk.totalCnt,
  //   chungnam.totalCnt,
  //   daegu.totalCnt,
  //   daejeon.totalCnt,
  //   gangwon.totalCnt,
  //   gwangju.totalCnt,
  //   gyeongbuk.totalCnt,
  //   gyeonggi.totalCnt,
  //   gyeongnam.totalCnt,
  //   incheon.totalCnt,
  //   jeju.totalCnt,
  //   jeonbuk.totalCnt,
  //   jeonnam.totalCnt,
  //   sejong.totalCnt,
  //   seoul.totalCnt,
  //   ulsan.totalCnt} = data

  /* 데이터 받을 변수 */
  //     const makeData = (items) => {
  //       const arr = items.reduce((acc, cur) => {
  //         const currentDate = new Date(cur.Date);
  //         const year = currentDate.getFullYear();
  //         const month = currentDate.getMonth();
  //         const date = currentDate.getDate();
  //         const confirmed = cur.Confirmed;
  //         const active = cur.Active;
  //         const deaths = cur.Deaths;
  //         const recovered = cur.Recovered;

  //         const findItem = acc.find((a) => a.year === year && a.month === month);
  //         if (!findItem) {
  //           acc.push({ year, month, date, confirmed, active, deaths, recovered });
  //         }
  //         /*  */
  //         if (findItem && findItem.date < date) {
  //           findItem.year = year;
  //           findItem.month = month;
  //           findItem.date = date;
  //           findItem.confirmed = confirmed;
  //           findItem.active = active;
  //           findItem.deaths = deaths;
  //           findItem.recovered = recovered;
  //         }
  //         return acc;
  //       }, []);
  //       const labels = arr.map((a) => `${a.month + 1}월`);
  //       setConfirmedData({
  //         labels: labels,
  //         datasets: [
  //           {
  //             label: "국내 누적 확진자",
  //             backgroundColor: "salmon",
  //             fill: true,
  //             data: arr.map((a) => a.confirmed),
  //           },
  //         ],
  //       });
  //       setQuarantineData({
  //         labels: labels,
  //         datasets: [
  //           {
  //             label: "월별 격리자 현황",
  //             borderColor: "salmon",
  //             fill: false,
  //             data: arr.map((a) => a.active),
  //           },
  //         ],
  //       });
  //       const last = arr[arr.length - 1];
  //       setComparedData({
  //         labels: ["누적 확진자", "격리 해제", "사망"],
  //         datasets: [
  //           {
  //             label: "누적 확진,월별 격리,사망 비율",
  //             backgroundColor: ["#ff3d67", "#059bff", "#ffc233"],
  //             borderColor: ["#ff3d67", "#059bff", "#ffc233"],
  //             fill: false,
  //             data: [last.confirmed, last.active, last.deaths],
  //           },
  //         ],
  //       });
  //     };
  //     fetchEvents();
  //   }, []);
  return (
    <section className="p-2">
      <h2>국내 코로나 현황</h2>
      <div className="flex justify-between ">
        <div className="w-2/4">
          <h2 className=" text-center font-bold">확진자 현황</h2>
          <Doughnut data={confirmedData} />
        </div>
        <div className="w-2/4">
          <h2 className=" text-center font-bold">누적 사망자 현황</h2>
          <Doughnut data={deathCntData} />
        </div>
      </div>
      {/* <div className="contents">
        <div>
          <Bar
            className="confirmed"
            data={confirmedData}
            options={
              ({
                title: {
                  display: true,
                  text: "누적 확진자 추이",
                  fontSize: 16,
                },
              },
              { legend: { display: true, position: "bottom" } })
            }
          />
          <Line
            className="quarantine"
            data={quarantineData}
            options={
              ({
                title: {
                  display: true,
                  text: "월별 격리자 현황",
                  fontSize: 16,
                },
              },
              { legend: { display: true, position: "bottom" } })
            }
          />
          <Doughnut
            className="compared"
            data={comparedData}
            options={
              ({
                title: {
                  display: true,
                  text: `누적 확진, 격리 해제, 사망(${
                    new Date().getMonth() + 1
                  })월`,
                  fontSize: 16,
                },
              },
              { legend: { display: true, position: "bottom" } })
            }
          />
        </div>
      </div> */}
    </section>
  );
};
export default Contents;
