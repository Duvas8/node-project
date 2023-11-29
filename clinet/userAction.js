const urlAct = 'http://localhost:8000/actions';

const userAction = async (status) => {
    try {
      const actions = await getAllAction();
      console.log('Actions:', actions); // Log the actions for debugging
      const userData = JSON.parse(sessionStorage.getItem('userData'))
      const userId = userData.id
      // Find the last action for the user
      const lastAction = actions.findLast( (action) => action.id === userId);
      console.log('Last Action:', lastAction);
  
      // Check if the last action was active today
      const today = new Date();
      const lastActionDate = new Date(lastAction.date);
      if (
        !lastAction.id ||
        !lastAction.email ||
        !lastAction.name ||
        !lastAction.maxActions ||
        !lastAction.date ||
        !(
          lastActionDate.getFullYear() === today.getFullYear() &&
          lastActionDate.getMonth() === today.getMonth() &&
          lastActionDate.getDate() === today.getDate()
        )
      ) {
        throw new Error('Invalid user data or no recent actions.');
      }
  
      const obj = {
        id: lastAction.id,
        email: lastAction.email,
        name: lastAction.name,
        maxActions: lastAction.maxActions,
        date: lastAction.date,
        status: status,
      };
  
      // Decrease the actionAllowed count
      let actionAllowed = lastAction.actionAllowed
      console.log(actionAllowed)
      obj.actionAllowed = --actionAllowed;
  
      // Check if the user has any actions left
      if (obj.actionAllowed < 0) {
        throw new Error('You have reached your daily action limit.');
      }
  
      const resp = await fetch(urlAct, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      });
  
      if (!resp.ok) {
        throw new Error('Failed to save action data.');
      }
  
      const data = await resp.json();
      console.log(data);
    } catch (error) {
      // Handle and log the error
      console.error('Error in userAction:', error);
      throw error; // Re-throw the error to handle it at the caller level
    }
  };