import { userModel, countModel } from "../model/user.model.js";
export const getUsers = async (req, res) => {
  try {
    const userList = await userModel.find({});
    res.status(200).send(userList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    let seqId;
    let cd = await countModel.findOneAndUpdate(
      { id: "autovalue" },
      { "$inc": { "seq": 1 } },
      { new: true }
    );
    if (cd===null) {
      countModel.create({
        id: "autovalue",
        seq: 1,
      });
      seqId=1;
      const { name, roll } = req.body;
      var user = await userModel.create({ id:seqId, name, roll });
    }else{
      const { name, roll } = req.body;
      var user = await userModel.create({ id:cd.seq, name, roll });
    }
    res.status(201).send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const foundUser = await userModel.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    await userModel.findOneAndDelete({ id: req.params.id });
    res.status(204).json("successfully deleted");
  } catch (e) {
    res.status(400).json({ e: e.message });
  }
};
