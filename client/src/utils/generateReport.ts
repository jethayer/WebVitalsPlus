import {Metrics} from "@/types/Metrics";


export async function generateReport(data: Metrics[], hostname: string) {
    // Convert data to JSON string with indentation
    const jsonData = JSON.stringify(data, null, 2);
    // Create a Blob with the JSON data
    const blob = new Blob([jsonData], {type: 'application/json'});
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create a link element
    const link = document.createElement('a');
    // Set url of report to the link
    link.href = url;
    link.download = `${hostname}-MetricReport.json`; // Default file name
    link.click();
    document.removeChild(link);
}
