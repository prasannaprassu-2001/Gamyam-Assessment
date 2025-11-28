import React from 'react';
import { Table, Button } from 'reactstrap';

export default function ProductTable({ products, onEdit, onDelete }) {
  if (!products.length) return <div className="text-center text-muted">No products found.</div>;

  return (
    <Table hover responsive className="align-middle text-center">
      <thead className="table-light">
        <tr>
          <th className="text-start">Name</th>
          <th>Category</th>
          <th>Price (₹)</th>
          <th>Stock</th>
          <th>Active</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td className="text-start">{p.name}</td>
            <td>{p.category}</td>
            <td>{p.price}</td>
            <td>{p.stock ?? 0}</td>
            <td>{p.isActive ? 'Yes' : 'No'}</td>
            <td>{new Date(p.createdAt).toLocaleDateString()}</td>
            <td>
              <div className="d-flex justify-content-center gap-2">
                <Button color="primary" size="sm" onClick={() => onEdit(p)}>Edit</Button>
                <Button color="danger" size="sm" onClick={() => onDelete(p.id)}>Delete</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
