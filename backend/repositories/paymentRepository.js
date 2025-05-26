import { pool } from "../config/db.js";

export const addPayment = async (payment, client = null) => {
  const { paymentId, userId, totalAmount, status } = payment;

  const query = `
    INSERT INTO payment ("paymentId", "userId", amount, status)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [paymentId, userId, totalAmount, status];

  const executor = client || pool;
  const { rows } = await executor.query(query, values);
  return rows[0]; 
};

export const getPaymentById = async (paymentId) => {
  const query = `
    SELECT * FROM payment WHERE "paymentId" = $1
  `;
  const { rows } = await pool.query(query, [paymentId]);
  return rows[0];
};
