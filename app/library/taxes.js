// All tax related module

taxes = {

	allTaxCategories:{
	    NOT_TAXED: 			{key: "NOT_TAXED", value: "notTaxed", label: "Not Taxed", rule: "notTaxed", taxable: false, country: "CA", state: "ALL", description: "This item is non-taxable, whether sold idividually or as a larger order."},
	    GST_TAX: 			{key: "GST_TAX", value: "gstTax", label: "GST Tax", rule: "gstTax", taxable: true, country: "CA", state: "ALL", description: "This item is gst-taxable (5%), whether sold idividually or as a larger order. No further (provincial) taxes will be applied for these items."},
	    RETAIL_TAX: 		{key: "RETAIL_TAX", value: "retailTax", label: "Retail Tax", rule: "retailTax", taxable: true, country: "CA", state: "ALL", description: "This is a retail item and will be taxed at the standard retail tax rate."},
	    PREPARED_MEAL: 		{key: "PREPARED_MEAL", value: "preparedMeal", label: "Prepared Food and Beverages", rule: "preparedMeal", taxable: true,  country: "CA", state: "ON", description: "This item is considered a prepared meal or beverage and a total order amount of less than $4 will only carry a GST (5%). Orders larger than $4 will be taxed at standard retail tax (HST 13%)."},
	    WHOLESALE_PASTRY: 	{key: "WHOLESALE_PASTRY", value: "wholesalePastry", label: "Wholesale Pastry", rule: "wholesalePastry", taxable: true,  country: "CA", state: "ON", description: "This is a pastry item and is applicable for the wholesale pastry rule where an order of 6 or more quantity of these items will be tax free. An order of less than $4 will also be tax free. Anything else will be taxed at retail tax rate."}
	},



};

module.exports = taxes;