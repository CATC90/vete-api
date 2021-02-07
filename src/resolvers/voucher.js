module.exports = {
    Voucher: {
        customer: async (parent, _, { Customer }) => {
            const customer = await Customer.findOne({ _id: parent.customer, _enabled: true });
            return customer;
        },
        veterinary: async (parent, _, { Veterinary }) => {
            const veterinary = await Veterinary.findOne({_id: parent.veterinary, _enabled: true });
            return veterinary;
        },
        products: async (parent, _, { Product }) => {

            const searchingProduct = parent.products.map(async ({quantity, product}) => {
                const foundedProduct = await Product.findById(product);
                return {
                    quantity,
                    product: foundedProduct
                }
            }); 
            const result = await Promise.all(searchingProduct);
            return result;
        }
    },
    Query: {
        findVoucherByCustomer:  async (parent, args, { Voucher }) => {
            const founded = await Voucher.find({ customer: args.id });
            return founded;
        },
        findVoucherByVeterinary:  async (parent, args, { Voucher }) => {
            const founded = await Voucher.find({ veterinary: args.id });
            return founded;
        },
        findAllVoucherBetween:  async (parent, args, { Voucher }) => {
            const founded = await Voucher.find({ createdAt: {
                $gte: ISODate(args.from),
                $lt: ISODate(args.to)
            } });
            return founded;
        }
    },
    Mutation: {
        createVoucher:  async (parent, args, { Voucher }) => {
            const created = await Voucher.create(args.voucher);
            return created;
        }
    }
}