import express from 'express';
import { register, login, verifyOTP } from '../controllers/authControllers.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.get('/me', authenticateToken, (req, res) => {
    res.status(200).json({
      name: req.user.name,
      phone: req.user.phone
    });
  });

export default router;

