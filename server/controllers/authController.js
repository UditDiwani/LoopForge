import bcrypt from 'bcrypt';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { buildAuthResponse } from '../services/authResponseService.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isStrongEnoughPassword(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
}

export async function register(req, res, next) {
  try {
    const username = String(req.body.username || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Enter a valid email address.' });
    }

    if (!isStrongEnoughPassword(password)) {
      return res.status(400).json({ message: 'Password does not meet the requirements.' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      passwordHash,
      guest: false,
    });

    return res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email, guest: false }).select('+passwordHash');

    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    user.lastActive = new Date();
    await user.save();

    return res.json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function createGuest(req, res, next) {
  try {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + env.guestSessionHours * 60 * 60 * 1000);
    const guestCount = await User.countDocuments({ guest: true });
    const user = await User.create({
      username: `Guest ${guestCount + 1}`,
      guest: true,
      lastActive: now,
      expiresAt,
    });

    return res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
}
