"use client";
import { Input } from "@/components/ui/input";
import {
  useAutomationInfo,
  useKeywords
} from "@/hooks/automations";
import { useMutationDataState } from "@/hooks/mutation";
import { X } from "lucide-react";
import GradientText from "../../gradient-text";
import { Loader } from "../../loader";

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
  const { automationInfo, isFetching } = useAutomationInfo({ automatonId: id });

  return (
    <div className="flex bg-background-80 flex-col gap-y-3 p-3 rounded-xl">
      <GradientText className="text-sm  ">
        Add Keywords that will trigger the automation
      </GradientText>
      {
       
          <div className="flex flex-wrap justify-start gap-2 items-center">
            {automationInfo?.data?.Keywords &&
              automationInfo.data.Keywords.length > 0 &&
              automationInfo.data.Keywords.map(
                (word, index) =>
                  word.id !== latestVariables?.variables?.id && (
                    <div
                      key={word.id}
                      className="bg-gradient-to-br text-white rounded-xl text-lg from-demon-Yellow via-yellow-200 to-yellow-700  flex items-center justify-center p-[4px] "
                    >
                      <div className="rounded-xl text-white bg-background-80/85  w-fill   flex items-center justify-center p-2 gap-x-2">
                        <p>{word.word}</p>
                        <Loader loading={isPendingDelete}>
                          <X
                            size={20}
                            onClick={() => mutateDelete({ keywordId: word.id })}
                          />
                        </Loader>
                      </div>
                    </div>
                  )
              )}
            {latestVariables && latestVariables.status === "pending" && (
              <div
                key={latestVariables.variables?.id}
                className="bg-gradient-to-br text-white rounded-xl text-lg from-demon-Yellow via-yellow-200 to-yellow-700  flex items-center justify-center p-[4px] "
              >
                <div className="rounded-xl text-white bg-background-80/85  w-fill   flex items-center justify-center p-2 gap-x-2">
                  <p>{latestVariables.variables?.keyword}</p>
                  <Loader loading={isPendingDelete}>
                    <X
                      size={20}
                      onClick={() =>
                        mutateDelete({
                          keywordId: latestVariables.variables?.id,
                        })
                      }
                    />
                  </Loader>
                </div>
              </div>
            )}
            <Input
              placeholder="Add Keyword | Press Enter to Add Keyword"
              value={keyword}
              className="p-0 bg-transparent ring-0 border-none outline-none"
              onChange={onValueChange}
              onKeyUp={keyPressAsEnter}
            />
          </div>
      }
    </div>
  );
};

export default Keywords;
