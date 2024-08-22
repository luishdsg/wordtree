import { readFileSync } from 'fs';
import { performance } from 'perf_hooks';

interface Hierarchy {
    [key: string]: Hierarchy | string[];
}

export function loadHierarchy(filePath: string): { hierarchy: Hierarchy, loadTime: number } {
    const startLoad = performance.now();
    const data = readFileSync(filePath, 'utf-8');
    const hierarchy: Hierarchy = JSON.parse(data);
    const loadTime = performance.now() - startLoad;
    return { hierarchy, loadTime };
}
