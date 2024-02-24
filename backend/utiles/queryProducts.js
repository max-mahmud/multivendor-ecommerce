class queryProducts {
    products = []
    query = {}
    constructor(products, query) {
        this.products = products
        this.query = query
    }
    categoryQuery = () => {
        if (this.query.category != false) {
            this.query.pageNumber = 1
            this.products = this.query.category ? this.products.filter(c => c.category === this.query.category) : this.products
        }
        return this
    }
    ratingQuery = () => {
        this.products = this.query.rating ? this.products.filter(c => parseInt(this.query.rating) <= c.rating && c.rating < parseInt(this.query.rating) + 1) : this.products
        return this
    }
    priceQuery = () => {
        this.products = this.products.filter(p => p.price >= this.query.lowPrice && p.price <= this.query.highPrice)
        return this
    }
    searchQuery = () => {
        this.products = this.query.searchValue ? this.products.filter(p => p.name.toUpperCase().indexOf(this.query.searchValue.toUpperCase()) > -1) : this.products
        return this
    }
    sortByPrice = () => {
        if (this.query.sortPrice) {
            if (this.query.sortPrice === 'low-to-high') {
                this.products = this.products.sort(function (a, b) { return a.price - b.price })
            } else {
                this.products = this.products.sort(function (a, b) { return b.price - a.price })
            }
        }
        return this
    }
    sortByAtoZ = () => { }

    sortByOldTONew = () => {
        if (this.query.sortByDate) {
            if (this.query.sortByDate === 'old-to-new') {
                this.products = this.products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            } else if (this.query.sortByDate === 'new-to-old') {
                this.products = this.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
        }
        return this;
    }
    Availability = () => {
        if (this.query.availability) {
            const availabilityStatus = this.query.availability.toLowerCase();
            if (availabilityStatus === 'in-stock') {
                this.products = this.products.filter(product => product.stock > 0);
            } else if (availabilityStatus === 'out-of-stock') {
                this.products = this.products.filter(product => product.stock === 0);
            }
        }
        return this;
    }

    skip = () => {
        let { pageNumber } = this.query
        const skipPage = (parseInt(pageNumber) - 1) * this.query.parPage

        let skipProduct = []

        for (let i = skipPage; i < this.products.length; i++) {
            skipProduct.push(this.products[i])
        }
        this.products = skipProduct
        return this
    }
    limit = () => {
        let temp = []
        if (this.products.length > this.query.parPage) {
            for (let i = 0; i < this.query.parPage; i++) {
                temp.push(this.products[i])
            }
        } else {
            temp = this.products
        }
        this.products = temp

        return this
    }

    colorQuery = () => {
        if (this.query.color == "") {
            return this;
        }
        if (this.query.color != false) {
            this.query.pageNumber = 1
            const colorHash = "#" + this.query.color
            this.products = this.products.filter(product => product.colorArray.includes(colorHash));
        }
        return this;
    }
    tagQuery = () => {
        if (this.query.tag != false) {
            this.query.pageNumber = 1
            this.products = this.products.filter(product => product.tagArray.includes(this.query.tag));
        }
        return this;
    }

    getProducts = () => {
        return this.products
    }
    countProducts = () => {
        return this.products.length
    }
}
module.exports = queryProducts
