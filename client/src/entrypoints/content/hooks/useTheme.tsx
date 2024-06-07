import React, {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles';
import {createTheme} from "@mui/material";
import {useTheme as MuiUseTheme} from "@mui/material";


const darkModeTheme = createTheme({
    backgroundColor: 'black',
    color: 'white',
    tertiaryColor: 'white'
});

const lightModeTheme = createTheme({
    backgroundColor: 'white',
    color: 'black',
    tertiaryColor: 'GhostWhite'
});

export const ThemeProvider = ({children}: PropsWithChildren<unknown>) => {
    const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

    const eventListener = useCallback((e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches)
    }, []);

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', eventListener);
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', eventListener);
        }
    }, []);

    return <MuiThemeProvider theme={isDarkMode ? darkModeTheme : lightModeTheme}>
        {children}
    </MuiThemeProvider>

}

export const useTheme = MuiUseTheme;
