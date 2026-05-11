import express from 'express';
import { submitApplication, getApplications, updateStatus } from '../Controller/SellerController.js';

const router = express.Router();

router.post('/submit', submitApplication);
router.get('/all', getApplications);
router.put('/update/:id', updateStatus);

export default router;
