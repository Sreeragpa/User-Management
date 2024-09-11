import express from 'express';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import flash from 'connect-flash';
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')))

app.use(flash());

app.use((req, res, next) => {
    res.locals.errorMessage = req.flash('error');
    res.locals.successMessage = req.flash('success');
    next();
});


// Connect DB
connectDB()

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));

app.use('/', authRoutes);
app.use('/', userRoutes);



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
