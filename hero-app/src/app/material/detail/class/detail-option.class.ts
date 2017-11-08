export interface DetailItemOption {
    key: string,
    value: string,
}

export interface DetailComponentOption {
    header?: string;
    footer?: string;
    data: DetailItemOption[];
}
