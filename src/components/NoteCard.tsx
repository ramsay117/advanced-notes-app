import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Tag } from './NewNote';

type NoteCardProps = {
  title: string;
  tagIds: string[];
  tagsStored: Tag[];
};
function NoteCard({ title, tagIds, tagsStored }: NoteCardProps) {
  const tagLabels = tagsStored
    .filter((tag) => tagIds.includes(tag.id))
    .map((tag) => tag.label);

  return (
    <Link component={ReactRouterLink} to={`/${title}`} underline='none'>
      <Card variant='outlined'>
        <CardContent>
          <Grid container spacing={2} direction='column' alignItems='center'>
            <Grid item>
              <Typography variant='h6'>{title}</Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent='center'
              spacing={1}
              wrap='wrap'
            >
              {tagLabels.map((label) => (
                <Grid item key={label}>
                  <Chip
                    label={label}
                    size='small'
                    sx={{ bgcolor: 'primary.light', color: 'white' }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}

export default NoteCard;
