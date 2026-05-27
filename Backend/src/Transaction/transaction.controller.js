import e from "cors";
import TransactionModel from "./transaction.modal.js";
export const createTransaction = async (req, res) => {
  try {
    const data = req.body;
    const {id} = req.user;
    data.userId = id;
    const transaction = await new TransactionModel(data).save();
res.json(transaction);
    // res.json({ message: "Transaction created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateTransaction = async (req, res) => {
  try {
       const data = req.body;
       const {id}=req.params;
const transaction =await TransactionModel.findByIdAndUpdate(id,data,{new:true})
  if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found!",
        data: transaction,
      });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// export const updateTransaction = async (req, res) => {
//   console.log("update body:", req.body);
//   try {
//     // res.json({ message: "Update Requested" });
//     res.json(transaction);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await TransactionModel.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found!",
        data: transaction,
      });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTransactions = async (req, res) => {
  try {
        const {id} = req.user;
        const {page,limit} = req.query;
        const skip= (page-1)*limit;
const transactions = await TransactionModel
  .find({ userId: id })
  .sort({ createdAt: -1 })

    // res.json({ message: "Get Requested" });
    .skip(skip)
    .limit(limit);
    const total=await TransactionModel.countDocuments({ userId: id });
    res.json({
      data: transactions,
      total
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
