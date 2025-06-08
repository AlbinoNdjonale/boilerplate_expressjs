const TestCase = {}

const print = (results, n_tests, n_tests_ok, n_tests_err, messagens) => {
    console.log(String.fromCharCode(27)+'c')

    console.log(results.join(' '))
    console.log('_'.repeat(35))
    console.log(`Run ${n_tests} test${n_tests>1?"s":""}\n`)
    console.log(`Ok: ${n_tests_ok}`)
    console.log(`Error: ${n_tests_err}\n`)
    console.log(messagens.join('\n'))
}

module.exports = {
    TestCase,
    async run () {
        let n_tests     = 0
        let n_tests_ok  = 0
        let n_tests_err = 0

        const results = []

        const messagens = []

        const no_set_ups = []

        for (const test_case in this.TestCase) {
            if ("setUp" in this.TestCase[test_case]) {
                try {
                    await this.TestCase[test_case].setUp()
                } catch (error) {
                    no_set_ups.push(`${test_case}: ${error.message}`)
                    continue
                }
            }

            for (const test in this.TestCase[test_case]) {
                if (test === "setUp" || !(this.TestCase[test_case][test] instanceof Function)) continue

                n_tests++

                try {
                    await this.TestCase[test_case][test]()
                    
                    results.push('.')
                    n_tests_ok++
                } catch (error) {
                    messagens.push(`${test_case}/${test}:\n${" ".repeat(5)}${error.message}`)
                    results.push('x')
                    n_tests_err++
                }

                print(results, n_tests, n_tests_ok, n_tests_err, messagens)
            }
        }

        print(results, n_tests, n_tests_ok, n_tests_err, messagens)

        if (no_set_ups.length > 0) {
            console.log("Os seguintes conjutos de testes não foram executados porque a execução dos seus metodos de setUp falharam\n")

            console.log(no_set_ups.join("\n"))

            return 1
        }

        return n_tests_err === 0?0:1
    }
}