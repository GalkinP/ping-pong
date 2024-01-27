const router = require("express").Router();
const bcrypt = require("bcrypt");
const {generateTokens} = require("../../utils/authUtils");
const cookiesConfig = require("../../config/cookiesConfig");
const { User } = require("../../db/models");


// РЕГИСТРАЦИЯ
router.post("/registration", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) {
      return res
        .status(400)
        .json({ message: "Указанная почта уже используется" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
  
    if (user) {
      const { accessToken, refreshToken } = generateTokens({user});

      res.locals.user = user;

      return res
        .cookie(cookiesConfig.refresh, refreshToken, {
          maxAge: cookiesConfig.maxAgeRefresh,
          httpOnly: true,
        })
        .cookie(cookiesConfig.access, accessToken, {
          maxAge: cookiesConfig.maxAgeAccess,
          httpOnly: true,
        })
        .status(200)
        .json({ message: "success", user});
    }
    return res
      .status(400)
      .json({ message: "Не удалось создать нового пользователя" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});



// АВТОРИЗАЦИЯ

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
    
        const { accessToken, refreshToken } = generateTokens({user: {id: user.id, email: user.email, name: user.name}});

        res.locals.user = user;

        return res
          .cookie(cookiesConfig.refresh, refreshToken, {
            maxAge: cookiesConfig.maxAgeRefresh,
            httpOnly: true,
          })
          .cookie(cookiesConfig.access, accessToken, {
            maxAge: cookiesConfig.maxAgeAccess,
            httpOnly: true,
          })
          .status(200)
          .json({ message: "success", user });
      }
      return res.status(400).json({ message: "Неправильно указан пароль" });
    }
    return res
      .status(400)
      .json({ message: "Пользователя с указанной почтой не существует" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});


router.post("/logout", async (req, res) => {
  try {
    const { access } = req.cookies;

    if (access) {
      res.locals.user = {};
      res
        .clearCookie("refresh")
        .clearCookie("access")
        .json({ message: "logout" });
    }
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get("/check", async (req, res) => {
  if (res.locals.user) {
  const  user  = res.locals.user;
    const userInDb = await User.findOne({ where: { id: user?.id } });
    if (user && userInDb) {
      res.status(200).json({
        user: userInDb,
      });
    } else {
      res.status(400).json({ user: false });
    }
  }
});

module.exports = router;
