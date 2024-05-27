import {AxiosResponse} from "axios";

/**
 * 扩展响应字段与后端对齐
 */
export interface ResponseResult<T> extends AxiosResponse<T> {
    /**
     * response timestamp.
     */
    timestamp: number;
    /**
     * response message.
     */
    message: string;

    /**
     * response data size.
     */
    total: number;
}

export interface PageType {
    currentIndex: number,
    pageSize: number,
    pageTotal: number,
    dataTotal: number,
    sizeOptions?: number[],
    list?: any,
}


