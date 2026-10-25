import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { DeleteCabin } from "../../services/apiCabins";
export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteMutation } = useMutation({
    mutationFn: (id) => DeleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteMutation };
}
