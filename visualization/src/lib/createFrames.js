export function createFrames(data) {
    const frames = [];
    const width = 10;
    const height = 10;
    const n = (31 + 28 + 31 + 30 + 31 + 30 + 1) * height;
    const beginDate = new Date("2022-01-01T00:00:00Z");

    for (let i = 0; i < n; i++) {
        const cells = new Array(height);
        for (let j = 0; j < height; j++) {
            cells[j] = new Array(width).fill(0);
        }
        frames[i] = {
            merged: 0,
            cells: cells
        }
    }

    for (const d of data) {
        const created = new Date(d.created_at);
        const merged = new Date(d.merged_at);

        const start = Math.floor((created.getTime() - beginDate.getTime()) / (1000 * 3600 * 24));
        const end = Math.floor((merged.getTime() - beginDate.getTime()) / (1000 * 3600 * 24));
        const days = end - start + 1;

        // We assume that a PR created on a certain day can appear at any time during that day.
        // This is to prevent the PRs clustering during working hours, making the squares distributied more evenly.
        const startPos = start * height + Math.floor(Math.random() * height);
        const col = Math.floor(Math.random() * width);

        for (let i = 0; i < days * height; i++) {
            const row = Math.floor(i / days);
            frames[startPos + i].cells[row][col]++;
        }
        frames[startPos + days * height - 1].merged++;
    }

    for (let i = 1; i < frames.length; i++) {
        frames[i].merged += frames[i - 1].merged;
    }

    return frames;
}