import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export default function AddEditForm({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    isActive: true,
    id: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        price: product.price ?? '',
        category: product.category || '',
        stock: product.stock ?? '',
        description: product.description || '',
        isActive: product.isActive ?? true,
        id: product.id,
      });
    }
  }, [product]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (form.price === '' || isNaN(Number(form.price))) e.price = 'Price is required and must be a number';
    if (!form.category.trim()) e.category = 'Category is required';
    if (form.stock !== '' && isNaN(Number(form.stock))) e.stock = 'Stock must be a number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      id: form.id,
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category.trim(),
      stock: form.stock === '' ? 0 : Number(form.stock),
      description: form.description.trim(),
      isActive: !!form.isActive,
      createdAt: product ? product.createdAt : new Date().toISOString(),
    };
    onSave(payload);
  };

  return (
    <Modal isOpen={true} toggle={onClose}>
      <ModalHeader toggle={onClose}>{product ? 'Edit Product' : 'Add Product'}</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label>Name *</Label>
            <Input value={form.name} invalid={!!errors.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <FormFeedback>{errors.name}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label>Price (₹) *</Label>
            <Input value={form.price} invalid={!!errors.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <FormFeedback>{errors.price}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label>Category *</Label>
            <Input value={form.category} invalid={!!errors.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            <FormFeedback>{errors.category}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label>Stock</Label>
            <Input value={form.stock} invalid={!!errors.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
            <FormFeedback>{errors.stock}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Input type="textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </FormGroup>

          <FormGroup check>
            <Input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
            <Label check>Active</Label>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={onClose}>Cancel</Button>
          <Button color="primary" type="submit">{product ? 'Save' : 'Add'}</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
