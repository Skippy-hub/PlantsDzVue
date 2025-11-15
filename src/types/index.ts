export interface CardType {
    id: number;
    image: string;
    title: string;
    price: string;
    size?: string;
    category?: string;
    count: number;
    total: number;
}