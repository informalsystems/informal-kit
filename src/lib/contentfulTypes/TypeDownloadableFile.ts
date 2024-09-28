import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeDownloadableFileFields {
    title: EntryFieldTypes.Symbol;
    file: EntryFieldTypes.AssetLink;
}

export type TypeDownloadableFileSkeleton = EntrySkeletonType<TypeDownloadableFileFields, "downloadableFile">;
export type TypeDownloadableFile<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeDownloadableFileSkeleton, Modifiers, Locales>;
