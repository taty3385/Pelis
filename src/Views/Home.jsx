import React from 'react'
import CarrucelPlay from '../Components/CarrucelPlay'
import CarrucelMovie from '../Components/CarrucelMovie'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <Box>
    <CarrucelPlay/>
    <CarrucelMovie category="popular" title="Los mas visto"/>
    <CarrucelMovie category="top_rated"  title="Los top 10 "/>
    </Box>
  )
}
