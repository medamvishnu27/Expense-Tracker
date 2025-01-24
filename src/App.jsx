import React, { useEffect, useState } from "react";
import ExpenseInput from "./components/ExpenseInput";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import useExpensesManger from "./hooks/useExpenses";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  // custom hook
  let { budget, setBudget, addExpense, expenses, totalExpeneses, filter, filterExpenses, setFilter, setSearchQuery, editExpense, deleteExpense } = useExpensesManger();
  
  // state to hold the Search Term
  const [searchTerm, setSearchTerm] = useState("");
  let searchDebounce = useDebounce(searchTerm, 300);
  
  // state to hold the expense being edited
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  // useEffect Hooks To handle The SideEffects
  useEffect(() => {
    setSearchQuery(searchDebounce);
  }, [searchDebounce, setSearchQuery]);

  // Alert for budget exceeding
  useEffect(() => {
    if (totalExpeneses > budget) {
      alert(`You have exceeded your budget by ${totalExpeneses - budget}`);
    }
  }, [totalExpeneses, budget]);

  return (
    <div className="container" data-aos="fade-up"
    data-aos-duration="3000">
      {/* budget input start */}
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control fs-3 fw-bolder"
          id="budget"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
        />
        <label htmlFor="floatingInput">BUDGET</label>
      </div>
      {/* budget input end */}

      {/* expense input */}
      <ExpenseInput 
        addExpense={addExpense} 
        editExpense={editExpense} 
        expenseToEdit={expenseToEdit} 
        setExpenseToEdit={setExpenseToEdit} 
      />
      {/* search and filter functionality */}
      <div className="card p-2 my-2">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="form-floating my-3">
              <input type="text" className="form-control" id="search"
                placeholder="search.." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
              <label htmlFor="search">Search</label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-auto">
            <div className="form-floating ">
              <select className="form-select" id="floatingSelect"
                onChange={(e) => setFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Entertaiment">Entertaiment </option>
                <option value="Travel">Travel</option>
                <option value="Hospital">Hospital</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* expenses list */}
      <ExpenseList 
        expenses={filterExpenses} 
        editExpense={(expense) => {
          setExpenseToEdit(expense);
        }} 
        deleteExpense={deleteExpense} 
      />

      {/* expenses summary */}
      <ExpenseSummary totalExpeneses={totalExpeneses} budget={budget} expenses={expenses} />
    </div>
  );
};

export default App;