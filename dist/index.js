"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', routes_1.default);
const PORT = process.env.PORT || 6000;
app.listen(PORT, error => {
    if (error) {
        console.log('Erro ao iniciar o servidor');
    }
    else {
        console.log('Servidor rodando na porta ' + PORT);
    }
});
