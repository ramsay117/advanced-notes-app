import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import { Tag } from './NewNote';

type EditTagsModalProps = {
  tagsStored: Tag[];
  setTagsStored: React.Dispatch<React.SetStateAction<Tag[]>>;
  show: boolean;
  handleClose: () => void;
};

function EditTagsModal({
  tagsStored,
  setTagsStored,
  show,
  handleClose,
}: EditTagsModalProps) {
  function updateTag(id: string, label: string) {
    setTagsStored((prev) =>
      prev.map((tag) => (tag.id === id ? { ...tag, label } : tag))
    );
  }

  function deleteTag(id: string) {
    if (tagsStored.length == 1) handleClose();
    setTagsStored((prev) => prev.filter((tag) => tag.id !== id));
  }
  
  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Edit Tags</DialogTitle>
      <DialogContent>
        {tagsStored.length === 0 ? (
          <DialogContentText>No tags to edit</DialogContentText>
        ) : (
          <Stack spacing={2}>
            {tagsStored.map((tag) => {
              return (
                <Stack spacing={2} direction='row' key={tag.id}>
                  <TextField
                    defaultValue={tag.label}
                    variant='filled'
                    spellCheck='false'
                    inputProps={{
                      sx: { p: 1 },
                    }}
                    InputProps={{ disableUnderline: true }}
                    onChange={(e) => updateTag(tag.id, e.target.value)}
                  />
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => deleteTag(tag.id)}
                    >
                      &times;
                    </Button>
                </Stack>
              );
            })}
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='primary'
          disableElevation
          size='small'
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTagsModal;
