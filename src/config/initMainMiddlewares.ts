import express from 'express';
import cors from 'cors';

export const initMainMiddlewares = (app: express.Express) => {
  app.use(cors());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    next();
  });
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
};
