const router = require("express").Router();

const { Player, User } = require("../../db/models");

// СПИСОК ИГРОКОВ В ТУРНИРЕ
router.get("/", async (req, res) => {
  const players = await Player.findAll({ include: [{ model: User }] });
  res.json({ message: "success", players });
});


// ДОБАВЛЕНИЕ ИГРОКА В ТУРНИР

router.post("/", async (req, res) => {
  const { userId, tournamentId } = req.body;
  const playerCheck = await Player.findOne({ where: { userId, tournamentId } });
  if (playerCheck) {
    return res.json({ message: "player already exist" });
  } else {
    const playerBd = await Player.create({ userId, tournamentId });
    const player = await Player.findOne({
      where: { id: playerBd.id },
      include: [{ model: User }],
    });
    res.json({ message: "success", player });
  }
});

// УДАЛЕНИЕ ИГРОКА АДМИНОМ

router.delete("/:tournId/:userId", async (req, res) => {
  const { tournId, userId } = req.params;

  const player = await Player.findOne({
    where: { userId: Number(userId), tournamentId: Number(tournId) },
  });
  
  const deleted = await Player.destroy({ where: { id: player.id } });
  if (deleted > 0) {
    res.json({ message: "success", id: player.id });
  }
});


// НАЗНАЧЕНИЕ СЛУЧАЙНЫМ ОБРАЗОМ КОМАНДЫ

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const teamId = req.body.teamId;
  const changed = await Player.update(req.body, { where: { id } });
  if ([changed] > 0) {
    res.json({ message: "success", teamId });
  }
});

//  ИЗМЕНЕНИЕ СТАТУСА ИГРОКА ПОСЛЕ ИГРЫ

router.patch("/:id/isWin", async (req, res) => {
  const { id } = req.params;
  const changed = await Player.update(req.body, { where: { id } });
  if ([changed] > 0) {
    res.json({ message: "success" });
  }
});


// УДАЛЕНИЕ ИГРОКА ПОСЛЕ ПОРАЖЕНИЯ

router.delete("/:playerId", async (req, res) => {
  const { playerId } = req.params;
  const player = await Player.findOne({ where: { id: +playerId } });
  const changed = await User.increment(
     'losses' ,
    { where: { id: player.userId } }
  );
  const deleted = await Player.destroy({ where: { id: playerId } });
  const user = await User.findOne({ where: { id: player.userId } });
  
  if (deleted > 0 && changed) {
    res.json({ message: "success", id: player.id });
  }
});

// ИЗМЕНЕНИЕ АДМИНОМ ИГРОКА(КОМАНДЫ) НА ДРУГОГО

router.patch("/:id/change", async (req, res) => {
  const { id } = req.params;
  const { teamId, playerName } = req.body;
 const player = await Player.findOne({ where: { id } , include: [{ model: User }] });
 if(teamId === player.teamId){
   const user = await User.findOne({ where: { name: playerName } });
   const changed = await Player.update({ userId: user.id }, { where: { id } });
   if ([changed] > 0) {
const playerN = await Player.findOne({ where: { id } , include: [{ model: User }] });
     res.json({ message: "success", playerN });
   }
 }else{
   const changed = await Player.update({ teamId }, { where: { id } });
   if ([changed] > 0) {
const playerN = await Player.findOne({ where: { id } , include: [{ model: User }] });
     res.json({ message: "success", playerN });
   }
 }
})

module.exports = router;
