export type WasteCategory = 'ORGANIK' | 'ANORGANIK' | 'B3';

export interface WasteItem {
    id: string;
    name: string;
    category: WasteCategory;
    image: string;
    tooltip: string;
}

export interface TrashBinData {
    category: WasteCategory;
    defaultImage: string;
    openImage: string;
    offImage: string;
}

export const trashBins: TrashBinData[] = [
    {
        category: 'ORGANIK',
        defaultImage: '/images/section/games/bin/default/organik-closed.svg',
        openImage: '/images/section/games/bin/open/organik-open.svg',
        offImage: '/images/section/games/bin/unavailable/bw-organik.svg',
    },
    {
        category: 'ANORGANIK',
        defaultImage: '/images/section/games/bin/default/anorganik-closed.svg',
        openImage: '/images/section/games/bin/open/anorganik-open.svg',
        offImage: '/images/section/games/bin/unavailable/bw-anorganik.svg',
    },
    {
        category: 'B3',
        defaultImage: '/images/section/games/bin/default/b3-closed.svg',
        openImage: '/images/section/games/bin/open/b3-open.svg',
        offImage: '/images/section/games/bin/unavailable/bw-b3.svg',
    }
];

export const wasteItems: WasteItem[] = [
    {
        id: 'apel',
        name: 'Sisa Apel',
        category: 'ORGANIK',
        image: '/images/section/games/items/apel.svg',
        tooltip: 'Sisa Makanan',
    },
    {
        id: 'botol',
        name: 'Botol Plastik',
        category: 'ANORGANIK',
        image: '/images/section/games/items/botol.svg',
        tooltip: 'Sampah Plastik',
    },
    {
        id: 'baterai',
        name: 'Baterai Bekas',
        category: 'B3',
        image: '/images/section/games/items/baterai.svg',
        tooltip: 'E-Waste / B3',
    }
];
