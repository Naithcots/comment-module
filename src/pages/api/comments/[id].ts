import type { NextApiRequest, NextApiResponse } from "next";
import comments from "@/data/comments.json";
import type { IComment } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IComment | string>
) {
  const { query } = req;
  const { id } = query;
  const comment = comments.find((comment) => comment.id === Number(id));

  return comment
    ? res.status(200).json(comment)
    : res.status(503).send(`Comment with id: ${id} not found.`);
}
