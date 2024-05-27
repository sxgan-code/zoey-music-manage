import {PageType, ResponseResult} from "@/api/common-types.ts";
import request from "@/utils/http.ts";


/**
 * 获取所有歌曲信息
 *
 * @param data {LoginData}
 * @returns
 */
export function getAllSongsApi(data: PageType): Promise<ResponseResult<PageType>> {
    const requestJsonData = JSON.stringify(data)
    return request({
        url: "/file/song/list",
        method: "post",
        data: requestJsonData,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            // "Content-Type": "multipart/form-data",
        },
    });
}