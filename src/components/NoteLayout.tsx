import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { AppOutletContext } from '../App';
import { NoteData, Tag } from './NewNote';
import { Container } from '@mui/material';

export type NoteLayoutOutletContext = {
  note: NoteData;
  tags: Tag[];
  notesStored: NoteData[];
  setNotesStored: React.Dispatch<React.SetStateAction<NoteData[]>>;
  tagsStored: Tag[];
  setTagsStored: React.Dispatch<React.SetStateAction<Tag[]>>;
};

function NoteLayout() {
  const { notesStored, setNotesStored, tagsStored, setTagsStored } =
    useOutletContext<AppOutletContext>();
  const { title } = useParams();
  const note = notesStored.filter((note) => note.title === title)[0];
  if (!note) return <Navigate to='/' />;
  const tags = tagsStored.filter((tag) => note.tagIds.includes(tag.id));
  return (
    <Container maxWidth='md'>
      <Outlet
        context={{
          note,
          tags,
          notesStored,
          setNotesStored,
          tagsStored,
          setTagsStored,
        }}
      />
    </Container>
  );
}

export default NoteLayout;
