const User = require('../models/userModels')


const addUser = async(req,res)=>{
    try {
      const { name, value1, value2, operator } = req.body;
  
      if (operator === '+' || operator === '-' || operator === '*' || operator === '/') {
        let result;
  
        switch (operator) {
          case '+':
            result = value1 + value2;
            break;
          case '-':
            result = value1 - value2;
            break;
          case '*':
            result = value1 * value2;
            break;
          case '/':
            if (value2 === 0) {
              return res.status(400).json({ error: 'Division by zero is not allowed.' });
            }
            result = value1 / value2;
            break;
          default:
            break;
        }
        var operators = parseInt(operator)
  
        const newUser = new User({
          name,
          value1,
          value2,
          operator:operators,
          result,
        });
  
        await newUser.save();
  
        res.status(201).json(newUser);
      } else {
        res.status(400).json({ error: 'Invalid operator. Please use +, -, *, or /.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const getUser = async(req,res)=>{
    try {
        const userId = req.params.userId;

    const user = await User.findById(userId); 

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const updateUser = async(req,res)=>{
    try {
      const userId = req.params.userId;
      const { name, value1, value2, operator } = req.body;
  
      const user = await User.findById(userId); 
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.name = name;
      user.value1 = value1;
      user.value2 = value2;
      user.operator = operator;

        switch (operator) {
        case '+':
          user.result = value1 + value2;
          break;
        case '-':
          user.result = value1 - value2;
          break;
        case '*':
          user.result = value1 * value2;
          break;
        case '/':
          if (value2 === 0) {
            return res.status(400).json({ error: 'Division by zero is not allowed.' });
          }
          user.result = value1 / value2;
          break;
        default:
          break;
      }
  
      await user.save();
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const deleteUser = async(req,res)=>{
    try {
        
            const userId = req.params.userId;
        
            const user = await User.findById(userId); 
        
            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }
        
            await User.deleteOne({ _id: userId }); 
        
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
        }


  module.exports = {addUser,getUser,updateUser,deleteUser}