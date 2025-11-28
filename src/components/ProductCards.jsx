import React from 'react';
import { Card, CardBody, CardTitle, CardText, Badge, Button, Row, Col } from 'reactstrap';

export default function ProductCards({ products, onEdit, onDelete }) {
  if (!products.length) return <div className="text-center text-muted">No products found.</div>;

  return (
    <Row xs="1" sm="2" md="3" lg="4" className="g-3">
      {products.map(p => (
        <Col key={p.id}>
          <Card className="h-100 d-flex flex-column">
            <CardBody className="d-flex flex-column">
              <CardTitle tag="h5">{p.name}</CardTitle>
              <CardText>{p.category} • ₹{p.price}</CardText>
              <CardText className="flex-grow-1">{p.description}</CardText>
              <Badge color={p.isActive ? 'success' : 'secondary'} className="mt-2">
                {p.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </CardBody>
            <div className="d-flex justify-content-between p-2 mt-auto">
              <Button color="primary" size="sm" onClick={() => onEdit(p)}>Edit</Button>
              <Button color="danger" size="sm" onClick={() => onDelete(p.id)}>Delete</Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
