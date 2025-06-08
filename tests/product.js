const assert = require('assert')
const configs = require('./module/configs')
const { TestCase } = require('./module/testcase')

TestCase["Product Test's"] = {
    async setUp () {
        // Criando um produto na base dados

        let response = await fetch(configs.url('/api/enterprise'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: "Produto de teste: product"})
        })

        response = await fetch(response.headers.get('location'))

        this.enterprise_id = (await response.json()).id

        response = await fetch(configs.url('/api/product'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: "Produto de teste", price: 1500, enterpriseId: this.enterprise_id})
        })

        response = await fetch(response.headers.get('location'))

        this.product_id = (await response.json()).id

        response = await fetch(configs.url('/api/product'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: "Produto de teste", price: 1500, enterpriseId: this.enterprise_id})
        })

        response = await fetch(response.headers.get('location'))

        this.del_product_id = (await response.json()).id

        response = await fetch(configs.url('/api/product'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: "Produto de teste", price: 1500, enterpriseId: this.enterprise_id})
        })

        response = await fetch(response.headers.get('location'))

        this.update_product_id = (await response.json()).id

    },

    async "Create product" () {
        const response = await fetch(
            configs.url('/api/product'),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: "Produto de teste", price: 1500, enterpriseId: this.enterprise_id})
            }
        )

        assert.equal(response.status, 201)
    },

    async "Create product no data" () {
        const response = await fetch(configs.url('/api/product'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })

        assert.equal(response.status, 400)
    },

    async "Create product with enterprise invalid" () {
        const response = await fetch(
            configs.url('/api/product'),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: "Produto de teste", price: 1500, enterpriseId: 1000})
            }
        )

        assert.equal(response.status, 400)
    },

    async "Get product" () {
        const response = await fetch(configs.url(`/api/product/${this.product_id}`))

        assert.equal(response.status, 200)
    },

    async "Get product not exit" () {
        const response = await fetch(configs.url(`/api/product/1000`))

        assert.equal(response.status, 404)
    },

    async "Update product" () {
        const response = await fetch(configs.url(`/api/product/${this.update_product_id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: "Produto de teste update", price: 2000, enterpriseId: this.enterprise_id})
        })

        assert.equal(response.status, 200)
    },

    async "Update product not exist" () {
        const response = await fetch(configs.url(`/api/product/1000`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: "Produto de teste update", price: 2000, enterpriseId: this.enterprise_id})
        })

        assert.equal(response.status, 404)
    },

    async "Delete product" () {
        const response = await fetch(configs.url(`/api/product/${this.del_product_id}`), {
            method: "DELETE"
        })

        assert.equal(response.status, 200)
    },

    async "Delete enterprise not exist" () {
        const response = await fetch(configs.url(`/api/product/1000`), {
            method: "DELETE"
        })

        assert.equal(response.status, 404)
    },

    async "Get product list" () {
        const response = await fetch(configs.url(`/api/product`))

        assert.equal(response.status, 200)
    },

    async "Get product list from enterprise" () {
        const response = await fetch(configs.url(`/api/product/from_enterprise/${this.enterprise_id}`))

        assert.equal(response.status, 200)
    }
}