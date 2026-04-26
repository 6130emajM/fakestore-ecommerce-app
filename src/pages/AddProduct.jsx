import { useState } from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

const CATEGORIES = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
]

function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdProduct, setCreatedProduct] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      setError('')

      const response = await axios.post('https://fakestoreapi.com/products', {
        ...formData,
        price: parseFloat(formData.price) || 0,
      })

      setCreatedProduct(response.data)
    } catch (err) {
      console.error(err)
      setError('Failed to create product.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (createdProduct) {
    return (
      <Container className="py-5" style={{ maxWidth: '650px' }}>
        <Alert variant="success" className="text-center">
          <Alert.Heading>Product Created!</Alert.Heading>

          <p>
            <strong>{createdProduct.title || 'New Product'}</strong> was created
            with ID: <strong>{createdProduct.id}</strong>.
          </p>

          <p className="text-muted small">
            FakeStoreAPI is a mock API. The product will not appear permanently
            in the product list.
          </p>

          <div className="d-flex gap-2 justify-content-center">
            <Button as={Link} to="/products" variant="primary">
              View Products
            </Button>

            <Button
              variant="outline-secondary"
              onClick={() => {
                setCreatedProduct(null)
                setFormData({
                  title: '',
                  price: '',
                  description: '',
                  category: '',
                  image: '',
                })
              }}
            >
              Add Another
            </Button>
          </div>
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5" style={{ maxWidth: '650px' }}>
      <h2 className="fw-bold mb-1">Add Product</h2>
      <p className="text-muted mb-4">
        Create a new product using FakeStoreAPI.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
              />

              {formData.image && (
                <div className="mt-3 text-center border rounded p-2 bg-white">
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{ maxHeight: '120px', objectFit: 'contain' }}
                  />
                </div>
              )}
            </Form.Group>

            <p className="text-muted small">
              Note: FakeStoreAPI is a mock API. Create requests return success,
              but products will not persist after refresh.
            </p>

            <Button type="submit" variant="primary" className="w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Product'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AddProduct