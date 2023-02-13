import { IComment } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { FC } from "react";

const commentVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const Comment: FC<{ id: number }> = ({ id }) => {
  const { data } = useQuery<IComment>(["comment", id], async () => {
    const response = await axios.get(`/api/comments/${id}`);
    return response.data;
  });

  return (
    <AnimatePresence mode="wait">
      {data ? (
        <motion.div
          key={0}
          className="relative grid max-w-[75ch] grid-cols-[auto_1fr] gap-3 overflow-hidden after:absolute after:top-[50px] after:left-[18px] after:h-full after:w-[2px] after:bg-gray-300 after:content-[''] sm:gap-6 after:sm:top-[72px] after:sm:left-[28px]"
          variants={commentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Image
            src={data.author.avatarUrl}
            alt={""}
            width={60}
            height={60}
            className="aspect-square w-10 sm:w-[60px]"
          />
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <div className="flex gap-3">
                <button className="font-semibold hover:underline">
                  {data.author.nickname}
                </button>
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-gray-500">
                  {data.created}
                </p>
              </div>
              <p>{data.content}</p>
              <div className="mt-2 flex gap-5">
                <div className="flex gap-2">
                  <Image
                    src="/Up.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="h-auto w-auto cursor-pointer"
                  />
                  <span className="font-bold">{data.votes}</span>
                  <Image
                    src="/Down.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="h-auto w-auto cursor-pointer"
                  />
                </div>
                <button>Reply</button>
                <button>Report</button>
              </div>
            </div>
            {data.replies &&
              data.replies.map((replyId) => (
                <Comment id={replyId} key={replyId} />
              ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={1}
          className="relative grid animate-pulse grid-cols-[auto_1fr] gap-6 overflow-hidden after:absolute after:top-[72px] after:left-7 after:h-full after:w-[2px] after:bg-gray-300 after:content-['']"
          variants={commentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="h-[60px] w-[60px] rounded-full bg-gray-200" />
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="h-[16px] min-w-[120px] max-w-[200px] rounded-2xl bg-gray-200" />
              <div className="h-[16px] min-w-[40ch] rounded-2xl bg-gray-200" />
              <div className="h-[16px] min-w-[40ch] rounded-2xl bg-gray-200" />
              <div className="mt-2 flex gap-5">
                <div className="h-[16px] min-w-[150px] rounded-2xl bg-gray-200" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Comment;
