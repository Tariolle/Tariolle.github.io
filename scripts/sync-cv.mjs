import { mkdir, writeFile } from "node:fs/promises";

const source = "https://raw.githubusercontent.com/Tariolle/curriculum-vitae/refs/heads/master/main.pdf";
const outputDirectory = new URL("../public/", import.meta.url);
const output = new URL("cv.pdf", outputDirectory);

const response = await fetch(source);

if (!response.ok) {
  throw new Error(`Unable to fetch CV: ${response.status} ${response.statusText}`);
}

const pdf = new Uint8Array(await response.arrayBuffer());
const signature = new TextDecoder().decode(pdf.subarray(0, 5));

if (signature !== "%PDF-") {
  throw new Error("Downloaded CV is not a valid PDF.");
}

await mkdir(outputDirectory, { recursive: true });
await writeFile(output, pdf);

console.log(`Synchronized CV (${pdf.byteLength} bytes).`);
