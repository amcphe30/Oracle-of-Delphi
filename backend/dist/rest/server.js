"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const Game_1 = __importDefault(require("../controller/Game"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3001;
const game = new Game_1.default("test oracle name", true);
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.get('/api/question', (req, res) => {
    try {
        console.log("getting question from game");
        const question = game.getQuestionText();
        res.json(question);
    }
    catch (err) {
        res.status(500).send('Error fetching question text');
    }
});
app.post('/submit-answer', (req, res) => {
    const { answer } = req.query;
    try {
        console.log(`Received answer: ${answer}`);
        res.status(200).json({ message: `Answer received: ${answer}` });
    }
    catch (err) {
        res.status(400).json({ error: 'Answer is required' });
    }
});
app.use(express_1.default.static(path_1.default.join(__dirname, '../../../public/build')));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
