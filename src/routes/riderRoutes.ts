import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// create rider
router.post("/", async (req, res) => {
  const { email, name, username, password } = req.body;
  console.log(email, name, username, password);

  try {
    const result = await prisma.rider.create({
      data: {
        email,
        name,
        username,
        password,
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: "Email should be unique!" });
  }
});

// list users
router.get("/", async (req, res) => {
  const allUser = await prisma.rider.findMany();
  res.json(allUser);
});

//list one user
// router.get('/:id', async (req, res) => {
//     const {id} = req.params;
//     try {
//         const result = await prisma.user.findFirst({
//             where: { id: Number(id) }
//         });
//         res.json(result);
//     } catch (e) {
//         res.status(400).json({error: "Use correct id"})
//     }
//     // res.status(501).json({error: `Not Implemented : ${id}` });
// });

// //update user
// router.put('/:id', (req, res) => {
//     const {id} = req.params;
//     res.status(501).json({error: `Not Implemented : ${id}` });
// });

// //update user
// router.delete('/:id', (req, res) => {
//     const {id} = req.params;
//     res.status(501).json({error: `Not Implemented : ${id}` });
// });

export default router;
