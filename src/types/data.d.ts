interface ICoronaRegionData {
  countryNm: string;
  deathCnt: number;
  incDec: number;
  incDecF: number;
  incDecK: number;
  qurRate: number;
  totalCnt: number;
}

interface ICoronaData {
  [key: string]: ICoronaRegionData;
}
