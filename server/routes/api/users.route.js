const router = require("express").Router();
import fileUpload from 'express-fileupload';
const path = require('path');

const { User, Player } = require("../../db/models");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json({ message: "success", users });
});

router.patch("/:id/award", async (req, res) => {
  const { id } = req.params;
  const changed = await User.increment('wins', { where: { id } });
  if (changed) {
    res.json({ message: "success" });
  }
})

router.use(fileUpload());

router.post('/:id/change', async (req, res) => {
  const { id } = req.params;
  const avatar = req.files;
console.log(avatar);
  if (!avatar) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const uploadPath = path.join(__dirname, 'uploads', avatar.name);

  // Сохранение файла на сервере
  avatar.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    // Отправка ответа
    res.json({ message: 'File uploaded successfully.' });
  });
});

module.exports = router;
