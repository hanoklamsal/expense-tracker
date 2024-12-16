import { useState,useContext } from "react";
import { ExpenseContext } from "../../Context/ExpenseProvider";
import ReactModal from "react-modal";
import styles from './AddIncomeModal.module.css'

const AddIncomeModal = ({ openIncomeModal, closeIncomeModal }) => {
  const {addIncome} = useContext(ExpenseContext);
  const [formData, setFormData] = useState({
    amount:""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddIncomeForm = (e) => {
    console.log("income");
    e.preventDefault();
    const income = {
      amount: parseFloat(formData.amount),
    };
    addIncome(income.amount);
    closeIncomeModal();
  };

  return (
    <ReactModal
      isOpen={openIncomeModal}
      onRequestClose={closeIncomeModal}
      contentLabel="Add Expense Modal"
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          width: "30vw",
          height: "21vh",
          margin: "auto",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "aliceblue",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <div className={styles.addIncomeModalWrapper}>
        <h2 style={{color:'black'}}>Add Expense</h2>
        <form className={styles.formWrapper} onSubmit={handleAddIncomeForm}>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Price"
              required
            />
          <div className={styles.formBtn}>
            <button className={styles.addIncomeBtn} type="submit">
              Add Income
            </button>
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={closeIncomeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default AddIncomeModal;
