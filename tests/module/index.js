const { execSync, spawn } = require('child_process')
const fs = require('fs')
const configs = require('./configs')
const tests = require('./testcase')
const { exit } = require('process')

const wait_server = async (timeout = 7000) => {
    let wait = true

    setTimeout(() => {wait = false}, timeout)

    while (wait) {
        try {
            await fetch(configs.BASE_URL)

            return true
        } catch (error) {}
    }

    console.log('O tempo de espera do servidor se esgotou')
    exit(1)
}

const run = async () => {
    await configs.set_up()

    process.env.PORT = configs.PORT.toString()

    const db_path_base = "database/database_test.db"
    const db_url = `file:./${db_path_base}`

    const db_path = `./prisma/${db_path_base}`
    if (fs.existsSync(db_path)) {
        fs.unlinkSync(db_path)
    }

    process.env.DATABASE_URL = db_url

    execSync('npx prisma db push', { stdio: 'ignore', env: process.env })

    const server = spawn('npm', ['run', 'start'], { env: process.env })

    console.log("Subindo o servidor ...")
    await wait_server()

    const result_tests = await tests.run()
    server.kill()

    exit(result_tests)
}

module.exports = run
