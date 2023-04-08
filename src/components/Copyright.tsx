import { Link, Typography } from "@mui/material";

export const Copyright= (props)=> {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props} >
        {'Copyright © '}
        <Link color="inherit">
          KvizzHub
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }