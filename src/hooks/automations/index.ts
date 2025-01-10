"use client";
import {
  createAutomations,
  getAllAutomations,
  getAutomationInfo,
  updateAutomation
} from "@/actions/automations";
import { useQuery } from "@tanstack/react-query";
import { useMutationData } from "../mutation";
import { useEffect, useRef, useState } from "react";
const useAutomations = () => {
   
  const { data } = useQuery({
    queryKey: ["user-automations"],
    queryFn: async() => await getAllAutomations()
  });

  return { data};
};

const useCreateAutomation = () => {
  const { isPending, mutate } = useMutationData({
    mutationKey: ["create-automation"],
    mutationFn: () => createAutomations(),
    queryKey: "user-automations"
  });

  return { isPending, mutate };
};

const useAutomation = ({ automatonId }: { automatonId: string }) => {
  const { data: automationInfo } = useQuery({
    queryKey: ["user-automations"],
    queryFn: () => getAutomationInfo({ id: automatonId })
  });

  return { automationInfo };
};

const useEditAutomation = ({ automatonId }: { automatonId: string }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const enableEdit = () => {
    setEdit(true);
    inputRef.current?.focus();
  };
  const disableEdit = () => {
    setEdit(false);
  };
  const { isPending, mutate } = useMutationData({
    mutationKey: ["update-automation"],
    mutationFn: ({ name }: { name: string }) =>
      updateAutomation({ id: automatonId, data: { name } }),
    queryKey: "automation-info",
    onSuccess: () => disableEdit()
  });

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        if (inputRef.current.value.length) {
          mutate({ name: inputRef.current.value });
        } else {
          disableEdit();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { isPending, edit, enableEdit, disableEdit, inputRef };
};
export {
  useAutomations,
  useCreateAutomation,
  useAutomation,
  useEditAutomation
};
