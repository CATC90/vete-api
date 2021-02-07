module.exports = {
    Product: {
        tags: async (parent, _, { Tag }) => {
            const foundedTags = await Tag.find({ _id: { $in: parent.tags }, _enabled: true});
            return foundedTags;
        }
    },
    Query: {
        findProductById: async (parent, args, { Product }) => {
            const found = await Product.findOne({_id: args.id, _enabled: true}).populate('tags');
            return found;
        },
        findProduct: async (parent, args, { Product }) => {
            const found = await Product.findOne({ [args.field] : args.value, _enabled: true }).populate('tags');
            return found;
        },
        findProductByTag: async(parent, args, { Product, Tag }) => {
            const foundedTag = Tag.findOne({ name: args.tag });

            return await Product.find({ tags: { $all : [ foundedTag._id ]}, _enabled: true}).populate('tags');
        }
    },
    Mutation: {
        createProduct:  async (parent, args, { Product, Tag }) => {
            const { tags } = args.product;
            const creatingTags = tags.map(tag => Tag.findOneAndUpdate({name: tag}, {}, { upsert: true }));
            const createdTags = await Promise.all(creatingTags);
            const createdTagsIds = createdTags.map(({_id}) => _id); 

            const created = await Product.create({ ...args.product, tags: createdTagsIds });
            return created;
        },
        updateProduct: async (parent, args, { Product }) => {
            const updated = await Product.findByIdAndUpdate(args.id, args.product);
            return updated;
        },
        deleteProduct: async (parent, args, { Product }) => {
            const deleted = await Product.findByIdAndUpdate(args.id, { enabled: false });
            return true;
        }
    }
}