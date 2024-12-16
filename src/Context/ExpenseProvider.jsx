import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [walletBalance, setWalletBalance] = useState(() => {
    return parseFloat(localStorage.getItem("walletBalance")) || 5000;
  });

  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });

  const [totalExpense, setTotalExpense] = useState(0);

  const [categoryCount, setCategoryCount] = useState({
    foodCount: 0,
    entertainmentCount: 0,
    travelCount: 0,
  });

  useEffect(() => {
    const foodCategory = expenses.filter((e) => e.category === "Food");
    const entertainmentCategory = expenses.filter(
      (e) => e.category === "Entertainment"
    );
    const travelCategory = expenses.filter((e) => e.category === "Travel");
    
    setCategoryCount({
      foodCount: foodCategory.length,
      entertainmentCount: entertainmentCategory.length,
      travelCount: travelCategory.length,
    });
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [walletBalance, expenses]);

  useEffect(() => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpense(total);
  }, [expenses]);

  const addExpense = (expense) => {
    if (expense.amount < walletBalance) {
      setExpenses((prev) => [...prev, { ...expense, id: uuidv4() }]);
      enqueueSnackbar("Expense added successfully", { variant: "success" });
      setWalletBalance(walletBalance - expense.amount);
    } else {
      enqueueSnackbar("Insufficient Balance", { variant: "warning" });
    }
  };

  const editExpense = (id, updatedExpense) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    
    if (expenseToEdit) {
      const amountDifference = updatedExpense.amount - expenseToEdit.amount;

      if (amountDifference > 0) {
        if (walletBalance >= amountDifference) {
          setWalletBalance(walletBalance - amountDifference);
          enqueueSnackbar("Expense updated successfully", { variant: "success" });
        } else {
          enqueueSnackbar("Insufficient Balance", { variant: "warning" });
          return;
        }
      } else {
        setWalletBalance(walletBalance + Math.abs(amountDifference));
        enqueueSnackbar("Expense updated successfully", { variant: "success" });
      }

      setExpenses((prevState) =>
        prevState.map((expense) =>
          expense.id === id ? { ...expense, ...updatedExpense } : expense
        )
      );
    }
  };

  const deleteExpense = (id) => {
    setExpenses((prevState) =>
      prevState.filter((expense) => expense.id !== id)
    );
    enqueueSnackbar("Expense deleted successfully", { variant: "success" });
  };

  const addIncome = (income) => {
    setWalletBalance(
      parseFloat(localStorage.getItem("walletBalance")) + income
    );
    enqueueSnackbar("Income added successfully", { variant: "success" });
  };

  const subtractIncome = (income) => {
    setWalletBalance(
      parseFloat(localStorage.getItem("walletBalance")) - income
    );
  };

  useEffect(() => {
    if (walletBalance !== null) {
      setWalletBalance(walletBalance);
    }
  }, [walletBalance]);

  return (
    <ExpenseContext.Provider
      value={{
        walletBalance,
        expenses,
        totalExpense,
        addExpense,
        addIncome,
        subtractIncome,
        editExpense,
        deleteExpense,
        categoryCount,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
