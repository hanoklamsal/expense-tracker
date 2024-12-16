import ReactModal from "react-modal";
import styles from "./AddExpenseModal.module.css";
import { useState } from "react";
import { useContext } from "react";
import { ExpenseContext } from "../../Context/ExpenseProvider";

const AddExpenseModal = ({ openExpenseModal, closeExpenseModal }) => {
  const {addExpense, subtractIncome} = useContext(ExpenseContext);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddExpenseForm = (e) => {
    e.preventDefault();
    const expense = {
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
    };
    console.log(expense);
    addExpense(expense);
    setFormData({
        title: "",
        amount: "",
        category: "",
        date: "",
      });
    closeExpenseModal();
  };

  return (
    <ReactModal
      isOpen={openExpenseModal}
      onRequestClose={closeExpenseModal}
      contentLabel="Add Expense Modal"
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          width: "40vw",
          height: "27vh",
          margin: "auto",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "aliceblue",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <div className={styles.addExpenseModalWrapper}>
        <h2 style={{color:'black'}}>Add Expense</h2>
        <form className={styles.formWrapper} onSubmit={handleAddExpenseForm}>
          <div className={styles.formRow}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Price"
              required
            />
          </div>
          <div className={styles.formRow}>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Select Category
              </option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Travel">Travel</option>
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formBtn}>
            <button className={styles.addExpenseBtn} type="submit">
              Add Expense
            </button>
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={closeExpenseModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default AddExpenseModal;
