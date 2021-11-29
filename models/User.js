const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type:Number,
    default:0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.static.login = async function (email, password, role, active)
{
  if(role == 1)
  {
    const user=User.find({role:1});
    return user;
  }
  else
  {
    const user = await this.findOne({email});
    if (user)
    {
      const auth = await bcrypy.compare(password, user.password);
      console.log("The valueof auth", auth,password)
      if (auth)
      {
        return user;
      }
      throw Error('incorrect password');
    }
  }

  throw Error('incorrect email');
}

const User = mongoose.model('User', UserSchema);


module.exports = User;