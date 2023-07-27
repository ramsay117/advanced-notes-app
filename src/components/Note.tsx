import { useNavigate, useOutletContext } from 'react-router-dom';
import { NoteLayoutOutletContext } from './NoteLayout';
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link as ReactRouterLink } from 'react-router-dom';

function Note() {
  const { note, tags, setNotesStored } =
    useOutletContext<NoteLayoutOutletContext>();

  function handleDelete() {
    setNotesStored((prev) =>
      prev.filter((stored) => stored.title != note.title)
    );
  }

  const navigate = useNavigate();

  return (
    <Stack spacing={4} mt={4}>
      <Grid container justifyContent='space-between'>
        <Grid
          item
          xs='auto'
          container
          maxWidth='70%'
          spacing={1}
          direction='column'
        >
          <Grid item>
            <Typography variant='h4'>{note.title}</Typography>
          </Grid>
          <Grid item container spacing={1} wrap='wrap'>
            {tags.map((tag) => (
              <Grid item key={tag.id}>
                <Chip
                  label={tag.label}
                  size='small'
                  sx={{ bgcolor: 'primary.light', color: 'white' }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={3}
          sm='auto'
          container
          spacing={1}
          alignItems='center'
          justifyContent='flex-end'
        >
          <Grid item>
            <Link component={ReactRouterLink} to='edit'>
              <Button variant='contained' disableElevation>
                Edit
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button variant='outlined' color='error' onClick={handleDelete}>
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='outlined'
              color='info'
              onClick={() => navigate('..')}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Box>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.body}</ReactMarkdown>
      </Box>
    </Stack>
  );
}

export default Note;
