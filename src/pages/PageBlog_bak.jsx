import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Client } from "@notionhq/client";

const PageBlog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const notion = new Client({
        auth: process.env.REACT_APP_NOTION_TOKEN,
      });

      try {
        const response = await notion.pages.retrieve({
          page_id: process.env.REACT_APP_NOTION_PAGE_ID,
        });

        // console.log("Notion Response:", response);
        setPosts([response]);
      } catch (error) {
        console.error("Error fetching Notion page:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <BlogContainer>
      {posts.map((post) => (
        <BlogPost key={post.id}>
          <pre>{JSON.stringify(post, null, 2)}</pre>
        </BlogPost>
      ))}
    </BlogContainer>
  );
};

export default PageBlog;

const BlogContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const BlogPost = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
`;
