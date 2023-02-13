import Comments from "@/components/Comments";
import { IPost } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const { data } = useQuery<IPost[]>(["posts"], async () => {
    const response = await axios.get("/api/posts");
    return response.data;
  });

  return (
    <>
      <Head>
        <title>Comment Module</title>
      </Head>
      <main className="grid min-h-screen place-items-center">
        <div className="flex flex-col gap-5 p-4">
          {data &&
            data.map(
              (post) =>
                post.comments && <Comments data={post.comments} key={post.id} />
            )}
        </div>
      </main>
    </>
  );
};
export default Home;
