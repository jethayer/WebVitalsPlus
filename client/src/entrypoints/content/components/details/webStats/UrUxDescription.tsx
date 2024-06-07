import React from 'react';
import {Box, Typography, useTheme} from "@mui/material";
import {AbstractWebMetric} from "@/entrypoints/content/utils/models/AbstractWebMetric";
import {tss} from "@/entrypoints/content/hooks/tss";
import {RouteKey} from "@/constants/routeKey";

const useStyles = tss.create({
    text: {
        flex: 3
    },
});

type Props = {
    activeRoute: RouteKey;
    metric: AbstractWebMetric;
};

export const UrUxDescription = ({metric, activeRoute}: Props) => {
    const {classes} = useStyles();
    const theme = useTheme();

    return <Box sx={{overflow: 'auto', maxHeight: 300, mt: 2, p: 2, border: '3px solid', borderColor: theme.tertiaryColor, borderRadius: '4px'}}>
        <Typography
            className={classes.text} variant="body1" style={{ color: theme.color }}>
            Your local {activeRoute} experience is{' '}
            {metric.buildDisplayValue(metric.value)} and
            rated {metric.rating}.{' '}
            {metric.getCrUxPercent().toFixed(2)}% of real user desktop {activeRoute}{' '}
            experiences on this origin were also rated {metric.rating}.
        </Typography>
    </Box>;
};
