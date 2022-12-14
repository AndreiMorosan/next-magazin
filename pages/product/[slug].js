import React from 'react'
import {useRouter} from 'next/Router';
import data from '../../utils/data.js';
import Layout from '../../components/Layout.js';
import NextLink from 'next/link';
import Image from 'next/image';
import {Link,Grid,List,ListItem, Typography,Card,Button} from '@material-ui/core';
import useStyles from '../../utils/styles.js'
import db from '../../utils/db.js';
import Product from '../../models/Product.js';

export default function ProductScreen(props) {
  const {product} = props;
  const classes =useStyles();

  if(!product){
    return <div>Product Not Found</div>
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>back to products</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              {/* <Rating value={product.rating} readOnly></Rating> */}
              <Link href="#reviews">
                <Typography>({product.numReviews} reviews)</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Typography> Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
      </Layout>
    
  )
}

export async function getServerSideProps(context){
  const {params} = context;
  const {slug} = params;
  await db.connect(); 
  const products = await Product.findOne({slug}).lean();
  await db.disconnect();

  return{
    props: {
      product: db.convertDocToObj(products),
    },
  };
}
