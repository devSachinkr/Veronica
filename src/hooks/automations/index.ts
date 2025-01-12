"use client";
import {
  attachPosts,
  createAutomations,
  createListner,
  deleteKeyword,
  getAllAutomations,
  getAutomationInfo,
  getProfilePosts,
  saveKeyword,
  saveTriger,
  updateAutomation,
} from "@/actions/automations";
import { TRIGGER } from "@/lib/redux/slices/automation";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { PromptSchema } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useMutationData } from "../mutation";
import { useZodForm } from "../zod-form";
const useAutomations = () => {
  const { data } = useQuery({
    queryKey: ["user-automations"],
    queryFn: async () => await getAllAutomations(),
  });

  return { data };
};

const useCreateAutomation = () => {
  const { isPending, mutate } = useMutationData({
    mutationKey: ["create-automation"],
    mutationFn: () => createAutomations(),
    queryKey: "user-automations",
  });

  return { isPending, mutate };
};

const useAutomation = ({ automatonId }: { automatonId: string }) => {
  const { data: automationInfo } = useQuery({
    queryKey: ["user-automations"],
    queryFn: () => getAutomationInfo({ id: automatonId }),
  });

  return { automationInfo };
};

const useAutomationInfo = ({ automatonId }: { automatonId: string }) => {
  const { data: automationInfo, isFetching } = useQuery({
    queryKey: ["automation-info"],
    queryFn: () => getAutomationInfo({ id: automatonId }),
  });
  return { automationInfo, isFetching };
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
    onSuccess: () => disableEdit(),
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

const useListner = ({ id }: { id: string }) => {
  const [listener, setListener] = useState<"MESSAGE" | "SMART_AI" | null>(
    "MESSAGE"
  );

  const { isPending, mutate } = useMutationData({
    mutationKey: ["create-listener"],
    mutationFn: ({ prompt, reply }: z.infer<typeof PromptSchema>) =>
      createListner({
        data: {
          automationId: id,
          prompt,
          commentReply: reply,
          listener: listener || "MESSAGE",
        },
      }),
    queryKey: "automation-info",
  });

  const { onSubmit, register } = useZodForm({
    mutation: mutate,
    schema: PromptSchema,
    defaultValues: {
      prompt: "",
      reply: "",
    },
  });

  const onSetListener = (listner: "MESSAGE" | "SMART_AI") => {
    setListener(listner);
  };

  return {
    isPending,
    onSubmit,
    register,
    onSetListener,
    listener,
  };
};

const useTriggers = ({ id }: { id: string }) => {
  const types = useAppSelector((state) => state.automation.trigger?.types);

  const dispatch: AppDispatch = useDispatch();
  const onSetTrigger = (type: "COMMENT" | "DM") => {
    return dispatch(
      TRIGGER({
        trigger: {
          type,
        },
      })
    );
  };

  const { isPending, mutate } = useMutationData({
    mutationKey: ["add-trigger"],
    mutationFn: ({ types }: { types: string[] }) =>
      saveTriger({
        data: {
          automationId: id,
          triggers: types,
        },
      }),
    queryKey: "automation-info",
  });

  const onSaveTrigger = () => mutate({ types });
  return { onSaveTrigger, onSetTrigger, isPending, types };
};

const useKeywords = ({ id }: { id: string }) => {
  const [keyword, setKeyword] = useState<string>("");
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const { isPending, mutate } = useMutationData({
    mutationKey: ["add-keyword"],
    mutationFn: ({ keyword }: { keyword: string }) =>
      saveKeyword({
        data: {
          word: keyword,
          automationId: id,
        },
      }),
    queryKey: "automation-info",
    onSuccess: () => setKeyword(""),
  });
  const keyPressAsEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      mutate({ keyword });
    }
  };

  const { isPending: isPendingDelete, mutate: mutateDelete } = useMutationData({
    mutationKey: ["delete-keyword"],
    mutationFn: ({ keywordId }: { keywordId: string }) =>
      deleteKeyword({ data: { id: keywordId } }),
    queryKey: "automation-info",
  });
  return {
    isPending,
    keyword,
    onValueChange,
    keyPressAsEnter,
    isPendingDelete,
    mutateDelete,
  };
};

const useAutomationPosts = () => {
  const fetchPosts = async () => await getProfilePosts();
  const { data: automations, isFetching } = useQuery({
    queryKey: ["instagram-media"],
    queryFn: () => fetchPosts(),
  });
  return { automations, isFetching };
};

const useAutomationPostsInfo = ({ id }: { id: string }) => {
  const [posts, setPosts] = useState<
    {
      postId: string;
      caption?: string;
      media: string;
      mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    }[]
  >([]);

  const selectPost = ({
    postId,
    caption,
    media,
    mediaType,
  }: {
    postId: string;
    caption?: string;
    media: string;
    mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  }) => {
    setPosts((prev) => {
      if (prev.find((p) => p.postId === postId)) {
        return prev.filter((i) => i.postId !== postId);
      } else {
        return [...prev, { postId, caption, media, mediaType }];
      }
    });
  };
  const { isPending, mutate } = useMutationData({
    mutationKey: ["attach-posts"],
    mutationFn: () => attachPosts({ data: posts, automationId: id }),
    queryKey: "automation-info",
    onSuccess: () => setPosts([]),
  });
  return { isPending, mutate, posts, selectPost };
};

export {
  useAutomation,
  useAutomationInfo,
  useAutomations,
  useCreateAutomation,
  useEditAutomation,
  useKeywords,
  useListner,
  useTriggers,
  useAutomationPosts,
  useAutomationPostsInfo,
};
