import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const productoController = {
  async getAll(req: Request, res: Response) {
    try {
      const productos = await prisma.producto.findMany();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener productos" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const producto = await prisma.producto.create({
        data: req.body
      });
      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ error: "Error al crear producto" });
    }
  }
}; 