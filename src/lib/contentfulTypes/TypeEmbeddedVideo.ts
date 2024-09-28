import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeEmbeddedVideoFields {
    title: EntryFieldTypes.Symbol;
    videoId?: EntryFieldTypes.Symbol;
    videoProvider?: EntryFieldTypes.Symbol<"Vimeo" | "YouTube">;
}

export type TypeEmbeddedVideoSkeleton = EntrySkeletonType<TypeEmbeddedVideoFields, "embeddedVideo">;
export type TypeEmbeddedVideo<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeEmbeddedVideoSkeleton, Modifiers, Locales>;
