export interface ITicket {
    id: number;
    from: string;
    to: string;
    company: string;
    price: number;
    startTime: string;
    endTime: string;
    duration: number;
    connectionAmount: number;
};

export interface ICompanie {
    name: string; 
    logo: string;
    alt: string;
}

export interface ICriteria {
    value: string,
}

export interface IConnections {
    value: number,
    label: string,
    selected: boolean,
}

export interface ICompany {
    value: string,
    selected: boolean,
}

