import { VersionCheckResult } from '@rr-ss/app-version-checker';
import type { IVersionChecker, IShowInfoMessage, IOpenAppStorePage, ITextsConfig, IConstructorParameters, IDefaultWithParamters } from './CheckAppVersionPresenter.types';
export { VersionCheckResult };
export default class CheckAppVersionPresenter {
    versionChecker: IVersionChecker;
    showInfoMessage: IShowInfoMessage;
    openAppStorePage: IOpenAppStorePage;
    textsConfig: ITextsConfig;
    versionCheckResultHandlers: {
        [id: string]: () => void;
    };
    constructor({ versionChecker, showInfoMessage, openAppStorePage, textsConfig }: IConstructorParameters);
    static defaultWith({ versionChecker, androidStoreURL, iosStoreURL, textsConfig }: IDefaultWithParamters): CheckAppVersionPresenter;
    checkCurrentVersion(): Promise<VersionCheckResult>;
    private onForceUpdate;
    private onUpdateRecommended;
    private openStore;
}
