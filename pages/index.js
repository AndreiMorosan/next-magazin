import Head from 'next/head'
import Layout from '../components/Layout.js';
import {Grid,Card, CardActionArea, CardMedia, CardContent, Typography,CardActions, Button} from '@material-ui/core';
import data from '../utils/data';
import NextLink from 'next/link';
import db from '../utils/db';
import Product from '../models/Product';

export default function Home(props) {
  const {product} = props;

  return (
    <Layout>
         <div>
      <h1>
        Products
      </h1>
       <Grid container spacing={3}>
           {product.map((product)=>(
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href ={`/product/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia component="img" image={product.image} title={product.name}>
                  </CardMedia>
                  <CardContent>
                    <Typography>
                      {product.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="small" color="primary">
                    Add to cart
                    </Button>
                </CardActions>
              </Card>
            </Grid>
           ))}   
       </Grid>       
    </div>
    </Layout>
  
  )
}

export async function getServerSideProps(){
  await db.connect(); 
  const products = await Product.find({}).lean();
  await db.disconnect();

  return{
    props: {
      product: products.map(db.convertDocToObj),
    },
  };
}

