export type WasteCategory = "ORGANIK" | "ANORGANIK" | "B3";

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
        category: "ORGANIK",
        defaultImage: "/images/section/games/bin/default/organik-closed.svg",
        openImage: "/images/section/games/bin/open/organik-open.svg",
        offImage: "/images/section/games/bin/unavailable/bw-organik.svg",
    },
    {
        category: "ANORGANIK",
        defaultImage: "/images/section/games/bin/default/anorganik-closed.svg",
        openImage: "/images/section/games/bin/open/anorganik-open.svg",
        offImage: "/images/section/games/bin/unavailable/bw-anorganik.svg",
    },
    {
        category: "B3",
        defaultImage: "/images/section/games/bin/default/b3-closed.svg",
        openImage: "/images/section/games/bin/open/b3-open.svg",
        offImage: "/images/section/games/bin/unavailable/bw-b3.svg",
    },
];

export const wasteItems: WasteItem[] = [
    // Organik
    {
        id: "apel",
        name: "Sisa Apel",
        category: "ORGANIK",
        image: "/images/section/games/items/organik/apel.svg",
        tooltip: "Sisa buah",
    },
    {
        id: "daun-kering",
        name: "Daun Kering",
        category: "ORGANIK",
        image: "/images/section/games/items/organik/daun-kering.svg",
        tooltip: "Daun kering",
    },
    {
        id: "kulit-pisang",
        name: "Kulit Pisang",
        category: "ORGANIK",
        image: "/images/section/games/items/organik/kulit-pisang.svg",
        tooltip: "Kulit buah",
    },
    {
        id: "roti",
        name: "Sisa Roti",
        category: "ORGANIK",
        image: "/images/section/games/items/organik/roti.svg",
        tooltip: "Sisa roti",
    },
    // Anorganik
    {
        id: "botol",
        name: "Botol Plastik",
        category: "ANORGANIK",
        image: "/images/section/games/items/anorganik/botol.svg",
        tooltip: "Botol plastik",
    },
    {
        id: "kaleng",
        name: "Kaleng Minuman",
        category: "ANORGANIK",
        image: "/images/section/games/items/anorganik/kaleng.svg",
        tooltip: "Kaleng minuman",
    },
    {
        id: "cup-plastik",
        name: "Cup Plastik",
        category: "ANORGANIK",
        image: "/images/section/games/items/anorganik/cup-plastik.svg",
        tooltip: "Cup plastik",
    },
    {
        id: "plastik-kemasan",
        name: "Plastik Kemasan",
        category: "ANORGANIK",
        image: "/images/section/games/items/anorganik/plastik-kemasan.svg",
        tooltip: "Plastik kemasan",
    },
    {
        id: "kantong-plastik",
        name: "Kantong Plastik",
        category: "ANORGANIK",
        image: "/images/section/games/items/anorganik/kantong-plastik.svg",
        tooltip: "Kantong plastik",
    },
    // B3
    {
        id: "baterai",
        name: "Baterai Bekas",
        category: "B3",
        image: "/images/section/games/items/b3/baterai.svg",
        tooltip: "Baterai bekas",
    },
    {
        id: "aki",
        name: "Aki Bekas",
        category: "B3",
        image: "/images/section/games/items/b3/aki.svg",
        tooltip: "Aki bekas",
    },
    {
        id: "obat-kedaluwarsa",
        name: "Obat Kedaluwarsa",
        category: "B3",
        image: "/images/section/games/items/b3/obat.svg",
        tooltip: "Obat kedaluwarsa",
    },
    {
        id: "pestisida",
        name: "Pestisida",
        category: "B3",
        image: "/images/section/games/items/b3/pestisida.svg",
        tooltip: "Pestisida",
    },
];
