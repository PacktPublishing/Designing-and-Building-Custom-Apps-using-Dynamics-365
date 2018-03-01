interface AfterMoveEventArgs<T1, T2> {
    item: T1;
    cancelDrop: boolean;
    sourceIndex: number;
    targetIndex: number;
    targetParent: T2;
}