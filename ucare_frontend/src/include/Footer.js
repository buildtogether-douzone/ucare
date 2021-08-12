import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

export default function Footer(){
    return(
        <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="/">
                    Build Together
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
      </Box>
    );
}