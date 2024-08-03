import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Puedes ajustar el tipo según tus necesidades
    }
  }
}
