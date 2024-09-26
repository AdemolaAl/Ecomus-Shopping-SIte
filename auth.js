'use strict';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import { Sequelize, DataTypes } from 'sequelize';

export default function (userDB) {
  passport.serializeUser((user, done) => {
    done(null, { id: user.id, role: 'user' }); // Simplified to just store user ID
  });
  
  passport.deserializeUser((obj, done) => {
    userDB.findByPk(obj.id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });
  
  passport.use("user", new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await userDB.findOne({ where: { [Sequelize.Op.or]: [{ email }, { username: email }] }, attributes: { exclude: ['image'] } });
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      if (!user.isVerified) {
        return done(null, false, { message: 'Email not verified' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
        
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (err) {
      console.log(err)
      return done(err);
      
    }
  }));
};
