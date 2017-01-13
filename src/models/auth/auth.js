import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

/**
 * User Schema
 */
const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
    /*timestamps: {
      createdAt: 'created_at'
    }*/
}, { collection: 'user' }); // Forcing mongoose to use "user" as collection name (http://stackoverflow.com/questions/7486528/mongoose-force-collection-name)

/**
 * Password hash middleware for hash password if password is modified or new
 */
UserSchema.pre('save', function save(next) {
  const user = this;
  // only hash the password if it has been modified
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (errSalt, salt) => {
    if (errSalt) { return next(errSalt); }
    // hash the password
    bcrypt.hash(user.password, salt, (errHash, hash) => {
      if (errHash) { return next(errHash); }
      // override the plain text password with the hashed one
      user.password = hash;
      next(errHash, hash);
    });
  });
});

/**
 * Helper method to compare password for login
 */
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// We need to create a model using it
let User = mongoose.model('User', UserSchema);

// Make this available to our users in our Node applications
export default User;
