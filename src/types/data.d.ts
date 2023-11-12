interface ChartData<TType, TData, TLabel> {
  datasets: ChartDataset<TType, TData, TLabel>[];
}

interface ICovid19RegionData {
  countryNm: string; //* 데이터에 해당되는 시도명
  totalCnt: number; //* 코로나19 확진자 수(전체)
  deathCnt: number; //* 코로나19 사망자 수
  qurRate: number; //* 코로나19 발생률
  incDec: number; //* 전일대비(확진)
  incDecK: number; //* 전일대비(확진-지역)
  incDecF: number; //* 전일대비(확진-해외)
}
interface ICovid19VaccineData {
  countryNm: string;
  vaccine_1: {
    vaccine_1: number; //1차접종 완료
    vaccine_1_new: number;
    vaccine_1_old: number;
    vaccine_1_pcnt: number;
  };
  vaccine_2: {
    vaccine_2: number; //2차접종 완료
    vaccine_2_new: number;
    vaccine_2_old: number;
    vaccine_2_pcnt: number;
  };
  vaccine_w: {
    vaccine_w: number;
    vaccine_w_new: number;
    vaccine_w_old: number;
    vaccine_w_pcnt: number;
  };
}

interface ICovid19Data {
  [key: string]: ICovid19RegionData;
}

interface IVaccineData {
  [key: string]: ICovid19VaccineData;
}

interface DoughnutProps {
  labels: string[];
  datasets: {
    label: TLabel;
    data: TData;
    backgroundColor?: string | string[];
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    fill?: boolean;
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}
