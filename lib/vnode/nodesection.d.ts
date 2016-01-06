import { Section, Marker } from './vnode';
export declare class NodeSection implements Section {
    document: Document;
    node: Node;
    constructor(document: Document, node: Node);
    createMarker(): NodeSectionMarker;
    appendChild(node: Node): void;
    render(): Node;
    remove(): void;
    removeChildren(): void;
    clone(): NodeSection;
}
export declare class NodeSectionMarker implements Marker {
    document: Document;
    path: string[];
    constructor(document: Document, path: string[]);
    createSection(root: Node): NodeSection;
    findNode(root: any): Node;
}
