/**
 * 登录请求参数
 */
export interface LoginData {
    /**
     * 邮箱
     */
    email: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 确认密码
     */
    rePassword: string;

    /**
     * 验证码
     */
    verifyCode: string;

}

/**
 * 登录响应
 */
export interface LoginResult {
    /**
     * 访问token
     */
    token?: string;
}
