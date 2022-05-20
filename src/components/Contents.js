import {useState,useEffect } from 'react';
import {Bar,Doughnut,Line} from 'react-chartjs-2';
import axios from 'axios';

const Contents = () => {
    /* 누적 확진자, 격리 해제 , 사망 */
    const[confirmedData, setConfirmedData] =useState({});
    const[quarantineData, setQuarantineData] =useState({});
    const[comparedData, setComparedData] =useState({});
    

    //Covid 19 Api를 얻어옴
    useEffect(()=>{
        const fetchEvents = async()=>{
            const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
            makeData(res.data)
        }
        const makeData = (items)=>{
            const arr = items.reduce((acc,cur)=>{
                const currentDate = new Date(cur.Date);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate();
                const confirmed = cur.Confirmed;
                const active = cur.Active;
                const deaths = cur.Deaths;
                const recovered = cur.Recovered;

                const findItem = acc.find((a)=> a.year === year && a.month === month)
                if(!findItem){
                    acc.push({year,month,date,confirmed,active,deaths,recovered})
                }
                if(findItem && findItem.date <date){
                    findItem.year = year;
                    findItem.month = month;
                    findItem.date = date;
                    findItem.confirmed = confirmed;
                    findItem.active = active;
                    findItem.deaths = deaths;
                    findItem.recovered = recovered;
                }
                return acc;
                
            },[]);
            const labels = arr.map((a)=>`${a.month+1}월`);
            setConfirmedData({
                labels : labels,
                datasets:[
                {label:"국내 누적 확진자",backgroundColor:"salmon",fill: true,data: arr.map((a)=>a.confirmed)},
                ]
            });
            setQuarantineData({
                labels : labels,
                datasets:[
                {label:"월별 격리자 현황",borderColor:"salmon",fill: false, data: arr.map((a)=>a.active)},
                ]
            });
            const last = arr[arr.length-1];
            setComparedData({
                labels : ["누적 확진자","격리 해제","사망"],
                datasets:[
                {label:"누적 확진,월별 격리,사망 비율", backgroundColor: ["#ff3d67","#059bff","#ffc233"], borderColor:["#ff3d67","#059bff","#ffc233"], fill:false, data:[last.confirmed,last.active,last.deaths],}
                ]
            });
        }
        fetchEvents()
    },[])
    return (
    <section>
        <h2>국내 코로나 현황</h2>
        <div className="contents">
            <div>
            <Bar className="confirmed"
            data={confirmedData}
            options={ (
                { title: { display: true, text: "누적 확진자 추이", fontSize: 16 } },
                { legend: { display: true, position: "bottom" } })
            }/>
            <Line className="quarantine"
            data={quarantineData}
            options={ (
                { title: { display: true, text: "월별 격리자 현황", fontSize: 16 } },
                { legend: { display: true, position: "bottom" } })
            }/>
            <Doughnut className="compared"
            data={comparedData}
            options={ (
                { title: { display: true, text: `누적 확진, 격리 해제, 사망(${new Date().getMonth()+1})월` , fontSize: 16 } },
                { legend: { display: true, position: "bottom" } })
            }/>
            </div>
        </div>
    </section>
    );
};
export default Contents