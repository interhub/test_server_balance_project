import { RequestHandler } from 'express';

export const checkUserIdPathParam: RequestHandler<{ user_id: string }> = (req, res) => {
  const user_id = req.params.user_id;
  if (!user_id) return res.status(400).json({ message: 'user_id query param is required' });
  req.next();
};
