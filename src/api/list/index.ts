import {PageType, ResponseResult} from "@/api/common-types.ts";
import request from "@/utils/http.ts";
import {MusicSongType} from "@/api/list/types.ts";

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

/**
 * 修改歌曲信息
 *
 * @param data {LoginData}
 * @returns
 */
export function updateSongApi(data: MusicSongType): Promise<ResponseResult<string>> {
    const requestJsonData = JSON.stringify(data)
    return request({
        url: "/file/song/update",
        method: "post",
        data: requestJsonData,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            // "Content-Type": "multipart/form-data",
        },
    });
}