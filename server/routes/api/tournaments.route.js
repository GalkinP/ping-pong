const router = require("express").Router();

const { Tournament, Player } = require("../../db/models");

router.get("/", async (req, res) => {
  const tournaments = await Tournament.findAll({
    include: [{ model: Player }],
  });
  res.json({ message: "success", tournaments });
});

router.get("/:tournamentId", async (req, res) => {
  const{ tournamentId} = req.params
  const tournament = await Tournament.findOne({
    where: { id: tournamentId },include: [{ model: Player }],
  });
  res.json({ message: "success", tournament });
});





router.post("/", async (req, res) => {
  try {
    const { title, description, date, players, gameType } = req.body;

    if (!title || title.trim() === "")
      return res.json({ message: "title is required" });
    if (!description || description.trim() === "")
      return res.json({ message: "description is required" });
    if (!date || date.trim() === "")
      return res.json({ message: "date is required" });
    if (!players || players<2)
      return res.json({ message: "players is required" });
    if (!gameType || gameType.trim() === "")
      return res.json({ message: "gameType is required" });
    else {
      const tourn = await Tournament.create({
        title,
        description,
        date,
        players,
        gameType,
      });
      const tournament=await Tournament.findOne({where:{id:tourn.id},include: [{ model: Player }],})
      res.json({ message: "success", tournament });
    }
  } catch (error) {
    console.log(error);
  }
});



router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const tournament = await Tournament.destroy({ where: { id } });
  if (tournament>0) {
    res.json({ message: "success" });
  } else {
    res.json({ message: "tournament not found" });
  }
})

module.exports = router;
