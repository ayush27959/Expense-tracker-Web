import TransactionModel from "../Transaction/transaction.modal.js";

export const getReport = async (req, res) => {
  try {
    const { id, role } = req.user;
    // console.log(id,role);
    let transaction = [];
    if (role == "admin") {
       transaction = await TransactionModel.find().lean();
    }
    else{
        transaction = await TransactionModel.find({
        userId: id,
      }).lean();
    }

    let totalCredit = 0;
    let totalDebit = 0;

    transaction.forEach((txn) => {
      if (txn.transactionType === "cr") {
        totalCredit += txn.amount;
      } else if (txn.transactionType === "dr") {
        totalDebit += txn.amount;
      }
    });

    const totalTransaction = transaction.length;
    const balance = totalCredit - totalDebit;

    const estimate = (value) => Math.floor(value + value * 0.15);

    //daily chart (last 30 days)
    const dailyMap = {};

    transaction.forEach((txn) => {
      const date = new Date(txn.createdAt).toISOString().slice(0, 10);

      dailyMap[date] = (dailyMap[date] || 0) + Number(txn.amount);
    });

    // transaction.forEach((txn)=>{
    // const date = new Date(txn.createdAt).toISOString().slice(0, 10);

    // });
    //last30  30days
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateSTR = d.toISOString().slice(0, 10);
      last30Days.push({
        date: dateSTR,
        total: dailyMap[dateSTR] || 0,
      });
    }

    // ✅ response loop ke bahar
    //show balance and debit credit
    return res.status(200).json({
      summary: {
        totalTransaction,
        totalCredit,
        totalDebit,
        balance,

        totalTransactionEstimate: estimate(totalTransaction),
        totalCreditEstimate: estimate(totalCredit),
        totalDebitEstimate: estimate(totalDebit),
        balanceEstimate: estimate(balance),
      },
      chart: last30Days,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};
