const syntaxKeys = {
    gte: "$gte",
    gt: "$gt",
    in: "$in",
    lte: "$lte",
    all: "$all",
    lt: "$lt",
    eq: "$eq",
    nin: "$nin",
    ne: "$ne",
    and: "$and",
    nor: "$nor",
    or: "$or",
    exists: "$exists",
    regex: "$regex",
    size: "$size",
}

const conditions = [
    {
        eval: field => Array.isArray(field),
        action: values => values.map(child => {
            if(typeof child === "object"){
                return replaceMongoSyntax(child)
            }
            return child;
        })
    },
    {
        eval: field => typeof field === "object",
        action: field => replaceMongoSyntax(field)
    },
    {
        eval: () => true,
        action: value => value
    }
]

const replaceMongoSyntax = (query) => {
    const json = Object.entries(query).reduce((prev, [key, field]) => {
        const replacedKey = syntaxKeys[key] || key;

        return {
            ...prev, 
            [replacedKey]: conditions.find(({ eval }) => eval(field)).action(field) 
        }
    },{})
    return json;
}

module.exports = replaceMongoSyntax;