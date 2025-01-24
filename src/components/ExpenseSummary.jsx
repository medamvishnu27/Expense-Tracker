import React from 'react';

const ExpenseSummary = ({ totalExpeneses, budget, expenses }) => {
  // calculating the Remaining amount 
  let ReaminingAmount = budget - totalExpeneses;

  // Calculate total spent by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // Sort categories by amount spent
  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  return (
    <div className='card my-2 shadow'>
      <h3 className='card-title text-black mx-auto fw-bold my-2'>Summary</h3>
      <div className="card-body my-1 mx-2">
        <p className='card-text text-success fw-bold'>
          <span className='text-secondary fw-bold'>TOTAL EXPENSES:</span>{totalExpeneses.toFixed(2)}
        </p>
        <p className='card-text text-danger fw-bold'>
          <span className='text-secondary fw-bold'>REMAINING BUDGET:</span>{ReaminingAmount.toFixed(2)}
        </p>
        <h5 className='text-black fw-bold my-3 fs-4'>Spend Analysis:</h5>
        <ul className='list-group  fw-bold'>
          {sortedCategories.map(([category, amount]) => (
            <li className='list-group-item d-flex justify-content-between align-items-center text-secondary fs-5' key={category}>
              <span>{category}</span>
              <span>{amount.toFixed(2)} ({((amount / budget) * 100).toFixed(2)}%)</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseSummary;