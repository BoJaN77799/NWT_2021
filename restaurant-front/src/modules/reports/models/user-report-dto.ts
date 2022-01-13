export interface UserReportDTO {
    id: number;
    firstName : string;
    lastName : string;
    userType : string;
    ordersAccomplished: number;
    ordersPerMonth: Map<string, number>;
}