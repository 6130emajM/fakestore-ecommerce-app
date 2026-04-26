import { useEffect, useState } from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DeleteModal from '../components/DeleteModal'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
      setProduct(response.data)
    } catch (err) {
      console.error(err)
      setError('Failed to load product details.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  const handleDelete = async () => {
    try {
      setIsDeleting(true)

      await axios.delete(`https://fakestoreapi.com/products/${id}`)

      setShowModal(false)
      navigate('/products')
    } catch (err) {
      console.error(err)
      setError('Failed to delete product.')
      setShowModal(false)
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Loading product details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button as={Link} to="/products" variant="secondary">
          Back to Products
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <Button as={Link} to="/products" variant="outline-secondary" className="mb-4">
        ← Back to Products
      </Button>

      <Row className="g-5 align-items-center">
        <Col md={5} className="text-center">
          <div className="bg-white border rounded p-4">
            <img
              src={product.image}
              alt={product.title}
              className="details-image"
            />
          </div>
        </Col>

        <Col md={7}>
          <Badge bg="secondary" className="text-capitalize mb-2">
            {product.category}
          </Badge>

          <h2 className="fw-bold">{product.title}</h2>

          {product.rating && (
            <p className="text-muted">
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}

          <h3 className="text-primary fw-bold mb-3">
            ${Number(product.price).toFixed(2)}
          </h3>

          <hr />

          <p className="text-muted">{product.description}</p>

          <div className="d-flex gap-2 mt-4 flex-wrap">
            <Button variant="success">Add to Cart</Button>

            <Button
              as={Link}
              to={`/edit-product/${product.id}`}
              variant="warning"
            >
              Edit Product
            </Button>

            <Button variant="danger" onClick={() => setShowModal(true)}>
              Delete Product
            </Button>
          </div>

          <p className="mt-4 text-muted small">
            Note: FakeStoreAPI is a mock API. Delete requests return success,
            but the product will not be permanently removed.
          </p>
        </Col>
      </Row>

      <DeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        productTitle={product.title}
      />
    </Container>
  )
}

export default ProductDetails