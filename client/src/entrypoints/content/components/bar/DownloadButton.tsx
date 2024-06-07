import {Tooltip} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import React from "react";
import {useStatsData} from "@/entrypoints/content/hooks/useStatsData";
import {generateReport} from "@/utils/generateReport";
import {tss} from "@/entrypoints/content/hooks/tss";
import {useRoot} from "@/entrypoints/content/hooks/useRoot";
import {getCurrentUrl} from "@/entrypoints/content/utils/getCurrentUrl";

const useStyles = tss.create({
    download: {
        cursor: "pointer",
        color: "#CCC",
        fontSize: "20px",
        '&:hover': {
            color: "#000",
        }
    },
    popupRoot: {
        zIndex: '100001 !important',
    }
});

export const DownloadButton = () => {
    const {classes} = useStyles();
    const root = useRoot();
    const currentUrl = getCurrentUrl();
    const data = useStatsData();

    const handleDownload = () => {
        generateReport(data, currentUrl);
    }

    return (
        <Tooltip
            title="Download Data"
            arrow
            disableFocusListener
            disableTouchListener
            PopperProps={{
                container: root as HTMLElement,
            }}
        >
            <CloudDownloadIcon className={classes.download} onClick={handleDownload}/>
        </Tooltip>
    );

}
