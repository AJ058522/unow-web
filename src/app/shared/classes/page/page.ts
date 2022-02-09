export class Page {
    size: number = 0;
    totalElements: number = 0;
    totalPages: number = 0;
    pageNumber: number = 0;
}

export class PageCalculator {

    calculatePage(data: any): Page {

        let pageObject = new Page();

        const totalPages = Math.round(data.total / data.per_page).toFixed(0);

        return pageObject = {
            "size": data.per_page,
            "totalElements": data.total,
            "totalPages": Number(totalPages),
            "pageNumber": data.current_page -1
        }
    }
}