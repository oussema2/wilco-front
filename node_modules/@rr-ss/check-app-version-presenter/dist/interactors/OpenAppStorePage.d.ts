interface ILinkOpener {
    openURL: (url: string) => Promise<boolean>;
}
interface IConstructorParameters {
    androidStoreURL: string;
    iosStoreURL: string;
    linkOpener?: ILinkOpener;
}
export default class OpenAppStorePage {
    androidStoreURL: string;
    iosStoreURL: string;
    linkOpener: ILinkOpener;
    constructor({ androidStoreURL, iosStoreURL, linkOpener }: IConstructorParameters);
    openAppStore(): Promise<boolean>;
}
export {};
