// 定义权限常量
export const PERMISSION = {
    DISCIPLINARY_COMMITTEE: 1,        // 风纪委员
    FIR_MAINTAINER: 1 << 1,        // 一级管理员
    SEC_MAINTAINER: 1 << 2,        // 二级管理员
    THI_MAINTAINER: 1 << 3, // 三级管理员
    ADMINISTRATOR: 1 << 4, // 副馆长
    ADVANCED_ADMINISTRATOR: 1 << 5, //馆长
} as const;
// 权限名称映射
const PERMISSION_NAMES: Record<number, string> = {
    1: "风纪委员",
    2: "一级管理员",
    4: "二级管理员",
    8: "三级管理员",
    16: "副馆长",
    32: "馆长",
};

export const cnByPermission = (permission: number): Array<string> => {
    const result: Array<string> = [];
    // 遍历所有已知权限
    for (const [bit, name] of Object.entries(PERMISSION_NAMES)) {
        const bitNum = parseInt(bit);
        // 使用按位与检查是否拥有该权限
        if ((permission & bitNum) === bitNum) {
            result.push(name);
        }
    }
    return result;
}