
import { Request, Response } from 'express';

// Função para obter o perfil do usuário autenticado
export const getUserProfile = (req: Request, res: Response) => {

  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'Usuário não autenticado' });
  }

  const userProfile = {
    id: user.id,
    username: user.username,
    email: 'user@example.com', 
  };

  res.json(userProfile);
};


