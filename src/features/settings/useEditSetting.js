import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";

export function useEditSetting() {
  const queryClient = useQueryClient();
  const { mutate: editSetting, isLoading: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  return { editSetting, isEditing };
}
