import { Section, Marker } from './vnode';
export declare class FragmentSection implements Section {
    document: Document;
    start: Node;
    end: Node;
    node: Node;
    constructor(document: Document, start?: Node, end?: Node);
    appendChild(node: Node): void;
    render(): Node;
    remove(): this;
    removeChildNodes(): DocumentFragment;
    createMarker(): FragmentSectionMarker;
    clone(): FragmentSection;
    _getChildNodes(): Node[];
}
export declare class FragmentSectionMarker implements Marker {
    document: Document;
    startPath: string[];
    endPath: string[];
    constructor(document: Document, startPath: string[], endPath: string[]);
    createSection(root: Node): FragmentSection;
}
