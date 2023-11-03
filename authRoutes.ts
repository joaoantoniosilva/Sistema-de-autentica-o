import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const authRouter: Router = express.Router();

// Rota de registro de usuário
authRouter.post('/register', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Verifique se o usuário já está registrado (substitua por seu próprio mecanismo de armazenamento de usuário)
  const existingUser = User.find((user) => user.username === username);

  if (existingUser) {
    return res.status(400).json({ message: 'Usuário já registrado' });
  }

  // Crie um novo usuário (substitua por sua própria lógica de armazenamento de usuário)
  const newUser: User = { id: User.length + 1, username, password };
  User.push(newUser);

  // Gere um token JWT para o novo usuário
  const token = jwt.sign({ id: newUser.id, username: newUser.username }, 'secretpassword', {
    expiresIn: '1h', 
  });

  res.status(201).json({ token });
});

// Rota de login de usuário
authRouter.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Verifique se o usuário existe (substitua por sua própria lógica de armazenamento de usuário)
  const user = User.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Gere um token JWT para o usuário autenticado
  const token = jwt.sign({ id: user.id, username: user.username }, 'secretpassword', {
    expiresIn: '1h', // Defina o tempo de expiração do token
  });

  res.json({ token });
});

export default authRouter;
