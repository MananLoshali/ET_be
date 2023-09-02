import { Amount } from "../Models/Amounts.js";

export const getAmounts = async (req, res) => {
  const newAmountsQuery = req.query.new; //return latest 3 transaction whether income or expenses
  const getIncomeQuery = req.query.income; //return all incomes of a particular user
  const getExpenseQuery = req.query.expense; //return all expenses of a particular user

  let result;

  try {
    if (newAmountsQuery) {
      result = await Amount.find({ userId: req.params.id })
        .sort({ createdAt: -1 })
        .limit(3);
    } else if (getIncomeQuery) {
      let res = await Amount.find({ userId: req.params.id });
      result = res.filter((item) => item.amount_type != "expenses");
    } else if (getExpenseQuery) {
      let res = await Amount.find({ userId: req.params.id });
      result = res.filter((item) => item.amount_type != "incomes");
    }
    res
      .status(200)
      .json({ success: true, message: " transactions", amounts: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error from add income page",
      error,
    });
  }
};
