const NOV_3_DAY = 308;

export enum CHAIN {
  MAINNET,
  MATIC,
}

const NOV_3_FIRST_BLOCK = {
  [CHAIN.MAINNET]: 11180802,
  [CHAIN.MATIC]: 6546231,
};

const BLOCKS_PER_DAY = {
  [CHAIN.MAINNET]: 6348,
  [CHAIN.MATIC]: 41891,
};

function dayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getUTCFullYear(), 0, 0);
  // @ts-ignore
  const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);

  const dayWithYearOffset = day + (now.getUTCFullYear() - 2020) * 365;

  return dayWithYearOffset;
}

export function getBlockDaysAgo(numDaysAgo: number, chain: CHAIN = CHAIN.MAINNET): number {
  const nov3FirstBlock = NOV_3_FIRST_BLOCK[chain];
  const blocksPerDay = BLOCKS_PER_DAY[chain];

  const todayBlock = nov3FirstBlock + (dayOfYear() - NOV_3_DAY) * blocksPerDay;
  return todayBlock - blocksPerDay * numDaysAgo;
}
