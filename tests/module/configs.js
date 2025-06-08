const configs = {
    PORT: 0,
    BASE_URL: '',
    url (path) {
        return `${this.BASE_URL}${path}`
    },
    async set_up() {
        const get_port = (await import('get-port')).default
        
        this.PORT     = await get_port()
        this.BASE_URL = `http://localhost:${configs.PORT}`
    }
}

module.exports = configs