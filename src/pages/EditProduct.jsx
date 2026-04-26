import { useEffect, useState } from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { Link, useParams } from 'react-router-dom'

const CATEGORIES = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
]

function EditProduct() {
  const { id } = useParams()

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  })

  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)

        const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
        const product = response.data

        setFormData({
          title: product.title || '',
          price: product.price || '',
          description: product.description || '',
          category: product.category || '',
          image: product.image || '',
        })
      } catch (err) {
        console.error(err)
        setError('Failed to load product for editing.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

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

      await axios.put(`https://fakestoreapi.com/products/${id}`, {
        ...formData,
        price: parseFloat(formData.price) || 0,
      })

      setUpdated(true)
    } catch (err) {
      console.error(err)
      setError('Failed to update product.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Loading edit form...</p>
      </div>
    )
  }

  if (updated) {
    return (
      <Container className="py-5" style={{ maxWidth: '650px' }}>
        <Alert variant="success" className="text-center">
          <Alert.Heading>Product Updated!</Alert.Heading>

          <p className="text-muted small">
            FakeStoreAPI is a mock API. Update requests return success, but
            changes will not persist after refresh.
          </p>

          <div className="d-flex gap-2 justify-content-center">
            <Button as={Link} to={`/products/${id}`} variant="primary">
              View Product
            </Button>

            <Button as={Link} to="/products" variant="outline-secondary">
              All Products
            </Button>
          </div>
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5" style={{ maxWidth: '650px' }}>
      <Button as={Link} to={`/products/${id}`} variant="outline-secondary" className="mb-4">
        ← Back to Product
      </Button>

      <h2 className="fw-bold mb-1">Edit Product</h2>
      <p className="text-muted mb-4">Update this product using FakeStoreAPI.</p>

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
            </Form.Group>

            <p className="text-muted small">
              Note: FakeStoreAPI is a mock API. Update requests return success,
              but changes will not persist after refresh.
            </p>

            <Button type="submit" variant="warning" className="w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Update Product'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default EditProduct