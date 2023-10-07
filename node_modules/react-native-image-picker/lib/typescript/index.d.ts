import { CameraOptions, ImageLibraryOptions, Callback, ImagePickerResponse } from './types';
export * from './types';
export declare function launchCamera(options: CameraOptions, callback?: Callback): Promise<ImagePickerResponse>;
export declare function launchImageLibrary(options: ImageLibraryOptions, callback?: Callback): Promise<ImagePickerResponse>;
