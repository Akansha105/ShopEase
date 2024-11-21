import express from 'express'
import db from '../db/conn.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
import products from '../constant/productsdata.js'

env.config()
const router = new express.Router() //will be used to call all the apis
const saltRounds = 10
const secretKey = process.env.KEY

db.connect()
  .then(() => console.log('database connected'))
  .catch((error) => console.log('error', error.message))

// to verify the cookie value and the value of secret key.we will get an id after verifying

// to define middleware function
const authenticate = async (req, res, next) => {
  try {
    const getcookie = req.cookies.ShopEase
    const verifycookie = jwt.verify(getcookie, secretKey)
    console.log(verifycookie.id)

    const rootuser = await db.query(
      'SELECT * FROM users WHERE id = $1 AND token = $2',
      [verifycookie.id, getcookie]
    )
    const rootUser = rootuser.rows[0]
    console.log(rootUser)

    if (!rootuser) {
      throw new Error('user not found')
    }

    // if anybody calls for the values listed below from the router.js ...
    req.token = getcookie
    req.rootuser = rootUser
    req.userid = rootUser.id

    next()
  } catch (err) {
    res.status(401).send('Unauthorized user....no token provided')
    console.log(err)
  }
}

//get productsdata api
router.get('/getproducts', async (req, res) => {
  try {
    const productsData = await db.query('SELECT * FROM products')
    // console.log(productsData.rows);
    res.status(201).json(productsData.rows)
  } catch (err) {
    console.log(err.message)
  }
})

// registering the data
router.post('/signup', async (req, res) => {
  // console.log(req.body);
  const { fname, email, number, password, cpassword } = req.body

  if (!fname || !email || !number || !password || !cpassword) {
    res.status(422).json({ error: 'Please fill all the data' })
    console.log('no data available')
  }
  try {
    const preUser = await db.query('SELECT fname FROM users where email = $1', [
      email,
    ])
    if (preUser.length > 0) {
      res.status(422).json({ error: 'This user is alreday present' })
    } else if (password != cpassword) {
      res.status(422).json({ error: 'password did not match' })
    } else {
      // encryption for the password (hashing using bcrypt.js)
      const hashpass = await bcrypt.hash(password, saltRounds)
      const hashcpass = await bcrypt.hash(cpassword, saltRounds)
      const finalUser = await db.query(
        'INSERT INTO users (fname, email, number, password, cpassword) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [fname, email, number, hashpass, hashcpass]
      )

      console.log(finalUser.rows)
      res.status(201).json(finalUser.rows)
    }
  } catch (err) {
    console.log('error', err.message)
  }
})

// to get individual data
router.get('/getDetail/:id', async (req, res) => {
  try {
    // to get the id that the we have inputted in the params
    const { id } = req.params
    // console.log(id);
    const indiData = await db.query('SELECT * fROM products WHERE id = $1', [
      id,
    ])
    // console.log(indiData.rows);
    res.status(201).json(indiData.rows)
  } catch (err) {
    res.status(400).json(indiData.rows)
    console.log('error', err.message)
  }
})

// login user

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ error: 'fill all the data' })
  }
  try {
    const userLogin = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])
    const data = userLogin.rows[0]

    if (data) {
      const isMatch = await bcrypt.compare(password, data.password)
      // TOKEN GENERATE

      try {
        const id = data.id
        const token = jwt.sign({ id }, secretKey)
        const fullData = await db.query(
          'UPDATE users SET token = $1 WHERE id = $2 RETURNING *',
          [token, id]
        )
        // console.log(token)
        // console.log(fullData.rows[0])

        // cookie
        res.cookie('ShopEase', token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        })
      } catch (err) {
        console.log(err)
      }
      if (!isMatch) {
        res.status(400).json({ error: 'Password is incorrect' })
      } else {
        res.status(201).json(userLogin)
      }
    } else {
      res.status(400).json({ error: 'invalid details' })
    }
  } catch (err) {
    res.status(400).json({ error: 'Invalid details' })
  }
})

// to store data inside the cart

router.post('/addCart/:id', authenticate, async (req, res) => {
  try {
    const productid = req.params.id
    // console.log(productid+" product id");
    const cartVal = await db.query('SELECT * FROM products WHERE id = $1', [
      productid,
    ])
    // console.log(JSON.stringify(cartVal.rows[0],null,2) + " cart value ");

    const userid = req.userid
    const userContact = await db.query('SELECT * FROM users WHERE id = $1', [
      userid,
    ])
    // console.log(JSON.stringify(userContact.rows[0],null,2)+"user data");

    // add cart data in database
    if (userContact.rows[0]) {
      const c = cartVal.rows[0]
      const cart = await db.query(
        'UPDATE users SET cart = array_append(cart, $1) WHERE id = $2 RETURNING *',
        [c, userid]
      )
      console.log(cart.rows[0])
      // console.log(JSON.stringify(cart.rows[0],null,2) + 'user data after appending')
      res.status(201).json(userContact.rows[0])
    } else {
      res.status(401).json({ error: 'invalid user' })
    }
  } catch (err) {
    console.log(err)
  }
})

// get cart details
router.get('/cartdetails', authenticate, async (req, res) => {
  try {
    const id = req.userid
    const buyer = await db.query('SELECT * FROM users WHERE id = $1', [id])
    // console.log(buyer.rows[0]);
    res.status(201).json(buyer.rows[0])
  } catch (err) {
    console.log(err)
  }
})

// get valid user
router.get('/validuser', authenticate, async (req, res) => {
  try {
    const id = req.userid
    const validuser = await db.query('SELECT * FROM users WHERE id = $1', [id])
    // console.log(validuser.rows[0])
    res.status(201).json(validuser.rows[0])
  } catch (err) {
    console.log(err)
  }
})

// remove elemnt from cart
router.delete('/remove/:id', authenticate, async (req, res) => {
  try {
    const userid = req.userid
    const productid = req.params.id
    // console.log("the result1 ==",userid,productid)
    const cartVal = await db.query('SELECT * FROM products WHERE id = $1', [
      productid,
    ])
    const c = cartVal.rows[0]
    // console.log("the result2 ===",c);
    const currVal = await db.query(
      `WITH indexed_cart AS (
    SELECT 
        item,
        ROW_NUMBER() OVER (PARTITION BY item::json->>'id' ORDER BY item) AS rn
    FROM (
        SELECT unnest(cart) AS item
        FROM users
        WHERE id = $1
    ) AS unnest_cart
)
UPDATE users 
SET cart = ARRAY(
    SELECT item 
    FROM indexed_cart 
    WHERE rn > 1 OR item::json->>'id' != $2
)
WHERE id = $1
RETURNING cart;`,
      [userid, productid]
    )

    console.log('the last result --', currVal.rows[0].cart)

    // console.log("the last result --",currVal)
    // const currVal = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [
    //   productid,
    // ])
    if (currVal.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    const restVal = await db.query('SELECT * FROM users')

    res.status(201).json(restVal.rows[0])
    console.log('item removed')
  } catch (err) {
    console.log(err)
    res.status(400).json(restVal.rows[0])
  }
})

// for user to log out

router.get('/logout', authenticate, async (req, res) => {
  try {
    const id = req.userid
    const result = await db.query(
      'UPDATE users SET token = NULL WHERE id = $1 RETURNING *',
      [id]
    )
    // clear cookie
    res.clearCookie('ShopEase', { path: '/' })
    res.status(201).json(result.rows[0])
    console.log('user logged out')
  } catch (err) {
    console.log('error for user logout ', err)
    res.status(500).json({ error: 'Failed to logout' })
  }
})

export default router
