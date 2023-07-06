export function handleProfile(req, res, db) {
  const id = Number(req.params.id);
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(404).json("no such user");
      }
    })
    .catch((err) => {
      res.status(400).json("err getting user");
    });
}
