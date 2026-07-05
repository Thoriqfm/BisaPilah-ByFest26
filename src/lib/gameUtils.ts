/**
 * Shuffles an array in place.
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * Check if the center of a draggable element is inside the bounds of a target element.
 */
export function isColliding(draggableElement: HTMLElement, targetElement: HTMLElement): boolean {
    const dragRect = draggableElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    const dragCenterX = dragRect.left + dragRect.width / 2;
    const dragCenterY = dragRect.top + dragRect.height / 2;

    return (
        dragCenterX >= targetRect.left &&
        dragCenterX <= targetRect.right &&
        dragCenterY >= targetRect.top &&
        dragCenterY <= targetRect.bottom
    );
}
