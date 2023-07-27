import { Stack, Typography } from '@mui/material';
import NoteForm from './NoteForm';
import { useOutletContext } from 'react-router-dom';
import { NoteLayoutOutletContext } from './NoteLayout';

function EditNote() {
  const { note, tags, notesStored, setNotesStored, tagsStored, setTagsStored } = useOutletContext<NoteLayoutOutletContext>();
  
  return (
      <Stack spacing={2} mt={4}>
        <Typography variant='h4'>
          Edit Note
        </Typography>
        <NoteForm
          notesStored={notesStored}
          setNotesStored={setNotesStored}
          tagsStored={tagsStored}
          setTagsStored={setTagsStored}
          note={note}
          tags={tags}
        />
      </Stack>
  );
}

export default EditNote;
