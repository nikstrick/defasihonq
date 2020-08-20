const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Product = require('../../models/Product');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const multer = require('multer');

const DIR = './client/public/uploads';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, Date.now() + '-' + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/bmp'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

//@route  POST api/product
//@desc   Post the products
//@access Private

router.post(
  '/',
  [
    auth,
    upload.single('image'),
    // [
    //   check('name', 'Text is required').not().isEmpty(),
    //   check('id', 'ID is required').not().isEmpty(),
    //   check('type', 'Type is required').not().isEmpty(),
    //   check('brand', 'Brand is required').not().isEmpty(),
    //   check('quantity', 'Quantity is required').not().isEmpty(),
    //   check('mrp', 'MRP is required').not().isEmpty(),
    //   check('price', 'Price is required').not().isEmpty(),
    //   check('description', 'Description is required').not().isEmpty(),
    // ],
  ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    try {
      console.log(req.file.filename);
      const newProduct = new Product({
        category: req.body.category,
        image: '/' + 'uploads' + '/' + req.file.filename,
        productName: req.body.productName,
        productId: req.body.productId,
        productBrand: req.body.productBrand,
        productType: req.body.productType,
        quantity: req.body.quantity,
        mrp: req.body.mrp,
        price: req.body.price,
        description: req.body.description,
      });
      console.log(newProduct);
      const product = await newProduct.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  GET api/product
//@desc   Get the products
//@access Private

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET api/posts/:id
//@desc   Get the post by id
//@access Private

router.get('/:id', async (req, res) => {
  //   console.log(typeof req.params.id);
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'product not found' });
    }

    res.status(500).send('Server Error');
  }
});

//@route  DELETE api/products/:id
//@desc   Delete the product by id
//@access Private

//@route  DELETE api/products/:id
//@desc   Delete the product by id
//@access Private

router.delete('/', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.body.body);
    // if (product.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'No authorization!!' });
    // }
    await product.remove();
    res.json(req.body.body);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'product not found' });
    }

    res.status(500).send('Server Error');
  }
});

// //@route  POST api/products/reviews/:name
// //@desc   Add review to post by post id
// //@access Private

router.post(
  '/review/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const product = await Product.findById(req.params.id);
      // const user = await User.findById(req.user.id).select('-password');
      const user = await User.findById(req.user.id);
      if (user.admin) {
        res.status(401).send('Access Denied');
      } else {
        const newReview = new Review({
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id,
        });
        product.comments.unshift(newReview);
        await newReview.save();
        res.json(product);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// //@route  Delete api/posts/commment/:id/:comment_id
// //@desc   Delete comment to post by post id and comment id
// //@access Private
router.delete('/reviews/:id/:review_id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    //Pull out comment

    const review = product.reviews.find(
      (review) => review.id === req.params.review_id
    );

    //make sure comment exists
    if (!review) {
      return res.status(404).json({ msg: 'review not found' });
    }
    const user = await User.findById(req.user.id);
    if (user.admin) {
      return res.status(401).send('Access Denied');
    }
    //Check User
    if (review.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'User not authorised' });
    }
    //Remove index
    const removeIndex = product.reviews
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    product.reviews.splice(removeIndex, 1);
    await product.save();
    res.json(product.reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
