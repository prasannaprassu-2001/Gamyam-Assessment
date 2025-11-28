import React, { useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import productsData from './data/products.json';
import ProductTable from './components/ProductTable';
import ProductCards from './components/ProductCards';
import SearchBar from './components/SearchBar';
import AddEditForm from './components/AddEditForm';
import PaginationComponent from './components/Pagination';
import { Container, Row, Col, Button } from 'reactstrap';

const PAGE_SIZE = 8;

function App() {
  const [products, setProducts] = useState(() => productsData.map(p => ({ ...p })));
  const [view, setView] = useState('cards');
  const [query, setQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(q));
  }, [products, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const handleAdd = (product) => {
    const nextId = Math.max(0, ...products.map(p => p.id)) + 1;
    const newProduct = { ...product, id: nextId, createdAt: new Date().toISOString(), isActive: product.isActive };
    setProducts(prev => [newProduct, ...prev]);
    setIsFormOpen(false);
    setPage(1);
  };

  const handleUpdate = (updated) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? { ...p, ...updated } : p));
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const openAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this product?')) return;
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <Container className="my-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h1>Gamyam — Product Assessment</h1>
        </Col>
        <Col className="text-end">
          <Button color="secondary" className="me-2" onClick={() => setView(v => v === 'cards' ? 'list' : 'cards')}>
            Switch to {view === 'cards' ? 'List' : 'Card'} View
          </Button>
          <Button color="primary" onClick={openAdd}>+ Add Product</Button>
        </Col>
      </Row>

      <SearchBar onSearch={setQuery} debounceMs={500} placeholder="Search by product name..." />

      <Row className="my-3">
        <Col>
          {view === 'cards' ? (
            <ProductCards products={paginated} onEdit={openEdit} onDelete={handleDelete} />
          ) : (
            <ProductTable products={paginated} onEdit={openEdit} onDelete={handleDelete} />
          )}
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center">
          <PaginationComponent
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </Col>
      </Row>

      {isFormOpen && (
        <AddEditForm
          product={editingProduct}
          onClose={() => { setIsFormOpen(false); setEditingProduct(null); }}
          onSave={(p) => editingProduct ? handleUpdate(p) : handleAdd(p)}
        />
      )}

      <footer className="text-center mt-5 mb-3 text-muted">
        <small>Gamyam Infotech - Project Assignment</small>
      </footer>
    </Container>
  );
}

export default App;
