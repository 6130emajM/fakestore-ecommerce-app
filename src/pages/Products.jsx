import { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import ProductCard from '../components/ProductCard'

const CATEGORIES = [
  'all',
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
]

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await axios.get('https://fakestoreapi.com/products')
      setProducts(response.data)
    } catch (err) {
      console.error(err)
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-1">Products</h2>
      <p className="text-muted mb-4">Browse the FakeStore product catalog.</p>

      <div className="d-flex flex-column flex-md-row gap-3 mb-4">
        <Form.Control
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: '320px' }}
        />

        <div className="d-flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              size="sm"
              variant={activeCategory === category ? 'primary' : 'outline-secondary'}
              className="text-capitalize"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Loading products...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger">
          {error}{' '}
          <Alert.Link onClick={fetchProducts} style={{ cursor: 'pointer' }}>
            Try again
          </Alert.Link>
        </Alert>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-muted text-center py-5">
          No products match your search or filter.
        </p>
      )}

      {!loading && !error && (
        <>
          <p className="text-muted">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? 's' : ''} found
          </p>

          <Row>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Row>
        </>
      )}
    </Container>
  )
}

export default Products