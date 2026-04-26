import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom'

function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <Col sm={12} md={6} lg={4} xl={3} className="mb-4">
      <Card className="h-100 shadow-sm">
        <Card.Img
          src={product.image}
          alt={product.title}
          className="product-image p-3"
        />

        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-6">{product.title}</Card.Title>
          <Card.Text className="fw-bold">
            ${Number(product.price).toFixed(2)}
          </Card.Text>

          <Button
            variant="primary"
            className="mt-auto"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ProductCard