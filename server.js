

// server.js
import express from 'express'
import next from 'next';
import bodyParser from 'body-parser'
import sequelize from './connection.js';
import { DataTypes } from 'sequelize';
import auth from './auth.js';
import passport from 'passport';
import session from 'express-session';
import route from './route.js';
import dotenv from 'dotenv'

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

dotenv.config({path: "secrets.env"})




app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json({ limit: '30mb' }));
  server.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(session({
    secret: 'anything',
    resave: false,
    saveUninitialized: true,
  }));

  server.use(passport.initialize());
  server.use(passport.session());

  server.use((req, res, next) => {
    res.setHeader('Connection', 'keep-alive');
    next();
  });


  const userDB = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.BLOB('long'), // Use 'medium' or 'long' based on your need
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    shortId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    verificationCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  const productDB = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    shortId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    originalPrice: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DiscountPrice: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timer: {
      type: DataTypes.DATE,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },

    category: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }

  });

  const productImage = sequelize.define('productimage', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    productId: DataTypes.INTEGER,

    image: {
      type: DataTypes.STRING,
    },

  })


  productDB.hasMany(productImage, { foreignKey: 'productId' , as: 'images' });

  productImage.belongsTo(productDB, { foreignKey: 'productId', as: 'product' });
  
  



  const Cart = sequelize.define('Cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: userDB, key: 'id' } },
  });

  const CartItem = sequelize.define('CartItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cartId: { type: DataTypes.INTEGER, references: { model: Cart, key: 'id' } },
    productId: { type: DataTypes.INTEGER, references: { model: productDB, key: 'id' } },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  });

  userDB.hasOne(Cart, { foreignKey: 'id' });
  Cart.belongsTo(userDB, { foreignKey: 'id' });

  Cart.hasMany(CartItem, { foreignKey: 'cartId' });
  CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

  productDB.hasMany(CartItem, { foreignKey: 'id' });
  CartItem.belongsTo(productDB, { foreignKey: 'id' });




  const successfulPays = sequelize.define('successfulPay', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: true,
  });

  const PaymentLog = sequelize.define('PaymentLog', {
    tx_ref: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    redirect_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meta: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    customer: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: true,
  });

  const reviewDB = sequelize.define('review', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: productDB,
        key: 'id'
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
  })


  productDB.hasMany(reviewDB, { foreignKey: 'productId', as: 'reviews' });
  reviewDB.belongsTo(productDB, { foreignKey: 'productId', as: 'product' });

 
 /* sequelize.sync({ force: false, alter:true}).then(() => {
    console.log('Database & tables created!');
  }).catch((error) => {
    console.error('Error creating database and tables:', error);
  });
  */
  

  server.use('/public', express.static(process.cwd() + '/public'));

  auth(userDB)
  route(app, server, dotenv, userDB, productDB, reviewDB, PaymentLog, successfulPays, Cart ,CartItem, productImage)




  // Default Next.js handler (handles everything else, including pages and API routes)
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
