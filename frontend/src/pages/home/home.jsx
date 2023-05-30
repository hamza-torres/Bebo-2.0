import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../navbar/navbar'
import UserWidget from '../widgets/UserWidget'
import PostWidget from '../widgets/PostWidget'
import PostsWidget from '../widgets/PostsWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import FriendListWidget from '../widgets/FriendListWidget'
import AdvertWidget from '../widgets/AdvertWidget'
import Friend from '../../components/Friend'

const Home = () => {
  return (
    <Box>
      <Navbar />
      <UserWidget />
      <PostWidget />
      <PostsWidget />
      <MyPostWidget />
      <FriendListWidget />
      <AdvertWidget />
      <Friend />
    </Box>
  )
}

export default Home