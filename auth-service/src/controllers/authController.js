const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password, nickname } = req.body;

    // Existe?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña
 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario
    const newUser = new User({ email, password: hashedPassword,nickname });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por el email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar y devolver el token JWT
    const token = jwt.sign({ userId: user._id, nickname: user.nickname, email: user.email  }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) { 
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};