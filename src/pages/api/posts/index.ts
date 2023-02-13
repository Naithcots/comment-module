import type { NextApiRequest, NextApiResponse } from "next";
import posts from "@/data/posts.json";
import { IPost } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPost[]>
) {
  res.status(200).json(posts);
}
