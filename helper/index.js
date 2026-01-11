const helper = {
    formatCurrency(number) {
        let Idr = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        });
        return Idr.format(number);
    },
};

module.exports = helper;
