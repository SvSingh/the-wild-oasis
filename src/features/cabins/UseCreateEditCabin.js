import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: function ({ cabin }) {
      return createEditCabin(cabin);
    },
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error("Error creating cabin " + error.message);
    },
  });
  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: function ({ cabin, editId }) {
      return createEditCabin(cabin, editId);
    },
    onSuccess: () => {
      toast.success("Cabin updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error("Error updating cabin " + error.message);
    },
  });
  return { createCabin, isCreating, updateCabin, isUpdating };
}
