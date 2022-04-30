import React from 'react';
import { Typography } from '@mui/material';

function PageHeader(props) {
    return (
        <Typography variant="h2" component="h2">
            {props.message}
        </Typography>
    );
}

export default PageHeader;