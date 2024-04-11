import Payrate from '../models/Payrate.js'

export const getPayrates = async (req, res, next) => {
    const payrates  = await Payrate.find();
    return res.json({ success: true, data: payrates });
};

export const createPayrate = async (req, res) => {
    try {
        const { name, value, taxPercentage, type, amount} = req.body;

        const payrate = new Payrate({
            name,
            value,
            taxPercentage,
            type,
            amount,
        });

        const savedUser = await payrate.save();

        return res.status(200).json({
            success: true, data: {
                name: savedUser.name,
                value: savedUser.value,
                taxPercentage: savedUser.taxPercentage,
                type: savedUser.type,
                amount: savedUser.amount,
            }
        });
    } catch (error) {
        console.error({success: true, data: error});
    }
};

export const getPayrate = async (req, res, next) => {
    const payrate = await Payrate.findById(req.params.payrateId);
    return res.json({ success: true, data: payrate });
};
export const deletePayrate = async (req, res, next) => {
    try {
        const payrate = await Payrate.findByIdAndDelete(req.params.payrateId);
        if (!payrate) {
            return res.status(404).json({ success: false, message: "Payrate not found" });
        }
        return res.status(200).json({ success: true, message: "Payrate deleted successfully" });
    } catch (error) {
        console.error({ success: false, data: error });
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updatePayrate = async (req, res, next) => {
    try {
        const { name, value, taxPercentage, type, amount} = req.body;
        const updatedPayrate = await Payrate.findByIdAndUpdate(
            req.params.payrateId,
            { name, value, taxPercentage, type, amount},
            { new: true }
        );
        if (!updatedPayrate) {
            return res.status(404).json({ success: false, message: "Payrate not found" });
        }
        return res.status(200).json({ success: true, data: updatedPayrate });
    } catch (error) {
        console.error({ success: false, data: error });
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const getPaginationPayrate = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    try {
      const payrates = await Payrate.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
  
      res.json({
        totalPayrates: await Payrate.countDocuments(),
        totalPages: Math.ceil(await Payrate.countDocuments() / limit),
        currentPage: page,
        payrates,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };