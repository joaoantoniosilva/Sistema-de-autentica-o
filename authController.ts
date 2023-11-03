import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const registerUser = (req: Request, res: Response) => {
  // Lógica para registrar um novo usuário
  // Substitua por sua própria lógica de armazenamento de usuário
  const newUser = { id: 1, username: 'example_user', password: 'example_password' };

  // Gere um token JWT para o novo usuário
  const token = jwt.sign({ id: newUser.id, username: newUser.username }, 'secretpassword', {
    expiresIn: '1h', // Defina o tempo de expiração do token
  });

  res.status(201).json({ token });
};

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Substitua por sua própria lógica de armazenamento de usuário
  const user = { id: 1, username: 'example_user', password: 'example_password' };

  if (!user || user.username !== username || user.password !== password) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Gere um token JWT para o usuário autenticado
  const token = jwt.sign({ id: user.id, username: user.username }, 'secretpassword', {
    expiresIn: '1h', // Defina o tempo de expiração do token
  });

  res.json({ token });
};