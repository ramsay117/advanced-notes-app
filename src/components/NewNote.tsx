import { Container, Stack, Typography } from '@mui/material';
import NoteForm from './NoteForm';
import { useOutletContext } from 'react-router-dom';
import { AppOutletContext } from '../App';

export type NoteData = {
  title: string;
  body: string;
  tagIds: string[] // if tag label change, n.n to update note as long as Id remains the same
}
export type Tag = { 
  id: string;
  label: string;
}

function NewNote() {
  const { notesStored, setNotesStored, tagsStored, setTagsStored } =
    useOutletContext<AppOutletContext>();
  return (
    <>
      <Container maxWidth='md'>
        <Stack spacing={2} mt={4}>
          <Typography variant='h4'>
            New Note
          </Typography>
          <NoteForm
            notesStored={notesStored}
            setNotesStored={setNotesStored}
            tagsStored={tagsStored}
            setTagsStored={setTagsStored}
          />
        </Stack>
      </Container>
    </>
  );
}

export default NewNote;
