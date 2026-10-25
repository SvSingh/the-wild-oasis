import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./UseSettings";
import { useEditSetting } from "./useEditSetting";

function UpdateSettingsForm() {
  const { settings, isLoading, error } = useSettings();
  const { editSetting, isEditing } = useEditSetting();

  const handleUpdateSetting = (key, value) => {
    if (value) {
      editSetting({ [key]: value });
    }
  };

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakFastPrice,
  } = settings || {};

  if (isLoading || isEditing) return <Spinner />;
  if (error) return <p role="alert">{error.message}</p>;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) =>
            handleUpdateSetting("minBookingLength", e.target.value)
          }
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) =>
            handleUpdateSetting("maxBookingLength", e.target.value)
          }
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) =>
            handleUpdateSetting("maxGuestsPerBooking", e.target.value)
          }
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakFastPrice}
          onBlur={(e) => handleUpdateSetting("breakFastPrice", e.target.value)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
