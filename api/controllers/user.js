import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios(`nome`, `email`, `fone`, `data_nascimento`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
  ];

  db.query(q, [values], (err, data) => {
    if (err)
      return res.status(400).json({
        status: 0,
        message: err.sqlMessage,
      });

    return res.status(200).json({
      status: 1,
      id: data.insertId,
      message: "Usuário criado com sucesso.",
    });
  });
};

export const updateUser = async (req, res) => {
  const id = req.params.id;

  const query = "SELECT * FROM usuarios WHERE `id` = ?";

  db.query(query, [id], (err, data) => {
    if (!data.length)
      return res.status(404).json({
        status: 0,
        id,
        message: `cannot find user with id ${id}`,
      });

    const user = data[0];
    const { nome, email, fone, data_nascimento } = req.body;

    const updateQuery =
      "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?";

    const values = [
      nome ? nome : user.nome,
      email ? email : user.email,
      fone ? fone : user.fone,
      data_nascimento ? data_nascimento : user.data_nascimento,
    ];

    return db.query(updateQuery, [...values, id], (err) => {
      if (err)
        return res.status(400).json({
          status: 0,
          message: err.sqlMessage,
        });

      return res.status(200).json({
        status: 1,
        id,
        message: "user updated successfully",
      });
    });
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
