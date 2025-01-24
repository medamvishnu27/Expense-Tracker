import { useState, useEffect } from 'react';

const ExpenseInput = ({ addExpense, editExpense, expenseToEdit, setExpenseToEdit }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (expenseToEdit) {
      setName(expenseToEdit.name);
      setCategory(expenseToEdit.category);
      setAmount(expenseToEdit.amount);
    }
  }, [expenseToEdit]);

  const handleAdd = () => {
    if (name && amount) {
      if (expenseToEdit) {
        editExpense(expenseToEdit.id, { name, category, amount: parseFloat(amount) });
        setExpenseToEdit(null); // Reset expenseToEdit after updating
      } else {
        addExpense(name, category, amount);
      }
      setName("");
      setAmount("");
    }
  };

  return (
    <div className='card p-3'>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-4 col-lg-4">
          <div className="form-floating mb-3">
            <input type="text" className="form-control fs-3" id="floatingInput" 
              placeholder="enter the budget-name"
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <label htmlFor="floatingInput">Expense_Name</label>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-4 col-lg-4">
          <div className="form-floating ">
            <select className="form-select  fs-5 " id="floatingSelect" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All</option>
              <option value="Food">Food</option>
              <option value="Entertaiment">Entertaiment</option>
              <option value="Travel">Travel</option>
              <option value="Hospital">Hospital</option>
              <option value="Shopping">Shopping</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-2 col-lg-2">
          <div className="form-floating mb-3">
            <input type="number" className="form-control fs-3" id="floatingInput" 
              placeholder="enter the budget-price"
              value={amount} onChange={(e) => setAmount(e.target.value)} />
            <label htmlFor="floatingInput">COST</label>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-2 col-lg-2">
          <button className='btn btn-success btn-lg px-5 py-2' onClick={handleAdd}>
            {expenseToEdit ? "UPDATE" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseInput;