import { RequestHandler } from 'express';

export const authAccessMiddleware: RequestHandler = async (req, res) => {
  //todo access check
  req.next();
};
