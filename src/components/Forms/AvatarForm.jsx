import React, { useState } from 'react'
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

const UpdateAvatarForm = ({ open, onClose, onUpdate }) => {
  const [avatarUrl, setAvatarUrl] = useState('')

  const handleInputChange = (e) => {
    setAvatarUrl(e.target.value)
  }

  const handleSubmit = () => {
    onUpdate(avatarUrl)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color={'secondary'}>Update Avatar</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Avatar URL'
          type='url'
          fullWidth
          value={avatarUrl}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={'secondary'}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color={'secondary'}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default UpdateAvatarForm
