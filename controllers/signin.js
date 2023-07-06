//adding final update
export function handleSignIn(req, res, db, bcrypt) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("incorrect form sumbission");
  }

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((user) => {
      const isValid = bcrypt.compareSync(password, user[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((resUser) => {
            res.json(resUser[0]);
          })
          .catch((err) => {
            res.status(400).json("unable to get user");
          });
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => {
      res.status(400).json("wrong credentials");
    });
}
