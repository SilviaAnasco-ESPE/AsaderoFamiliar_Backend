import e from 'express';
import { 
    getAllBranches as _getAllBranches, 
    getBranchById as _getBranchById,
    createBranch as _createBranch,
    updateBranch as _updateBranch,
    deleteBranch as _deleteBranch } from '../services/branchService.js';

const getAllBranches = async (req, res) => {
  try {
    const { page = 1, limit = 10, city, isActive } = req.query;
    const result = await _getAllBranches({
      page: parseInt(page),
      limit: parseInt(limit),
      city,
      isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined
    });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({ message: 'Error fetching branches', error: error.message });
  }
};
const getBranchById = async (req, res, next) => {
    try {
      const branch = await _getBranchById(req.params.id);
      res.status(200).json(branch);
    } catch (err) {
      next(err);
    }
};

const createBranch = async (req, res, next) => {
    try {
      const branch = await _createBranch(req.body);
      res.status(201).json(branch);
    } catch (err) {
      next(err);
    }
};
  
const updateBranch = async (req, res, next) => {
    try {
      const branch = await _updateBranch(req.params.id, req.body);
      res.status(201).json(branch);
    } catch (err) {
      next(err);
    }
};
  
const deleteBranch = async (req, res, next) => {
    try {
      const msg = await _deleteBranch(req.params.id);
      res.status(204).json(msg);
    } catch (err) {
      next(err);
    }
};

export {
    getAllBranches,
    getBranchById, 
    createBranch,
    updateBranch,
    deleteBranch
};