import { readFileSync } from 'fs';
import { performance } from 'perf_hooks';
import type { Hierarchy } from '../interface/hierarchy.interface';


export function loadHierarchy(filePath: string): { hierarchy: Hierarchy, loadTime: number } {
    const startLoad = performance.now();
    const data = readFileSync(filePath, 'utf-8');
    const hierarchy: Hierarchy = JSON.parse(data);
    const loadTime = performance.now() - startLoad;
    return { hierarchy, loadTime };
}
// developed with 💻 by Luis
