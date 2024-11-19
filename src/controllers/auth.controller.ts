import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const usuario = await prisma.usuario.findUnique({ where: { email } });
      
      if (!usuario || !await bcrypt.compare(password, usuario.password)) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, rol: usuario.rol },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Error en login" });
    }
  }
}; 