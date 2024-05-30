export type PaginationBuilderOptions = {
    page: number
    perPage: number
    length: number
}

export type Pagination = {
    current: number
    previous: number | null
    next: number | null
    totalResult: number
    perPage: number
    last: number
    startIndex: number
    endIndex: number
}

export default class PaginationBuilder {
    page: number;
    perPage: number;
    lastPage: number;
    length: number;

    constructor(options: PaginationBuilderOptions) {
        this.page = options.page;
        this.perPage = options.perPage;
        this.length = options.length;
    }

    build(): Pagination {
        const startIndex = this.page > 1 ? (this.perPage * (this.page - 1)) : 0
        const endIndex = this.length < (this.perPage * this.page) ? this.length : (this.perPage * this.page);
        const lastPage = Math.ceil((this.length / this.perPage));

        const paginationValues = {
            current: this.page,
            previous: this.page > 1 ? this.page - 1 : null,
            next: this.page < lastPage ? this.page + 1 : null,
            totalResult: this.length,
            perPage: this.perPage,
            last: lastPage,
            startIndex,
            endIndex
        };

        return paginationValues;
    }
}