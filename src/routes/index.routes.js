import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/users/register", (req, res) => {
  res.render("usersRegister");
});

export default router;
