import { useForm } from "react-hook-form";
import { useCreateEditCabin } from "./UseCreateEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ onCloseModal, cabinToEdit }) {
  const { id: editId, ...editValues } = cabinToEdit || {};

  const isEDIT = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEDIT ? editValues : {},
  });

  const { createCabin, isCreating, updateCabin, isUpdating } =
    useCreateEditCabin();

  function submitForm(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEDIT) {
      updateCabin(
        { cabin: { ...data, image }, editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createCabin(
        { cabin: { ...data, image } },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(submitForm)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Cabin name is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: {
              value: 1,
              message: "Maximum capacity must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required",
            min: {
              value: 10,
              message: "Regular price must be at least 10",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            validate: (value) =>
              Number(value) < Number(getValues("regularPrice")) ||
              "Discount must be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description for website">
        <Textarea
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEDIT ? false : "Cabin photo is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isUpdating} type="submit">
          {isEDIT ? "Update cabin" : "Create New cabin"}{" "}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
