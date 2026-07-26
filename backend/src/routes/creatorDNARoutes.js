import { Router } from 'express';
import { generateDNA, getDNA } from '../controllers/creatorDNAController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Apply auth protection globally to all Creator DNA routes
router.use(protect);

// Routes mapping
router.post('/generate', generateDNA);
router.get('/', getDNA);

export default router;
