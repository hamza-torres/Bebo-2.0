import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../../store/posts/posts.selector";
import PostWidget from "./PostWidget";
import { getAllPosts, getUserPosts } from "../../utils/firebase";

const PostsWidget = ({ user, isProfile = false }) => {
  const [posts, setPosts] = useState([]);
  const userPosts = useSelector(selectPosts);

  const retrievePosts = async () => {
    if (isProfile) {
      getUserPosts(user).then((data) => {
        setPosts(data);
      });
    } else {
      getAllPosts().then((data) => {
        setPosts(data);
      });
    }
  };

  useEffect(() => {
    retrievePosts();
  }, [userPosts]);

  return (
    <>
      {posts.map((post) => (
        <PostWidget key={post.postId} post={post} />
      ))}
    </>
  );
};

export default PostsWidget;
