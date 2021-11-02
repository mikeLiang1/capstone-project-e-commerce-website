import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function ExplorePage({ match }) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });
  const tag = match.params.tag;
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  async function getItems() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(`/explore/${tag}`, requestOptions);
    if (res.status !== 200) {
      setOpen(true);
    } else if (res.status === 200) {
      const data = await res.json();
      console.log(data);
    }
  }

  useEffect(() => {
    getItems();
  }, [tag]);

  return (
    <div>
      explore
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            Failed to fetch items!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default ExplorePage;
