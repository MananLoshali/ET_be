import { Amount } from "../Models/Amounts.js";

export const addAmounts = async (req, res) => {
  const userId = await req.params.id;
  const { title, amount, date, option, reference, amount_type } =
    await req.body;
  console.log(title, amount, date, option, reference, amount_type, userId);
  const newAmount = new Amount({
    userId,
    title,
    amount,
    date,
    option,
    reference,
    amount_type,
  });

  try {
    const savedAmount = await newAmount.save();
    res.status(201).json({
      success: true,
      message: `New ${amount_type} created`,
      nAmount: savedAmount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error from add income page",
      error,
    });
  }
};
