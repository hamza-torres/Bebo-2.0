import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../../store/posts/posts.selector";
import PostWidget from "./PostWidget";
import { getAllPosts, getUserPosts } from "../../utils/firebase";

const UserPostsWidget = ({ user }) => {
  const [posts, setPosts] = useState([]);

  const retrievePosts = async () => {
    getUserPosts(user).then((data) => {
      setPosts(data);
    });
  };

  useEffect(() => {
    retrievePosts();
  }, []);

  return (
    <>
      {posts
        ? posts.map((post) => <PostWidget key={post.postId} post={post} />)
        : null}
    </>
  );
};

export default UserPostsWidget;
