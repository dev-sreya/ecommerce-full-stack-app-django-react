import React, {useState, useEffect }  from 'react'
import Rating from '../components/Rating'
//import products from '../products'
import {Link, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, ListGroupItem} from 'react-bootstrap'
import axios from 'axios'


function ProductScreen() {
  const { id } = useParams();
  
  // const product = products.find(p => p._id === String(id));
 
  // if (!product) {
  //   return <h2>Product not found</h2>;
  // }

  const [product, setProduct] = useState([])
  useEffect(() => {

    async function fetchProduct(){
      const {data} = await axios.get(`/api/product/${id}`)
      setProduct(data)

    }
    fetchProduct()    

  }, [])

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go back</Link>
      <Row>
        <Col md={6}>
        <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'> 
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
            <Rating value={product.rating} text={'${product.numReviews} reviews'} color={'#f8e825'}/>
            </ListGroup.Item>

            <ListGroup.Item>
              Price: {product.price}
            </ListGroup.Item>

            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>

          </ListGroup>
        </Col>

        <Col md={3}>
        <ListGroup variant='fluid'>
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col><strong> ${product.price}</strong></Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
                <Col> Status:</Col>
              <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'} </Col>
               
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Button className='btn-block' disabled={product.countInStock == 0} type='button]'> Add to Cart </Button>
          </ListGroup.Item>          

          
          </ListGroup></Col>
      </Row>
    </div>
  );
}
export default ProductScreen;