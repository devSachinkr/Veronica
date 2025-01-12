import {
  useAutomationPosts,
  useAutomationPostsInfo,
} from "@/hooks/automations";
import { INSTAGRAM_POST_TYPE } from "@/lib/types/post";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import GradientButton from "../../gradient-button";
import GradientText from "../../gradient-text";
import { Loader } from "../../loader";
import TriggerButton from "../trigger-button";

type Props = {
  id: string;
};

const PostButton = ({ id }: Props) => {
  const { automations: automationPost, isFetching } = useAutomationPosts();
  const { isPending, mutate, posts, selectPost } = useAutomationPostsInfo({
    id,
  });

  return (
    <TriggerButton label="Attach Post">
      {automationPost?.status === 200 ? (
        <div className="flex flex-col gap-y-3 w-full">
          <div className="flex flex-wrap w-full gap-3">
            {automationPost.data.data.map((p: INSTAGRAM_POST_TYPE) => (
              <div
                key={p.id}
                className="relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden"
                onClick={() =>
                  selectPost({
                    postId: p.id,
                    caption: p.caption,
                    media: p.media_url,
                    mediaType: p.media_type,
                  })
                }
              >
                {posts.find((i) => i.postId === p.id) && (
                  <CircleCheck className="absolute top-0 right-0 text-green-500" />
                )}
                <Image
                  fill
                  sizes="100vw"
                  src={p.media_url}
                  alt="post-image"
                  className={cn(
                    "hover:opacity-75 transition duration-100",
                    posts.find((i) => i.postId === p.id) && "opacity-75"
                  )}
                />
              </div>
            ))}
          </div>
          <GradientButton
            element="div"
            textClassName="flex items-center"
            buttonProps={{
              disabled: isPending || isFetching || !posts.length,
              onClick: () => mutate({}),
            }}
          >
            <Loader loading={isPending}>Attach Post</Loader>
          </GradientButton>
        </div>
      ) : (
        <GradientText>No Posts Found</GradientText>
      )}
    </TriggerButton>
  );
};

export default PostButton;
