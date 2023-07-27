import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import CreateableReactSelect from 'react-select/creatable';
import { Button, FormLabel, Grid, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { NoteData, Tag } from './NewNote';
import { v4 as uuidV4 } from 'uuid';

type NoteFormProps = {
  notesStored: NoteData[];
  setNotesStored: React.Dispatch<React.SetStateAction<NoteData[]>>;
  tagsStored: Tag[];
  setTagsStored: React.Dispatch<React.SetStateAction<Tag[]>>;
  note?: NoteData; // if note is passed in, it means we are editing an existing note
  tags?: Tag[];
};

function NoteForm({
  notesStored,
  setNotesStored,
  tagsStored,
  setTagsStored,
  note,
  tags = [],
}: NoteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteData>();

  const navigate = useNavigate();

  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);;

  const [errorMessage, setErrorMessage] = useState('');

  function onSubmit(data: NoteData) {
    let { title, body } = data;
    title = title.trim();
    if (title.length == 0) {
      setErrorMessage('Title is required');
      return;
    }

    if (note) {
      if (
        note.title != title &&
        notesStored.map((stored) => stored.title).includes(title)
      ) {
        alert('Title already exists');
        return;
      }
      const noteIndex = notesStored.findIndex(
        (stored) => stored.title === note.title
      );
      notesStored[noteIndex] = {
        title,
        body,
        tagIds: selectedTags.map((tag) => tag.id),
      };
      setNotesStored([...notesStored]);
      navigate('/');
      return;
    }

    if (notesStored.map((stored) => stored.title).includes(title)) {
      alert('Title already exists');
      return;
    }

    const tagIds = selectedTags.map((tag) => tag.id);
    const noteData = { title, body, tagIds };
    setNotesStored([...notesStored, noteData]);
    navigate('/');
  }

  return (
    <form action='' onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={6}>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <TextField
            id='title'
            defaultValue={note?.title}
            label=''
            variant='outlined'
            {...register('title', {
              required: { value: true, message: 'Title is required' },
            })}
            error={!!errors.title || !!errorMessage}
            helperText={(errors.title?.message as ReactNode) || errorMessage}
            inputProps={{
              sx: { height: '5px' },
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={8} sm={6}>
          <FormLabel>Tags</FormLabel>
          <CreateableReactSelect
            isMulti
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              setSelectedTags((prev) => [...prev, newTag]);
              setTagsStored((prev) => [...prev, newTag]);
            }}
            options={tagsStored.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
            value={selectedTags.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
            onChange={(
              // remove/add
              options
            ) =>
              setSelectedTags(
                options.map((option) => ({
                  label: option.label,
                  id: option.value,
                }))
              )
            }
            defaultValue={tags.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel htmlFor='body'>Body</FormLabel>
          <TextField
            id='body'
            defaultValue={note?.body}
            label=''
            variant='outlined'
            rows={8}
            fullWidth
            multiline
            {...register('body')}
          />
        </Grid>
        <Grid item container spacing={2} justifyContent='flex-end'>
          <Grid item>
            <Button type='submit' variant='contained' color='primary' disableElevation>
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Link to='..'>
              <Button variant='outlined' color='warning'>
                Cancel
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default NoteForm;
