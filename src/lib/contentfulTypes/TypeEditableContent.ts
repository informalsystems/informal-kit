import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeEditableContentFields {
    path: EntryFieldTypes.Symbol;
    richText?: EntryFieldTypes.RichText;
    attachedMedia?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    json?: EntryFieldTypes.Object;
}

export type TypeEditableContentSkeleton = EntrySkeletonType<TypeEditableContentFields, "editableContent">;
export type TypeEditableContent<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeEditableContentSkeleton, Modifiers, Locales>;
