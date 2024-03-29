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
  customFee?: number;
};

type InvestorWithFee = {
  amount: number;
  amountBase: number;
  amountFeeRaising: number;
  amountFeeSubscription: number;
};

/* ----------------- DATA ----------------- */
const investors: Investor[] = [
  {
    amount: 3000000,
    customFee: 200,
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

type State = {
  pricing: Pricing;
  totalInvestment: number;
} & InvestorWithFee;

const initialState: State = {
  pricing,
  totalInvestment: 0,
  amount: 0,
  amountBase: 0,
  amountFeeRaising: 0,
  amountFeeSubscription: 0,
};

const getProportion = (num: number, den: number) => {
  return +num / +den;
};

const getTotal = (investors: Investor[]) => {
  return investors.reduce((acc, item) => {
    return acc + +item.amount;
  }, 0);
};

const getBasePrice = (
  amount: number,
  totalInvestment: number,
  amountBase: Pricing["amountBase"],
) => {
  return getProportion(+amount, +totalInvestment) * +amountBase;
};

const getRaisingFee = (
  amount: number,
  totalInvestment: number,
  percentageFeeRaising: Pricing["percentageFeeRaising"],
  remainderFee: number,
) => {
  return Math.min(
    amount * percentageFeeRaising,
    getProportion(+amount, +totalInvestment) * +remainderFee,
  );
};

const getSubscriptionFee = (
  amount: number,
  percentageFeeSubscription: Pricing["percentageFeeSubscription"],
) => {
  return +amount * percentageFeeSubscription;
};

/* ----------------- FUNCTION ----------------- */
function calculateInvestorsFees(
  investors: Investor[],
  totalInvestment: number,
): InvestorWithFee[] {
  const collectedByVauban = [
    ({ amount, totalInvestment, pricing }: State): Partial<State> => ({
      amountBase: getBasePrice(amount, totalInvestment, pricing.amountBase),
    }),
    ({ amount, totalInvestment, pricing }: State): Partial<State> => ({
      amountFeeRaising: getRaisingFee(
        amount,
        totalInvestment,
        pricing.percentageFeeRaising,
        Math.max(pricing.vauban.maxFee - pricing.amountBase, 0),
      ),
    }),
  ];

  const collectedBySponsors = [
    ({ amount, pricing }: State): Partial<State> => ({
      amountFeeSubscription: getSubscriptionFee(
        amount,
        pricing.percentageFeeSubscription,
      ),
    }),
  ];

  const collectors = collectedByVauban.concat(collectedBySponsors);

  return investors.map(investor => {
    const { amount, amountBase, amountFeeRaising, amountFeeSubscription } =
      collectors.reduce(
        (acc, calc) => {
          const state = { ...acc, amount: investor.amount };

          return { ...state, ...calc(state) };
        },
        { ...initialState, totalInvestment },
      );

    return {
      amount,
      amountBase,
      amountFeeRaising,
      amountFeeSubscription,
    };
  });
}

/* ----------------- RUN ----------------- */
console.log(calculateInvestorsFees(investors, getTotal(investors)));
