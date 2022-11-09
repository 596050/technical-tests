/* ----------------- TYPES ----------------- */
type Pricing = {
  amountBase: number;
  percentageFeeRaising: number;
  percentageFeeSubscription: number;
  vauban: {
    maxFee: number;
  };
};

type Investor = {
  amount: number;
};

type InvestorWithFee = {
  amount: number;
  amountBase: number;
  amountFeeRaising: number;
  amountFeeSubscription: number;
};

type State = {
  pricing: Pricing;
  totalInvestment: number;
} & InvestorWithFee;

/* ----------------- DATA ----------------- */
const investors: Investor[] = [
  {
    amount: 3000000,
  },
  {
    amount: 1111000,
  },
  {
    amount: 1100000,
  },
  {
    amount: 1032000,
  },
  {
    amount: 930000,
  },
  {
    amount: 500000,
  },
  {
    amount: 394000,
  },
  {
    amount: 383000,
  },
  {
    amount: 366000,
  },
  {
    amount: 1000,
  },
];

const pricing: Pricing = {
  amountBase: 4900,
  percentageFeeRaising: 0.01,
  percentageFeeSubscription: 0.1,
  vauban: {
    maxFee: 10000,
  },
};

const initialState: State = {
  pricing,
  totalInvestment: 0,
  amount: 0,
  amountBase: 0,
  amountFeeRaising: 0,
  amountFeeSubscription: 0,
};

const getTotal = (investors: Investor[]) => {
  return investors.reduce((acc, item) => {
    return acc + +item.amount;
  }, 0);
};

const getProportion = (amount: number, total: number) => +amount / +total;

const getBasePrice = (
  amount: number,
  total: number,
  amountBase: Pricing["amountBase"],
) => {
  return getProportion(+amount, +total) * +amountBase;
};

const getRaisingFee = (
  amount: number,
  total: number,
  percentageFeeRaising: Pricing["percentageFeeRaising"],
  remainederFee: number,
) => {
  return Math.min(
    +percentageFeeRaising * +amount,
    getProportion(+amount, +total) * Math.max(remainederFee, 0),
  );
};

const getSubscriptionFee = (
  amount: number,
  percentageFeeSubscription: Pricing["percentageFeeSubscription"],
) => {
  return +percentageFeeSubscription * +amount;
};

/* ----------------- FUNCTION ----------------- */
function calculateInvestorsFees(
  investors: Investor[],
  totalInvestment: number,
): InvestorWithFee[] {
  const collectedByVauban = [
    ({ amount, pricing, totalInvestment }: State) => {
      return {
        amountBase: getBasePrice(amount, totalInvestment, pricing.amountBase),
      };
    },
    ({ amount, pricing, totalInvestment }: State) => {
      return {
        amountFeeRaising: getRaisingFee(
          amount,
          totalInvestment,
          pricing.percentageFeeRaising,
          pricing.vauban.maxFee - pricing.amountBase,
        ),
      };
    },
    ({ amount, pricing }: State) => {
      return {
        amountFeeSubscription: getSubscriptionFee(
          amount,
          pricing.percentageFeeSubscription,
        ),
      };
    },
  ];

  // const collectedBySponsors = [
  // ]

  const res = investors.map(investor => {
    return [collectedByVauban].map(collector => {
      return collector.reduce(
        (acc, calc) => {
          const state = { ...acc, amount: investor.amount };
          const newAcc = { ...state, ...calc(state) };
          return newAcc;
        },
        { ...initialState, totalInvestment },
      );
    });
  });

  console.log(res);

  return [];
}

// console.assert(calculateInvestorsFees(investors, pricing))
/* ----------------- RUN ----------------- */
console.log(calculateInvestorsFees(investors, getTotal(investors)));
