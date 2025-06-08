import express from 'express'

import router from './routes'

const app = express()

app.use(express.json())

app.use('/api', router)

const PORT = process.env.PORT || 6000
app.listen(PORT, error => {
    if (error) {
        console.log('Erro ao iniciar o servidor')
    } else {
        console.log('Servidor rodando na porta '+PORT)
    }
})
