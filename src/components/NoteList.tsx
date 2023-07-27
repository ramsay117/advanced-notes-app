import { useMemo, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useOutletContext } from 'react-router-dom';
import Select from 'react-select';
import { Tag } from './NewNote';
import NoteCard from './NoteCard';
import EditTagsModal from './EditTagsModal';
import { AppOutletContext } from '../App';

function NoteList() {
  const { notesStored, tagsStored, setTagsStored } =
    useOutletContext<AppOutletContext>();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState('');

  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notesStored.filter(
      (note) =>
        note.title.toLowerCase().includes(title.toLowerCase()) &&
        selectedTags
          .map((tag) => tag.id)
          .every((id) => note.tagIds.includes(id))
    );
  }, [title, selectedTags]);

  return (
    <Container maxWidth='md'>
      <Stack spacing={2} mt={4}>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Typography variant='h4'>Notes</Typography>
          </Grid>
          <Grid item>
            <Stack direction='row' spacing={2}>
              <Link to='/new'>
                <Button variant='contained' color='primary' disableElevation>
                  Create
                </Button>
              </Link>
              <Button
                variant='outlined'
                color='warning'
                onClick={() => {
                  setEditTagsModalIsOpen(true);
                }}
              >
                Edit Tags
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid container justifyContent='space-between'>
          <Grid item xs={5}>
            <InputLabel htmlFor='title'>Search</InputLabel>
            <TextField
              id='title'
              label=''
              inputProps={{
                sx: { height: '5px' },
              }}
              sx={{ width: '100%' }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <InputLabel>Tags</InputLabel>
            <Select // same as CreateableReactSelect except NO onCreateOption
              isMulti
              options={tagsStored.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              value={selectedTags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              onChange={(options) => {
                setSelectedTags(
                  options.map((option) => ({
                    label: option.label,
                    id: option.value,
                  }))
                );
              }}
            ></Select>
          </Grid>
        </Grid>
        <Grid container justifyContent='center'>
          {filteredNotes.map((note) => {
            return (
              <Grid item xs={10} sm={6} md={5} key={note.title} mr={3} mt={2}>
                <NoteCard
                  title={note.title}
                  tagIds={note.tagIds}
                  tagsStored={tagsStored}
                />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
      <EditTagsModal
        tagsStored={tagsStored}
        setTagsStored={setTagsStored}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
      />
    </Container>
  );
}

export default NoteList;
