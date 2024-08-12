export default interface IPaginate {
    keyword: string,
    page: number,
    take: number,
    numberRecords: number,
    pages: number,
    hasPrev: boolean,
    hasNext: boolean
}