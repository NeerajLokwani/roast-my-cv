
export const ParsePdf = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            const arrayBuffer = event.target?.result as ArrayBuffer;
            try {
                const pdfjsLib = await import('pdfjs-dist');
                pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
                    'pdfjs-dist/build/pdf.worker.min.mjs',
                    import.meta.url
                ).toString();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let textContent = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textItems = await page.getTextContent();
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    textItems.items.forEach((item: any) => {
                        textContent += item.str + ' ';
                    });
                }
                resolve(textContent.trim());
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};