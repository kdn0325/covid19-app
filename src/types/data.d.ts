interface ICoronaRegionData {
  countryNm: string; //* 데이터에 해당되는 시도명
  totalCnt: number; //* 코로나19 확진자 수(전체)
  deathCnt: number; //* 코로나19 사망자 수
  qurRate: number; //* 코로나19 발생률
  incDec: number; //* 전일대비(확진)
  incDecK: number; //* 전일대비(확진-지역)
  incDecF: number; //* 전일대비(확진-해외)
}

interface ICoronaData {
  [key: string]: ICoronaRegionData;
}

interface DoughnutProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    // borderColor: string;
    borderWidth: number;
  }[];
}
