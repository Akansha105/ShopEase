import pg from 'pg'
import env from 'dotenv';
import productsdata from "../constant/productsdata.js"
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})

let count = false;
const DefaultData = async (products) => {
  try {
    for (const product of products) {
    const storeData = await db.query(
      'UPDATE products SET short_title = $1, long_title = $2 , extra_discount = $3 where id = $4',
      [product.title.shortTitle, product.title.longTitle, product.discount,product.id]
    )
    console.log('Product inserted:',storeData.rows[0])
    count = true;
  }
  } catch (error) {
    console.log('error', error.message)
  }
}
if(count)
{
  DefaultData(productsdata)
}

export default db;