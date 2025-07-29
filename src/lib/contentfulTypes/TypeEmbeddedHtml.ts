import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeEmbeddedHtmlFields {
    html: EntryFieldTypes.Text;
}

export type TypeEmbeddedHtmlSkeleton = EntrySkeletonType<TypeEmbeddedHtmlFields, "embeddedHtml">;
export type TypeEmbeddedHtml<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeEmbeddedHtmlSkeleton, Modifiers, Locales>;
