import request from "@/utils/http";
import {LoginData, LoginResult} from "./types";
import {ResponseResult} from "@/api/common-types.ts";


/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function signinApi(data: LoginData): Promise<ResponseResult<LoginResult>> {
    const requestJsonData = JSON.stringify(data)
    const formData = new FormData();
    formData.append("username", data.email);
    formData.append("password", data.password);
    return request({
        url: "/admin/auth/signin",
        method: "post",
        data: requestJsonData,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            // "Content-Type": "multipart/form-data",
        },
    });
}