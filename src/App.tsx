import { Outlet } from 'react-router-dom';
import useLocalStorage from './utils/useLocalStorage';
import { NoteData, Tag } from './components/NewNote';
import { dummyNotes, dummyTags } from './data/dummyNotes';

export type AppOutletContext = {
  notesStored: NoteData[];
  setNotesStored: React.Dispatch<React.SetStateAction<NoteData[]>>;
  tagsStored: Tag[];
  setTagsStored: React.Dispatch<React.SetStateAction<Tag[]>>;
};

function App() {
  const [notesStored, setNotesStored] = useLocalStorage<NoteData[]>(
    'NOTES',
    dummyNotes
  );
  const [tagsStored, setTagsStored] = useLocalStorage<Tag[]>('TAGS', dummyTags);

  return (
    <>
      <Outlet
        context={{ notesStored, setNotesStored, tagsStored, setTagsStored }}
      />
    </>
  );
}

export default App;
