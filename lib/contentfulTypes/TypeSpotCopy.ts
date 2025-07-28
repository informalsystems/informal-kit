import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSpotCopyFields {
    spotName?: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
    markdownContent: EntryFieldTypes.Text;
}

export type TypeSpotCopySkeleton = EntrySkeletonType<TypeSpotCopyFields, "spotCopy">;
export type TypeSpotCopy<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSpotCopySkeleton, Modifiers, Locales>;
