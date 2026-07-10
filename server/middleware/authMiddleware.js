import { User } from '../models/User.js';
import { verifyUserToken } from '../services/tokenService.js';

export async function requireAuth(req, res, next) {
  try {
    const header = req.get('authorization');
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Authentication token required.' });
    }

    const payload = verifyUserToken(token);
    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: 'Session user no longer exists.' });
    }

    if (user.expiresAt && user.expiresAt <= new Date()) {
      await User.findByIdAndDelete(user._id);
      return res.status(401).json({ message: 'Guest session expired.' });
    }

    user.lastActive = new Date();
    await user.save();
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}
