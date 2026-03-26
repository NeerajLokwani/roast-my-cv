
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
                    const items = Array.from(textItems.items as ArrayLike<unknown>);

                    items.forEach((item) => {
                        const text = (item as { str?: unknown })?.str;

                        if (typeof text === 'string') {
                            textContent += text + ' ';
                        }
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