import { useState, useContext, useEffect } from "react";
import { ExpenseContext } from "../../Context/ExpenseProvider";
import Card from "../Cards/Card";
import AddIncomeModal from "../Modals/AddIncomeModal";
import AddExpenseModal from "../Modals/AddExpenseModal";
import styles from "./Header.module.css";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, Bar, Legend } from "recharts";


const Header = () => {
  const { walletBalance, totalExpense } = useContext(ExpenseContext);

  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [openIncomeModal, setOpenIncomeModal] = useState(false);

  // Open the modal
  const handleOpenExpenseModal = () => {
    console.log("clicked");
    setOpenExpenseModal(true);
  };

  const handleOpenIncomeModal = () => {
    console.log("clicked");
    setOpenIncomeModal(true);
  };

  // Close the modal
  const handleCloseExpenseModal = () => {
    setOpenExpenseModal(false);
  };

  const handleCloseIncomeModal = () => {
    setOpenIncomeModal(false);
  };

  // useEffect to log the state whenever openExpenseModal changes
  useEffect(() => {
    console.log("Modal state changed:", openExpenseModal);
  }, [openExpenseModal]);

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={styles.headerWrapper}>
      <h1>Expense Tracker</h1>
      <div className={styles.headerItems}>
        <Card
          type="income"
          titleText="Wallet Balance: "
          amount={walletBalance}
          btnText="+ Add Income"
          onClick={handleOpenIncomeModal}
        />
        <Card
          type="expense"
          titleText="Expenses: "
          amount={totalExpense}
          btnText="+ Add Expense"
          onClick={handleOpenExpenseModal}
        />

        {/* Pass the modal visibility state and close handler */}
        <AddIncomeModal
          openIncomeModal={openIncomeModal}
          closeIncomeModal={handleCloseIncomeModal}
        />
        <AddExpenseModal
          openExpenseModal={openExpenseModal}
          closeExpenseModal={handleCloseExpenseModal}
        />

        <div
          className={styles.pieChartContainer}
          style={{ marginRight: "6em" }}
        >
          <div>
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx={"50%"}
                cy={"50%"}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div>
          <Legend iconType='rect' verticalAlign="bottom" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
