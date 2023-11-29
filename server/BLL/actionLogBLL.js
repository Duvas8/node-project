const Action = require('../models/actionModel')

const getAllActions = async() => {
    const act = await Action.find();
    return act;
}

const addAction = async(obj) => {

    const act = new Action(obj);
    console.log(act)
    await act.save();
    return 'Created!';
}

module.exports = {
    addAction,
    getAllActions,
  };