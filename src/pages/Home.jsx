import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="bg-dark text-white py-5">
        <Container className="text-center py-4">
          <h1 className="display-4 fw-bold">Welcome to FakeStoreApp</h1>

          <p className="lead mt-3 mb-4">
            Browse products, view details, and practice creating, editing, and
            deleting products using FakeStoreAPI.
          </p>

          <Button as={Link} to="/products" variant="primary" size="lg">
            View Products
          </Button>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="g-4 text-center">
          <Col md={4}>
            <div className="p-4 border rounded shadow-sm h-100 bg-white">
              <div className="fs-1 mb-3">📦</div>
              <h5 className="fw-bold">Browse Products</h5>
              <p className="text-muted">
                Fetch and display product data from FakeStoreAPI.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="p-4 border rounded shadow-sm h-100 bg-white">
              <div className="fs-1 mb-3">🛠️</div>
              <h5 className="fw-bold">Practice CRUD</h5>
              <p className="text-muted">
                Create, update, and delete products with API requests.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="p-4 border rounded shadow-sm h-100 bg-white">
              <div className="fs-1 mb-3">📱</div>
              <h5 className="fw-bold">Responsive UI</h5>
              <p className="text-muted">
                Built with React Bootstrap for clean responsive layouts.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home