import React, { useState, useRef } from 'react'
import { Box } from '@mui/material'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import hero1 from '../../assets/img/hero1.jpg'
import hero2 from '../../assets/img/hero2.jpg'

const HeroSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isSliding, setIsSliding] = useState(false)
  const sliderRef = useRef(null)

  const handleSlide = (e) => {
    if (!isSliding) return
    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const percentage = (offsetX / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleTouchSlide = (e) => {
    if (!isSliding) return
    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()
    const offsetX = e.touches[0].clientX - rect.left
    const percentage = (offsetX / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const startSlide = (e) => {
    e.preventDefault()
    setIsSliding(true)
  }

  const endSlide = () => {
    setIsSliding(false)
  }

  return (
    <Box
      ref={sliderRef}
      sx={{
        position: 'relative',
        width: '100vw',
        height: '70vh',
        overflow: 'hidden',
        userSelect: 'none',
      }}
      onMouseMove={handleSlide}
      onTouchMove={handleTouchSlide}
      onMouseUp={endSlide}
      onMouseLeave={endSlide}
      onTouchEnd={endSlide}
    >
      <Box
        component='img'
        src={hero1}
        alt='Hero 1'
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${sliderPosition}%`,
          height: '100%',
          objectFit: 'cover',
        }}
        onMouseDown={startSlide}
        onTouchStart={startSlide}
      />
      <Box
        component='img'
        src={hero2}
        alt='Hero 2'
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: `${100 - sliderPosition}%`,
          height: '100%',
          objectFit: 'cover',
          cursor: 'col-resize',
        }}
        onMouseDown={startSlide}
        onTouchStart={startSlide}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          width: '2px',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          cursor: 'col-resize',
        }}
        onMouseDown={startSlide}
        onTouchStart={startSlide}
      />
    </Box>
  )
}

export default HeroSlider
