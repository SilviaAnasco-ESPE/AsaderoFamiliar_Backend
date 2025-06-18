import express from 'express';
import { 
    getAllEmployees, 
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from '../controllers/employeeController.js';
import { 
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
} from '../controllers/branchController.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'employees-service' });
});

// Employee routes
router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployeeById);
router.post('/employees', createEmployee);
router.put('/employees/:id', updateEmployee);   
router.delete('/employees/:id', deleteEmployee);

// Branch routes
router.get('/branches', getAllBranches);
router.get('/branches/:id', getBranchById);
router.post('/branches', createBranch);
router.put('/branches/:id', updateBranch);   
router.delete('/branches/:id', deleteBranch);

export default router;