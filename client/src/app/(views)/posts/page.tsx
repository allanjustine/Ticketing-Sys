"use client";

import withAuthPage from "@/lib/hoc/with-auth-page";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import ButtonLoader from "@/components/ui/button-loader";
import { useFetchCursor } from "@/hooks/use-fetch-cursor";
import { CreatePost } from "../profile/_components/post-dialogs/create-post";
import PostLoader from "../profile/_components/post-loader";
import PostList from "../profile/_components/post-list";

function Posts() {
  const {
    data: posts,
    isLoading,
    cursor,
    fetchData,
    handleCursor,
    scrollToTopRef,
  } = useFetchCursor({ url: "/posts" });

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:col-span-2 w-full space-y-3" ref={scrollToTopRef}>
          <CreatePost fetchData={fetchData} />
          {cursor?.prev_cursor && (
            <div className="flex justify-center">
              <ButtonLoader
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleCursor("prev")}
                isLoading={isLoading}
              >
                Load new post
              </ButtonLoader>
            </div>
          )}
          {isLoading ? (
            <PostLoader />
          ) : posts?.length > 0 ? (
            posts.map((post: any, index: number) => (
              <PostList key={index} post={post} fetchData={fetchData} />
            ))
          ) : (
            <p className="dark:text-white text-gray-500 w-full text-center text-xl font-bold mt-10">
              No posts yet
            </p>
          )}
          <div className="flex justify-center">
            {cursor?.next_cursor ? (
              <ButtonLoader
                isLoading={isLoading}
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleCursor("next")}
              >
                Load more post
              </ButtonLoader>
            ) : (
              <span className="dark:text-white text-gray-400">
                All posts loaded
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthPage(Posts);
