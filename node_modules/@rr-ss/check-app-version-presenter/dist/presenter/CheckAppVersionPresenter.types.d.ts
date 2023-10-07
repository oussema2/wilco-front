import type { VersionCheckResult } from '@rr-ss/app-version-checker';
import type { IShowMessageParameters } from '../interactors/ShowInfoMessage';
export interface IVersionChecker {
    checkCurrentVersion(): Promise<VersionCheckResult>;
}
export interface IShowInfoMessage {
    showMessage: (parameters: IShowMessageParameters) => void;
}
export interface IOpenAppStorePage {
    openAppStore: () => Promise<boolean>;
}
export interface IRecommendedToUpdatePopupTextsConfig {
    title: string;
    message: string;
    updateButton: string;
    cancelButton: string;
}
export interface IRequiredToUpdatePopupTextsConfig {
    title: string;
    message: string;
    updateButton: string;
}
export interface ITextsConfig {
    recommendedToUpdatePopup: IRecommendedToUpdatePopupTextsConfig;
    requiredToUpdatePopup: IRequiredToUpdatePopupTextsConfig;
}
export interface ITextsConfigParameter {
    recommendedToUpdatePopup?: Partial<IRecommendedToUpdatePopupTextsConfig>;
    requiredToUpdatePopup?: Partial<IRequiredToUpdatePopupTextsConfig>;
}
export interface IConstructorParameters {
    versionChecker: IVersionChecker;
    showInfoMessage: IShowInfoMessage;
    openAppStorePage: IOpenAppStorePage;
    textsConfig?: ITextsConfigParameter;
}
export interface IDefaultWithParamters {
    versionChecker: IVersionChecker;
    androidStoreURL: string;
    iosStoreURL: string;
    textsConfig?: ITextsConfigParameter;
}
