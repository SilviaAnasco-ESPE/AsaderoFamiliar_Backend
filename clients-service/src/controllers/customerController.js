import e from 'express';
import { 
getAllCustomers as _getAllCustomers, 
getCustomerById as _getCustomerById,
createCustomer as _createCustomer,
updateCustomer as _updateCustomer,
deleteCustomer as _deleteCustomer } from '../services/customerService.js';

const getAllCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await _getAllCustomers({
      page: parseInt(page),
      limit: parseInt(limit)
    });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
};
const getCustomerById = async (req, res, next) => {
    try {
      const customer = await _getCustomerById(req.params.id);
      res.status(200).json(customer);
    } catch (err) {
      next(err);
    }
};

const createCustomer = async (req, res, next) => {
    try {
      const customer = await _createCustomer(req.body);
      res.status(201).json(customer);
    } catch (err) {
      next(err);
    }
};
  
const updateCustomer = async (req, res, next) => {
    try {
      const customer = await _updateCustomer(req.params.id, req.body);
      res.status(201).json(customer);
    } catch (err) {
      next(err);
    }
};
  
const deleteCustomer = async (req, res, next) => {
    try {
      const msg = await _deleteCustomer(req.params.id);
      res.status(204).json(msg);
    } catch (err) {
      next(err);
    }
};

export {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};