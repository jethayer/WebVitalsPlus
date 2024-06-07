import React from 'react';
import {Typography} from "@mui/material";
import {tss} from "@/entrypoints/content/hooks/tss";

const useStyles = tss.create({
    text: {
        flex: 3
    },
});

export const NoData = () => {
    const {classes} = useStyles();

    return <Typography
        className={classes.text} variant="body1">
        No data collected
    </Typography>;
};
