import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default function PaginationComponent({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(Math.min(totalPages, page + 1));

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <Pagination>
      <PaginationItem disabled={page === 1}>
        <PaginationLink previous onClick={prev} />
      </PaginationItem>
      {pages.map(p => (
        <PaginationItem active={p === page} key={p}>
          <PaginationLink onClick={() => onPageChange(p)}>{p}</PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={page === totalPages}>
        <PaginationLink next onClick={next} />
      </PaginationItem>
    </Pagination>
  );
}
