import request from "@/utils/http.ts";
import {ResponseResult} from "@/api/common-types.ts";
import {MusicSongType} from "@/api/list/types.ts";

/**
 * 获取所有歌曲信息
 *
 * @param data {LoginData}
 * @returns
 */
export function fileUploadApi(file: any): Promise<ResponseResult<string>> {
    // const requestJsonData = JSON.stringify(data)
    const formData = new FormData();
    formData.append("file", file);
    return request({
        url: "/file/upload/single/img",
        method: "post",
        data: formData,
        headers: {
            // "Content-Type": "application/json;charset=utf-8",
            "Content-Type": "multipart/form-data",
        },
    });
}

/**
 * 获取所有歌曲信息
 *
 * @param data {LoginData}
 * @returns
 */
export function songFileUploadApi(file: any): Promise<ResponseResult<MusicSongType>> {
    // const requestJsonData = JSON.stringify(data)
    const formData = new FormData();
    formData.append("file", file);
    return request({
        url: "/file/upload/single/song",
        method: "post",
        data: formData,
        headers: {
            // "Content-Type": "application/json;charset=utf-8",
            "Content-Type": "multipart/form-data",
        },
    });
}

