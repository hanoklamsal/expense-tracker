import React, { useContext } from 'react';
import { BarChart, Bar } from "recharts";
import { ExpenseContext } from '../../Context/ExpenseProvider';
import styles from './TopExpenses.module.css'

const TopExpenses = () => {
  const { categoryCount, expenses } = useContext(ExpenseContext);

  // Convert categoryCount into an array of objects and sort it in ascending order
  const categoryArray = [
    { category: "Food", count: categoryCount.foodCount },
    { category: "Entertainment", count: categoryCount.entertainmentCount },
    { category: "Travel", count: categoryCount.travelCount },
  ];

  // Sort the array by count in ascending order
  categoryArray.sort((a, b) => a.count - b.count);

  // Calculate widths based on the sorted category count and total number of expenses
  const totalExpenses = expenses.length;
  const categoriesWithWidth = categoryArray.map((item) => ({
    ...item,
    width: (item.count / totalExpenses) * 300,
  }));

  return (
    <div className={styles.expenseWrapper}>
      <h2 style={{fontStyle:"oblique", fontSize:'2em'}}>Top Expenses</h2>
      <div className={styles.expenseContainer}>
        {categoriesWithWidth.map((categoryItem) => (
          <div key={categoryItem.category} style={{ marginBottom: "20px" }}>
            {/* <span>{categoryItem.category}</span> */}
            <BarChart
              width={categoryItem.width}
              height={40}
              barSize={29}
              layout='vertical'
            >
              <Bar dataKey="uv" fill="#8884d8" />
            </BarChart>
          </div>
        ))}
        {expenses.length===0 && (
            <p style={{color:'gray', textAlign:'center', padding:'50px 0px', fontSize:'1.5rem'}}>
              No expenses to show
            </p>
          )}
      </div>
    </div>
  );
};

export default TopExpenses;
