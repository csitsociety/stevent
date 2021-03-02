module.exports = (fields) => (req, res, next) => {
    // Check we have all the required fields
    for (let field of fields) {
        if (!req.body[field]) {
            return res.status(400).json({
                success: false,
                errors: { main: `Expected field '${field}'` }
            })
        }
    }

    // If we have all the fields
    next()
}
