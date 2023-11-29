const jf = require('jsonfile');

const file = '../JsonData/actionLog.json';

const getActions = () => jf.readFile(file)

const logAction = async (obj) => {
  const data = await getActions();
  data.actions.push(obj);
  await jf.writeFile(file, data);
  return 'Added Successfully';
};

module.exports = {getActions,  logAction };