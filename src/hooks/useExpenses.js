import { useMemo, useCallback, useState, useEffect } from "react";

const useExpensesManger = (initialBudget = 2000) => {
  const [budget, setBudget] = useState(initialBudget);
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const addExpense = useCallback((name, category, amount) => {
    const newExpense = { id: Date.now(), name, category, amount: parseFloat(amount) };
    setExpenses((prev) => {
      const updatedExpenses = [...prev, newExpense];
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  }, []);

  const editExpense = useCallback((id, updatedExpense) => {
    setExpenses((prev) => {
      const updatedExpenses = prev.map((expense) =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  }, []);

  const deleteExpense = useCallback((id) => {
    setExpenses((prev) => {
      const updatedExpenses = prev.filter((expense) => expense.id !== id);
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  }, []);

  let filterExpenses = useMemo(() => {
    return expenses
      .filter((expense) =>
        expense.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((expense) =>
        filter === "All" ? true : expense.category === filter
      );
  }, [expenses, filter, searchQuery]);

  let totalExpeneses = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  return {
    budget,
    setBudget,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    expenses,
    setExpenses,
    addExpense,
    editExpense,
    deleteExpense,
    filterExpenses,
    totalExpeneses,
  };
};

export default useExpensesManger;