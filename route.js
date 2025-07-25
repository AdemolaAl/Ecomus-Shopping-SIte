import shortId from 'shortid';
import bcrypt from 'bcryptjs';
import got from 'got';
import passport from 'passport';
import nodemailer from 'nodemailer';
import Flutterwave from 'flutterwave-node-v3';
import Op from 'sequelize';

export default function route(app, server, userDB, productDB, reviewDB, PaymentLog, successfulPays, Cart, CartItem) {


    const flw = new Flutterwave(`FLWPUBK_TEST-87850c180cd33e348f7c3521fdf0506e-X`, `FLWSECK_TEST-b464fb22fcf93d983fd7e9c9b4ce2b6c-X`);


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ademolaalameen86@gmail.com",
            pass: "haepypppxbhjdchv",
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        },
    });

    server.post('/usersignup', async (req, res, next) => {
        const hash = bcrypt.hashSync(req.body.password, 12);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        try {
            // Create a new user using Sequelize
            const newUser = await userDB.create({
                username: req.body.username,
                shortId: shortId.generate(),
                email: req.body.email,
                phonenumber: req.body.number,
                password: hash,
                verificationCode
            });

            // Send verification email
            const mailOptions = {
                from: 'your-email@gmail.com',
                to: req.body.email,
                subject: 'Email Verification',
                html: `
            <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Email Verification</title>
              <style>
                  body {
                      font-family: 'Proxima Nova', sans-serif;
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      width: 90%;
                      max-width: 600px;
                      background-color:#F5F7F9;
                      margin: 0 auto;
                      padding: 20px 50px;
                  }
                  .logo {
                      text-align: center;
                  }
                  .logo img {
                      max-width: 150px;
                  }
                  .content {
                      margin: 30px 0;
                      padding:30px;
                      background-color:white;
                  }
                  a{color:white; text-decoration:none;}
                  .button {
                      display: block;
                      width: 150px;
                      margin: 20px auto;
                      padding: 10px 0;
                      text-align: center;
                      font-size: 15px;
                      background-color: #0D4FF7;
                      border-radius: 25px;
                      color:white;
                      border:none;
                  }
                  .footer {
                      text-align: center;
                      color: #999999;
                      font-size: 12px;
                  }
                  .footer a {
                      color: #007bff;
                      text-decoration: none;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="logo">
                      <img src="http://localhost:3000/pictures/Logo%20Colour@4x%201.png" alt="Bluwigo Logo">
                  </div>
                  <div class="content">
                      <p>Hi there,</p>
                      <p>Thank you for creating an account with Halemd Vendor’s Portal. To ensure the security of your account, please verify your email address by clicking the link below:</p>
                      <div class='button'>${verificationCode}</div>
                      <p>If you did not request this verification, please ignore this email. Your account will not be activated until you verify your email address.</p>
                      <p>Thank you,</p>
                  </div>
                  <div class="footer">
                      <p>This email was sent to <a href="mailto:support@nass.com">support@nass.com</a>. If you'd rather not receive this kind of email, you can <a href="#">unsubscribe</a> or manage your <a href="#">email preferences</a>.</p>
                  </div>
              </div>
          </body>
          </html>
    
            `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);

                    return res.redirect('/usersignup');
                }
                console.log('Verification email sent:', info.response);
                res.status(200).json({ message: 'successfull', data: req.body })
            });
        } catch (err) {
            console.log('Error inserting user:', err);

            res.redirect('/');
        }
    });


    server.post('/verify', async (req, res) => {
        const { code } = req.body;
        try {
            const user = await userDB.findOne({ where: { verificationCode: code } });
            if (user) {
                user.isVerified = true;
                user.verificationCode = null;
                await user.save();
                res.status(200).json({ message: 'successfull', data: req.body })
            } else {
                res.redirect('/verify');
            }
        } catch (err) {
            console.log('Error verifying user:', err);
            res.redirect('/');
        }
    });


    server.post('/usersignin', (req, res, next) => {
        passport.authenticate('user', (err, user, info) => {
            if (err) {
                return next(err); // Pass any errors to the next middleware
            }
            if (!user) {
                // Authentication failed, send the failure message
                return res.status(400).json({ message: info ? info.message : 'Authentication failed' });
            }
            req.logIn(user, (err) => { // This establishes a session for the authenticated user
                if (err) {
                    return next(err);
                }
                return res.status(200).json({ message: 'successful' });
            });
        })(req, res, next);
    });


    server.get('/userinfo', isAuthenticated(), (req, res) => {
        const actualPage = '/user';
        app.render(req, res, actualPage);
    });

    server.get('/api/user', isAuthenticated(), (req, res) => {
        try {
            res.status(200).json({ message: 'successfull', data: req.user })

        } catch (err) {
            res.status(400)

        }
    })

    server.post('/create', async (req, res) => {
        let shortIdM = shortId.generate();

        const saleEndTime = new Date(Date.now() + req.body.timer * 60 * 60 * 1000);
        console.log(saleEndTime)
        try {
            await productDB.create({
                productName: req.body.productname,
                originalPrice: Number(req.body.originalPrice),
                DiscountPrice: Number(req.body.DiscountPrice),
                quantity: Number(req.body.quantity),
                description: req.body.des,
                timer: saleEndTime,
                category: 'Shoe',
                image: req.body.file1,
                image2: req.body.file2,
                image3: req.body.file3,
                image4: req.body.file4,
                shortId: shortIdM,
            })

            res.status(200).json({ shortIdM });


        } catch (err) {
            console.log('Error inserting user:', err);

            res.redirect('/');

        }
    })

    server.get('/product/:id', async (req, res) => {

        try {
            const product = await productDB.findOne({ // Adjust based on needed attributes
                where: { shortId: req.params.id },
            });
            res.status(200).json(product)
            console.log(product.timer)
        } catch (err) {
            res.status(400)

        }

    })


    server.post('/writeReview', isAuthenticated('user'), async (req, res) => {
        try {
            await reviewDB.create({
                username: req.user.username,
                shortId: shortId.generate(),
                productId: req.body.productId,
                stars: req.body.stars,
                title: req.body.title,
                review: req.body.review
            })
            res.status(200).json({ message: 'success' });
        } catch (err) {
            console.log('Error inserting user:', err);

            res.redirect('/');

        }
    })


    server.get('/getReview/:id', async (req, res) => {
        let id = req.params.id
        try {
            const review = await reviewDB.findAll({
                where: {
                    productId: id
                },
            })
            res.status(200).json(review)
        } catch (error) {

        }
    })



    server.get('/payment2/:id', isAuthenticated('user'), async (req, res) => {

        try {
            // Retrieve product details from the database
            const product = await productDB.findOne({
                attributes: { exclude: ['image'] },
                where: { shortId: req.params.id }
            });


            // Check if the product exists
            if (!product) {
                return res.status(404).json({ error: "product not found" });
            }

            // Define the transaction reference
            const tx_ref = shortId.generate();
            const amount = product.DiscountPrice;// Adjusted amount parsing
            const redirect_url = "http://localhost:3000/payment-callback";
            const meta = {
                product_id: product.id,
                consumer_id: 23,
                consumer_mac: "92a3-912ba-1192a"
            };
            const customer = {
                email: req.user.email,
                phonenumber: req.user.phonenumber,
                name: req.user.name
            };

            // Make a payment request to Flutterwave API
            const response = await got.post("https://api.flutterwave.com/v3/payments", {
                headers: {
                    Authorization: `Bearer FLWSECK_TEST-b464fb22fcf93d983fd7e9c9b4ce2b6c-X`
                },
                json: {
                    tx_ref,
                    amount,
                    currency: "NGN",
                    redirect_url,
                    meta,
                    customer,
                    customizations: {
                        title: "product Payment",
                        logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
                    }
                }
            }).json();

            // Log the payment request to the database
            await PaymentLog.create({
                tx_ref,
                userId: req.user.shortId,
                amount,
                currency: "NGN",
                productId: req.params.id,
                redirect_url,
                meta,
                customer,
                status: response.status, // or whatever status field Flutterwave API returns
            });

            // Redirect to Flutterwave payment page
            res.redirect(response.data.link);
            console.log(response);
        } catch (err) {
            console.error(err); // Log error for debugging
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    server.get('/payment-callback', async (req, res) => {
        if (req.query.status == 'completed' || 'successful') {
            try {
                const transactionDetails = await PaymentLog.findOne({ where: { tx_ref: req.query.tx_ref } });
                const response = await flw.Transaction.verify({ id: req.query.transaction_id });

                if (
                    response.data.status === "successful" &&
                    response.data.amount === transactionDetails.amount &&
                    response.data.currency === "NGN"
                ) {
                    // Success! Confirm the customer's payment
                    console.log('Payment successful');

                    const user = await userDB.findOne({ where: { shortId: transactionDetails.userId }, attributes: { exclude: ['image'] } });
                    const product = await productDB.findOne({ where: { shortId: transactionDetails.productId }, attributes: { exclude: ['image'] } });

                    if (user) {

                        await successfulPays.create({
                            userId: user.id,
                            productId: product.id,
                        });

                    } else {
                        console.log('User not found');
                    }
                    res.redirect('http://localhost:3000/');
                } else {
                    // Inform the customer their payment was unsuccessful
                    console.log('Payment verification failed');
                    res.status(400).send('Payment verification failed');
                }
            } catch (error) {
                console.error('Error processing payment callback:', error);
                res.status(500).send('Internal server error');
            }
        } else {
            res.status(400).send('Payment status not completed');
        }
    });


    async function getOrCreateCart(userId) {
        let cart = await Cart.findOne({ where: { userId }, include: CartItem });
        if (!cart) {
            cart = await Cart.create({ userId });
        }
        return cart;
    }
    async function addItemToCart(userId, productId, quantity = 1) {
        const cart = await getOrCreateCart(userId);
        const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
        if (cartItem) {
            cartItem.quantity += Number(quantity);
            await cartItem.save();
        } else {
            await CartItem.create({ cartId: cart.id, productId, quantity });
        }
    }

    server.post('/addToCart', isAuthenticated('user'), async (req, res) => {
        const { productId, quantity } = req.body;

        // Check if the user is authenticated and `req.user` exists
        if (!req.user) {
            return res.status(401).json({ message: 'Sign in required' });
        }

        // Add item to cart logic here
        try {
            await addItemToCart(req.user.id, productId, quantity);
            res.status(200).json({ message: 'Item added to cart' });
        } catch (error) {
            res.status(500).json({ message: 'Error adding item to cart', error });
        }
    });

    server.get('/cart', isAuthenticated('user'), async (req, res) => {
        try {
            const cart = await getOrCreateCart(req.user.id);
    
            const items = await CartItem.findAll({
                where: {
                    cartId: cart.id
                }
            });
    
            const ids = items.map(obj => obj.productId);  // Extract product IDs
            const products = [];

            for (const id of ids) {
                try {
                    const product = await productDB.findByPk(id); // Fetch each product by ID
                    if (product) {
                        products.push(product); // Add to the results if found
                    }
                } catch (error) {
                    console.error(`Error fetching product with ID ${id}:`, error);
                    // You can handle each error as needed (e.g., continue, throw, etc.)
                }
            }
    
    
            res.status(200).json(products); // Respond with the fetched products
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });


    async function updateCartItemQuantity(cartItemId, quantity) {
        const cartItem = await CartItem.findByPk(cartItemId);
        if (cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
        }
    }


    async function removeItemFromCart(cartItemId) {
        await CartItem.destroy({ where: { id: cartItemId } });
    }







    function isAuthenticated() {
        return (req, res, next) => {
          if (req.isAuthenticated()) {
            return next();
          }
          console.log('Not authenticated'); // This will be logged when the user is not authenticated
          return res.status(401).json({ message: 'Sign in required' });
        };
      }
      

}