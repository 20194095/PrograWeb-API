import userRepository from '../repositories/userRepository.js';

export const getAllUsers = (req, res) => {
  const users = userRepository.findAll();
  res.status(200).json(users);
};

export const registerUser = (req, res) => {
  const user = req.body;
  const newUser = userRepository.create(user);
  res.status(201).json(newUser);
};

export const loginUser = (req, res) => {
  const { username, password } = req.body;
  const user = userRepository.findByUsername(username);
  if (user && user.password === password) { // En una app real, verifica con hash
    res.status(200).json({ message: "Inicio de sesión exitoso", user });
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
};
