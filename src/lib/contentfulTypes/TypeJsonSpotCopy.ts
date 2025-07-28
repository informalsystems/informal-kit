import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeJsonSpotCopyFields {
    codeName: EntryFieldTypes.Symbol;
    body?: EntryFieldTypes.RichText;
    attachedMedia?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    json?: EntryFieldTypes.Object;
}

export type TypeJsonSpotCopySkeleton = EntrySkeletonType<TypeJsonSpotCopyFields, "jsonSpotCopy">;
export type TypeJsonSpotCopy<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeJsonSpotCopySkeleton, Modifiers, Locales>;
