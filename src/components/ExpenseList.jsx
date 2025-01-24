import React from "react";

const ExpenseList = ({ expenses, editExpense, deleteExpense }) => {
  return (
    <div className="card p-3 shadow ">
      <h3 className="mx-auto fw-bold my-3 ">Expense List</h3>
      <ul className="list-group">
        {expenses.map((expense) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={expense.id}
          >
            <span className="text-primary-emphasis fw-bold fs-5 mx-5"> <span className="text-secondary">Expense Name:</span>{expense.name}</span>
            <span className="badge text-primary-emphasis fw-bold fs-5  ">
            <span className="text-secondary">Category:</span>
                {expense.category}
              </span>
            <span className="badge text-primary-emphasis fw-bold fs-5  ">
            <span className="text-secondary">Cost:</span>
              
              
              {expense.amount.toFixed(2)}
            </span>
            <button className="edit-btn btn btn-warning btn-md " onClick={() => editExpense(expense)}>
              Edit
            </button>
            <button className="del-btn btn btn-danger btn-md " onClick={() => deleteExpense(expense.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;