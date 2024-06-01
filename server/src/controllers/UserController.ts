import UserService from '@services/UserService';

export async function getUsers(req, res, next) {
  try {
    const users = await UserService.getUsers();

    res.status(200).json(users);
  } 
  catch (e) {
    res.status(500).send(e);
  }
};

export async function getUser(req, res, next) {
  try {
    const id = req.params.id;
    const user = await UserService.getUser(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } 
  catch (e) {
    res.status(500).send(e);
  }
};

export async function activate(req, res, next) {
  try {
    const activationLink = req.params.link;

    await UserService.activate(activationLink);

    return res.redirect(process.env.CLIENT_URL);
  } 
  catch (e) {
    res.status(500).send(e);
  }
};

export async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const userData = await UserService.refresh(refreshToken);

    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // if use https, add secure: true to cookie options

    return res.json(userData);
  } 
  catch (e) {
    res.status(500).send(e);
  }
};