const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmployeModel = require('./models/employee');
const multer = require("multer");
const path = require("path");
const ProductModel = require('./models/productmodel');
const stripe = require('stripe')('sk_test_51PE2C6SG7iZJBYVQopNteZRiSLrCakSVfeTxBwFnMIU8pkHoFaQXnG2hbeOaV0FA18XeDc1Zk1vqc6uSQWKPTOda00jb7R6Eud');
const nodemailer = require('nodemailer');
let loggedInUserEmail; 

// Define the JWT secret key directly in your code
const JWT_SECRET_KEY = "123456789";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect("mongodb://127.0.0.1:27017/shopy_ecom");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json("Access denied. No token provided.");
    
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json("Invalid token.");
        req.user = decoded;
        next();
    });
};
// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/"); // Destination directory for storing uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename for each uploaded image
    }
});


// Create multer instance
const upload = multer({ storage: storage });

// Login endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeModel.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json("No record existed");
            }
            // Compare hashed password using bcrypt
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error("Password comparison error:", err);
                    return res.status(500).json("Internal Server Error");
                }
                if (result) {
                    // Store user email
                    loggedInUserEmail = user.email;
                    // Generate JWT token with email and role
                    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET_KEY);
                    res.json({ token, role: user.role });
                } else {
                    res.status(401).json("The password is incorrect");
                }
            });
        })
        .catch(err => {
            console.error("Login error:", err);
            res.status(500).json("Internal Server Error");
        });
});


app.post("/register", upload.single("image"), (req, res) => {
    const { name, email, password,role } = req.body;
    const image = req.file ? req.file.path : null; // Save image path if uploaded

    // Hash password using bcrypt
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json("Internal Server Error");
        }
        // Check if the email already exists in the database
        EmployeModel.findOne({ email })
            .then(existingEmployee => {
                if (existingEmployee) {
                    // If email exists, return an error response
                    return res.status(400).json("Email already exists");
                } else {
                    // Create new employee entry with hashed password and image path
                    EmployeModel.create({ name, email, password: hash, image,role })
                        .then(newEmployee => {
                            console.log("New employee registered:", newEmployee);
                            // Generate JWT token for the new user
                            const token = jwt.sign({ email: newEmployee.email }, JWT_SECRET_KEY);
                            res.json({ token });
                        })
                        .catch(err => {
                            console.error("Registration error:", err);
                            res.status(500).json("Internal Server Error");
                        });
                }
            })
            .catch(err => {
                console.error("Error checking email existence:", err);
                res.status(500).json("Internal Server Error");
            });
    });
});

app.get("/profile", verifyToken, (req, res) => {
    const userEmail = req.user.email;
    EmployeModel.findOne({ email: userEmail })
        .then(user => {
            if (!user) {
                return res.status(404).json("User not found");
            }
            // Construct the URL of the uploaded image
            const imageUrl = user.image ? `${req.protocol}://${req.get("host")}/${user.image}` : null;
            res.json({ image: imageUrl });
        })
        .catch(err => {
            console.error("Error fetching profile image:", err);
            res.status(500).json("Internal Server Error");
        });
});

app.get("/users", (req, res) => {
    // Fetch only users with role "user"
    EmployeModel.find({ role: "user" })
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.error("Error fetching users:", err);
            res.status(500).json("Internal Server Error");
        });
});

//product endpoints

app.post("/products", upload.single("image"), (req, res) => {
    const { name, category, new_price, old_price } = req.body;
    const image = req.file ? req.file.path : null;

    ProductModel.create({ name, category, new_price, old_price, image })
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            console.error("Error creating product:", err);
            res.status(500).json("Internal Server Error");
        });
});
// Get all products
app.get("/products", (req, res) => {
    const { category } = req.query;
    let query = {}; // Initialize an empty query object

    // If a category is specified, add it to the query
    if (category) {
        query.category = category;
    }

    // Find products based on the query
    ProductModel.find(query)
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            console.error("Error fetching products:", err);
            res.status(500).json("Internal Server Error");
        });
});

// Delete a product
app.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    ProductModel.findByIdAndDelete(id)
        .then(() => {
            res.json({ message: "Product deleted successfully" });
        })
        .catch(err => {
            console.error("Error deleting product:", err);
            res.status(500).json("Internal Server Error");
        });
});
// Update a product
app.put("/products/:id", verifyToken, upload.single("image"), (req, res) => {
    const { id } = req.params;
    const { name, category, newPrice, oldPrice } = req.body;
    const image = req.file ? req.file.path : null;

    ProductModel.findByIdAndUpdate(id, { name, category, newPrice, oldPrice, image }, { new: true })
        .then(updatedProduct => {
            res.json(updatedProduct);
        })
        .catch(err => {
            console.error("Error updating product:", err);
            res.status(500).json("Internal Server Error");
        });
});

// Get product image endpoint
app.get("/product/image/:productId", (req, res) => {
    const { productId } = req.params;
    ProductModel.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json("Product not found");
            }
            // Construct the URL of the uploaded image
            const imageUrl = product.image ? `${req.protocol}://${req.get("host")}/${product.image}` : null;
            res.json({ image: imageUrl });
        })
        .catch(err => {
            console.error("Error fetching product image:", err);
            res.status(500).json("Internal Server Error");
        });
});

app.get("/product/:productId", (req, res) => {
    const { productId } = req.params;
    ProductModel.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json("Product not found");
            }
            res.json(product); // Return complete product details including image URL
        })
        .catch(err => {
            console.error("Error fetching product details:", err);
            res.status(500).json("Internal Server Error");
        });
});


app.post('/create-payment-intent', async (req, res) => {
    try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // amount should be in cents
        currency: 'inr', // change to your currency
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: 'Failed to create payment intent' });
    }
  });
  

 // Example route where order is confirmed
// Example route where order is confirmed
app.post('/confirm-order', (req, res) => {
    // Logic to confirm the order

    // Get the user's email from the stored variable
    const userEmail = loggedInUserEmail;

    // Fetch admin's email and password from the database
    fetchAdminCredentialsFromDatabase()
        .then(adminCredentials => {
            const { email: adminEmail, password: adminPassword } = adminCredentials;
            
            // Send email notification to the user's email using admin's credentials
            const subject = 'Order Confirmation';
            const text = 'Your order has been confirmed. Thank you for shopping with us!';
            sendEmail(adminEmail, adminPassword, userEmail, subject, text);
            
            // Respond with success message
            res.json({ message: 'Order confirmed successfully' });
        })
        .catch(err => {
            console.error('Error fetching admin credentials:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// Function to fetch admin's email and password from the database
function fetchAdminCredentialsFromDatabase() {
    return new Promise((resolve, reject) => {
        // Replace this with your database query to fetch admin's email and password based on role
        EmployeModel.findOne({ role: 'admin' })
            .then(admin => {
                if (admin) {
                    const adminCredentials = {
                        email: admin.email, // Admin's email address
                        password: admin.password // Admin's password
                    };
                    resolve(adminCredentials);
                } else {
                    reject(new Error('Admin not found'));
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}

// Function to send email
function sendEmail(adminEmail, adminPassword, recipientEmail, subject, text) {
    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: adminEmail, // Admin's Gmail email address
            pass: adminPassword // Admin's Gmail password
        }
    });

    // Email message options
    const mailOptions = {
        from: adminEmail, // Admin's Gmail email address
        to: recipientEmail,
        subject: subject,
        text: text
    };

    // Send email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});