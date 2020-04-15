import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc, transacion) => {
        if (transacion.type === 'income') {
          acc.income += transacion.value;
        }
        if (transacion.type === 'outcome') {
          acc.outcome += transacion.value;
        }

        acc.total = acc.income - acc.outcome;

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({ value, type, title });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
