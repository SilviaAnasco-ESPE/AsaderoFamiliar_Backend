import e from 'express';
import { 
getAllEmployees as _getAllEmployees, 
getEmployeeById as _getEmployeeById,
createEmployee as _createEmployee,
updateEmployee as _updateEmployee,
deleteEmployee as _deleteEmployee } from '../services/employeeService.js';

const getAllEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, branch, isActive } = req.query;
    const result = await _getAllEmployees({
      page: parseInt(page),
      limit: parseInt(limit),
      role,
      branch,
      isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined
    });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};
const getEmployeeById = async (req, res, next) => {
    try {
      const employee = await _getEmployeeById(req.params.id);
      res.status(200).json(employee);
    } catch (err) {
      next(err);
    }
};

const createEmployee = async (req, res, next) => {
    try {
      const employee = await _createEmployee(req.body);
      res.status(201).json(employee);
    } catch (err) {
      next(err);
    }
};
  
const updateEmployee = async (req, res, next) => {
    try {
      const employee = await _updateEmployee(req.params.id, req.body);
      res.status(201).json(employee);
    } catch (err) {
      next(err);
    }
};
  
const deleteEmployee = async (req, res, next) => {
    try {
      const msg = await _deleteEmployee(req.params.id);
      res.status(204).json(msg);
    } catch (err) {
      next(err);
    }
};

export {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};