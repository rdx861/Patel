import React, { useState } from 'react';

interface Transaction {
  type: 'billing' | 'non-billing' | 'expense' | 'take-money';
  amount: number;
  description: string;
  date: string;
}

interface Report {
  totalBilling: number;
  totalNonBilling: number;
  totalExpenses: number;
  balance: number;
}

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [report, setReport] = useState<Report>({
    totalBilling: 0,
    totalNonBilling: 0,
    totalExpenses: 0,
    balance: 0,
  });

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
    updateReport(transaction);
  };

  const updateReport = (transaction: Transaction) => {
    switch (transaction.type) {
      case 'billing':
        setReport({
          ...report,
          totalBilling: report.totalBilling + transaction.amount,
          balance: report.balance + transaction.amount,
        });
        break;
      case 'non-billing':
        setReport({
          ...report,
          totalNonBilling: report.totalNonBilling + transaction.amount,
        });
        break;
      case 'expense':
        setReport({
          ...report,
          totalExpenses: report.totalExpenses + transaction.amount,
          balance: report.balance - transaction.amount,
        });
        break;
      case 'take-money':
        setReport({
          ...report,
          balance: report.balance - transaction.amount,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Daily Financial Activities</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const transaction: Transaction = {
            type: (e.target as any).type.value,
            amount: parseFloat((e.target as any).amount.value),
            description: (e.target as any).description.value,
            date: new Date().toISOString().split('T')[0],
          };
          handleAddTransaction(transaction);
          (e.target as any).reset();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Type
          </label>
          <select
            className="block w-full p-2 pl-10 text-sm text-gray-700"
            id="type"
            name="type"
          >
            <option value="billing">Billing</option>
            <option value="non-billing">Non-Billing</option>
            <option value="expense">Expense</option>
            <option value="take-money">Take Money</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            className="block w-full p-2 pl-10 text-sm text-gray-700"
            id="amount"
            name="amount"
            type="number"
            step="any"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            className="block w-full p-2 pl-10 text-sm text-gray-700"
            id="description"
            name="description"
            type="text"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add Transaction
        </button>
      </form>
      <h2 className="text-2xl font-bold mb-4">Report</h2>
      <div className="mb-4">
        <p>Total Billing: ${report.totalBilling.toFixed(2)}</p>
        <p>Total Non-Billing: ${report.totalNonBilling.toFixed(2)}</p>
        <p>Total Expenses: ${report.totalExpenses.toFixed(2)}</p>
        <p>Balance: ${report.balance.toFixed(2)}</p>
      </div>
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{transaction.date}</td>
              <td className="px-4 py-2">{transaction.type}</td>
              <td className="px-4 py-2">${transaction.amount.toFixed(2)}</td>
              <td className="px-4 py-2">{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;