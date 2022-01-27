export interface TableWaiterDTO {
    id: number;
    x: number;
    y: number;
    floor: number;
    occupied: boolean;
    orderStatus: string;
    orderIsMine: boolean;
}