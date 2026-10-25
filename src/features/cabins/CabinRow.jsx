import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";

import { useState } from "react";
import { useDeleteCabin } from "./useDeleteCabin";

import CreateCabinForm from "./CreateCabinForm";
import { useCreateEditCabin } from "./UseCreateEditCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  margin-bottom: 1rem;

  max-width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const {
    id: cabinId,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
  } = cabin;

  const { isDeleting, deleteMutation } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateEditCabin();

  function handleDuplicate() {
    createCabin({
      cabin: {
        image,
        name: `Copy of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
      },
    });
  }
  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />

        <Cabin>{name}</Cabin>

        <div>Fits up to {maxCapacity} guests</div>

        <Price>{formatCurrency(regularPrice)}</Price>

        {discount > 0 ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>-</span>
        )}
        <div>
          <button disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm(!showForm)}>
            <HiPencil />
          </button>

          <button onClick={() => deleteMutation(cabinId)} disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
