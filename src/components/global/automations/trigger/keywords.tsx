"use client";
import { useAutomation, useKeywords } from "@/hooks/automations";
import { useMutationDataState } from "@/hooks/mutation";
import React from "react";
import GradientText from "../../gradient-text";
import { X } from "lucide-react";
import { Loader } from "../../loader";
import GradientButton from "../../gradient-button";
import { Input } from "@/components/ui/input";

type Props = {
  id: string;
};

const Keywords = ({ id }: Props) => {
  const {
    isPending,
    keyword,
    onValueChange,
    keyPressAsEnter,
    isPendingDelete,
    mutateDelete,
  } = useKeywords({ id });
  const { latestVariables } = useMutationDataState({
    mutationKey: ["add-keyword"],
  });
  const { automationInfo } = useAutomation({ automatonId: id });

  return (
    <div className="flex bg-background-80 flex-col gap-y-3 p-3 rounded-xl">
      <GradientText className="text-sm  ">
        Add Keywords that will trigger the automation
      </GradientText>
      <div className="flex flex-wrap justify-start gap-2 items-center">
        {automationInfo?.data?.Keywords &&
          automationInfo.data.Keywords.length > 0 &&
          automationInfo.data.Keywords.map(
            (word, index) =>
              word.id !== latestVariables?.variables?.id && (
                <div
                  key={word.id}
                  className="flex bg-background-90 items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full"
                >
                  <p>{word.word}</p>
                  <Loader loading={isPendingDelete}>
                    <X
                      size={20}
                      onClick={() => mutateDelete({ id: word.id })}
                    />
                  </Loader>
                </div>
              )
          )}
        {latestVariables && latestVariables.status === "pending" && (
          <GradientButton
            element="div"
            className="pt-2"
            textClassName="capitalize"
          >
            {latestVariables.variables.keyword}
          </GradientButton>
        )}
        <Input
          placeholder="Add Keyword"
          
          value={keyword}
          className="p-0 bg-transparent ring-0 border-none outline-none"
          onChange={onValueChange}
          onKeyUp={keyPressAsEnter}
        />
      </div>
    </div>
  );
};

export default Keywords;
