import { Amount } from "../Models/Amounts.js";

export const deleteAmounts = async (req, res) => {
  try {
    await Amount.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error from add income page",
      error,
    });
  }
};
