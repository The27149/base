/**
 * spine动画工具类
 */

export default class SpineUtils {

    /**
     * 获取动画时长（s）
     * @param sp spine对象
     * @param aniName 动画名
     */
    public static getAniTime(sp: sp.Skeleton, aniName: string) {
        let ani = sp.findAnimation(aniName);
        if (!ani) {
            console.log(`找不到动画名 - ${aniName}`);
            return 0;
        }
        let originTime = ani.duration;
        return originTime;
    }

    /**
     * 指定时长播放动画
     * @param sp spine对象
     * @param aniName 动画名
     * @param loop 是否循环
     * @param duration 播放历时（s）
     * @param onlySpeedUp 只加速或原速播放
     */
    public static playAniByTime(sp: sp.Skeleton, aniName: string, loop?: boolean, duration?: number, onlySpeedUp?: boolean) {
        let ani = sp.findAnimation(aniName);
        let originTime = ani.duration;
        let timeScale = duration ? (originTime / duration) : 1;
        if (onlySpeedUp && timeScale < 1) timeScale = 1;
        sp.setAnimation(0, aniName, loop);
        sp.timeScale = timeScale;
    }
}
