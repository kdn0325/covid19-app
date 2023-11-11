import { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
interface DoughnutProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

const Contents = () => {
  /* 누적 확진자, 격리 해제 , 사망 */
  const [data, setData] = useState<ICoronaData>({});
  const [confirmedData, setConfirmedData] = useState<DoughnutProps>({
    labels: [],
    datasets: [],
  });

  const [quarantineData, setQuarantineData] = useState({});
  const [comparedData, setComparedData] = useState({});

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
      setData(filteredData);

      console.log("filteredData?", filteredData);
    };
    setConfirmedData({
      labels: [
        "부산",
        "충북",
        "충남",
        "대구",
        "대전",
        "강원",
        "대구",
        "대전",
        "광주",
        "경북",
        "경기",
        "경남",
        "인천",
        "제주",
        "전북",
        "전남",
        "세종",
        "서울",
        "울산",
      ],

      datasets: [
        {
          label: "# of Votes",
          data: [
            data.busan?.totalCnt,
            data.chungbuk?.totalCnt,
            data.chungnam?.totalCnt,
            data.daegu?.totalCnt,
            data.daejeon?.totalCnt,
            data.gangwon?.totalCnt,
            data.gwangju?.totalCnt,
            data.gyeongbuk?.totalCnt,
            data.gyeonggi?.totalCnt,
            data.gyeongnam?.totalCnt,
            data.incheon?.totalCnt,
            data.jeju?.totalCnt,
            data.jeonbuk?.totalCnt,
            data.jeonnam?.totalCnt,
            data.sejong?.totalCnt,
            data.seoul?.totalCnt,
            data.ulsan?.totalCnt,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
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
    <section>
      <h2>국내 코로나 현황</h2>
      <Doughnut
        data={confirmedData}
        style={{ position: "relative", height: "200px" }}
      />
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
