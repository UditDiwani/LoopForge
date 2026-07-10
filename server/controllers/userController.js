export async function deleteMe(req, res, next) {
  try {
    await req.user.deleteOne();
    return res.json({ message: 'Account deleted.' });
  } catch (error) {
    next(error);
  }
}
