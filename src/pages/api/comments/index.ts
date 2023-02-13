import type { NextApiRequest, NextApiResponse } from "next";
import comments from "@/data/comments.json";
import type { IComment } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IComment[]>
) {
  res.status(200).json(comments);
}
