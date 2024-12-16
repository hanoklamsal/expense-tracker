import React, { useContext, useState } from 'react';
import styles from './Transaction.module.css';
import { ExpenseContext } from './../../Context/ExpenseProvider.jsx';
import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import ReactModal from 'react-modal';


const Transaction = () => {
    const { expenses, editExpense, deleteExpense } = useContext(ExpenseContext);
    const [openEditExpenseModal, setOpenEditExpenseModal] = useState(false);
    const [formData, setFormData] = useState({
      id: "",
      title: "",
      amount: "",
      date: "",
      category: "", 
    });

    const handleEditClick = (expense) => {
      setFormData({
        id: expense.id,
        title: expense.title,
        amount: Number(expense.amount),
        date: expense.date,
        category: expense.category,
      });
      setOpenEditExpenseModal(true);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      const { title, amount, date, category, id } = formData;
      if (!title || !amount || !date || !category) {
        alert("All fields are required!");
        return;
      }
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        alert("Please enter a valid amount!");
        return;
      }

      editExpense(id, { title, amount: parsedAmount, date, category });
      setOpenEditExpenseModal(false);
    };

    return (
      <>
        <div className={styles.transactionWrapper}>
          <h2 style={{fontStyle:"oblique", fontSize:'2em'}}>Recent Transactions</h2>
        <div className={styles.transactionContainer}>
          {expenses.label!==0 && expenses.map((expense) => (
            <div key={expense.id} className={styles.transactionItem}>
              <div className={styles.left}>
                <p>{expense.title}</p>
                <p>{expense.date}</p>
              </div>
              <div className={styles.right}>
                <p className={styles.price}>₹{expense.amount}</p>
                <div className={styles.deleteBtn} role="button">
                  <TiDeleteOutline
                    onClick={() => deleteExpense(expense.id)}
                    size={80}
                    strokeWidth={"0.01px"}
                    color="white"
                  />
                </div>
                <div className={styles.editBtn} role="button">
                  <CiEdit
                    onClick={() => handleEditClick(expense)}
                    size={24}
                    color="black"
                  />
                </div>
              </div>
            </div>
          ))}
        {expenses.length===0 && (
            <p style={{color:'gray', textAlign:'center', padding:'50px 0px', fontSize:'1.5rem'}}>
              No expenses to show
            </p>
          )}
        </div>
        </div>

        {/* Edit Expense Modal */}
        <ReactModal
          isOpen={openEditExpenseModal}
          onRequestClose={() => setOpenEditExpenseModal(false)}
          contentLabel="Edit Expense Modal"
          shouldCloseOnOverlayClick={true}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
            },
            content: {
              width: "30vw",
              height: "62vh",
              margin: "auto",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "aliceblue",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <div className={styles.modalContent}>
            <h2 style={{color:'black'}}>Edit Expense</h2>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Expense Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Expense Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.categoryLabel}>
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={styles.categorySelect}
                >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="utilities">Utilities</option>
                  <option value="health">Health</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.addButton}>
                  Save Changes
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setOpenEditExpenseModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </ReactModal>
      </>
    );
};

export default Transaction;
