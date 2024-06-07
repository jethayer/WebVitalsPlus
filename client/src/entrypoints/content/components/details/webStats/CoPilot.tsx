import React, { useState, useEffect } from 'react';
import {Box, Typography, useTheme} from "@mui/material";
import {AbstractWebMetric} from "@/entrypoints/content/utils/models/AbstractWebMetric";
import { RouteKey } from '@/constants/routeKey';

type Props = {
    activeRoute: RouteKey;
    metric: AbstractWebMetric;
};

export const CoPilot = ({metric}: Props) => {
    const theme = useTheme();

    const [error, setError] = useState(false);

    const placeholderText = error ? "Error fetching suggestions." : "Available suggestions here.";
    const coPilotSuggestion = metric.coPilotSuggestion || placeholderText;

    useEffect(() => {
        if (metric.coPilotSuggestion === null) {
            setError(true);
        }
    }, [metric.coPilotSuggestion]);

    return <Box sx={{overflow: 'auto', maxHeight: 300, mt: 2, p: 2, border: '3px solid', borderColor: theme.tertiaryColor, borderRadius: '4px'}}>
        <Typography variant="body1" style={{whiteSpace: 'pre-wrap', color: theme.color }}>
            {coPilotSuggestion}
        </Typography>
    </Box>;
};