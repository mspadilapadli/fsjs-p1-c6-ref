const helper = {
    formatCurrency(number) {
        let Idr = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        });
        return Idr.format(number);
    },
    formatSequelizeValidationErrors(error) {
        if (error.name === "SequelizeValidationError") {
            const errors = {};
            error.errors.forEach((el) => {
                errors[el.path] = el.message;
            });
            return errors;
        }
        return null;
    },
};

module.exports = helper;
