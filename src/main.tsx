import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import NewNote from './components/NewNote';
import NoteLayout from './components/NoteLayout';
import Note from './components/Note';
import App from './App';
import EditNote from './components/EditNote';
import NoteList from './components/NoteList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <NoteList /> },
      { path: 'new', element: <NewNote /> },
      {
        path: ':title',
        element: <NoteLayout />,
        children: [
          { index: true, element: <Note /> },
          { path: 'edit', element: <EditNote /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to='/' /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
