const assert = require('assert')
const configs = require('./module/configs')
const { TestCase } = require('./module/testcase')

TestCase["Enterprise Test's"] = {
    async setUp () {
        // Criando uma empresa na base dados
        
        this.enterprise_name = "Empresa de Teste"

        let response = await fetch(configs.url('/api/enterprise'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: this.enterprise_name})
        })

        response = await fetch(response.headers.get('location'))

        this.enterprise_id = (await response.json()).id

        response = await fetch(configs.url('/api/enterprise'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: "Enterprise for delete"})
        })

        response = await fetch(response.headers.get('location'))

        this.del_enterprise_id = (await response.json()).id

        response = await fetch(configs.url('/api/enterprise'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: "Enterprise for update"})
        })

        response = await fetch(response.headers.get('location'))

        this.update_enterprise_id = (await response.json()).id

    },

    async "Create enterprise" () {
        const response = await fetch(
            configs.url('/api/enterprise'),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: "GTechnology"})
            }
        )

        assert.equal(response.status, 201)
    },

    async "Create enterprise no data" () {
        const response = await fetch(configs.url('/api/enterprise'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })

        assert.equal(response.status, 400)
    },

    async "Create enterprise with attribute name duplicated" () {
        const response = await fetch(configs.url('/api/enterprise'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: this.enterprise_name})
        })

        assert.equal(response.status, 400)
    },

    async "Get enterprise" () {
        const response = await fetch(configs.url(`/api/enterprise/${this.enterprise_id}`))

        assert.equal(response.status, 200)
    },

    async "Get enterprise not exit" () {
        const response = await fetch(configs.url(`/api/enterprise/1000`))

        assert.equal(response.status, 404)
    },

    async "Update enterprise" () {
        const response = await fetch(configs.url(`/api/enterprise/${this.update_enterprise_id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: "Name update"})
        })

        assert.equal(response.status, 200)
    },

    async "Update enterprise not exist" () {
        const response = await fetch(configs.url(`/api/enterprise/1000`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: "Name update not exit"})
        })

        assert.equal(response.status, 404)
    },

    async "Update enterprise with name duolicated" () {
        const response = await fetch(configs.url(`/api/enterprise/${this.update_enterprise_id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: this.enterprise_name})
        })

        assert.equal(response.status, 400)
    },

    async "Delete enterprise" () {
        const response = await fetch(configs.url(`/api/enterprise/${this.del_enterprise_id}`), {
            method: "DELETE"
        })

        assert.equal(response.status, 200)
    },

    async "Delete enterprise not exist" () {
        const response = await fetch(configs.url(`/api/enterprise/1000`), {
            method: "DELETE"
        })

        assert.equal(response.status, 404)
    },

    async "Get enterprise list" () {
        const response = await fetch(configs.url(`/api/enterprise`))

        assert.equal(response.status, 200)
    }
}