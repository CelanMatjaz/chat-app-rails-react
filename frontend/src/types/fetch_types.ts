export interface ResponseType<T> {
    status: number;
    page?: number;
    total_pages?: number
    next_page?: number | null
    data: T
    errors?: string[]
};
