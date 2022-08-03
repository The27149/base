export interface IProtoConf {
    bundle: string;
    path: object;
    cmd: object;
    getType(cmd: number, cc_md: number): string;
    getModuleById(cmd?: number): string;
}