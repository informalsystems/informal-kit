import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCodeSnippetFields {
    language: EntryFieldTypes.Symbol;
    code: EntryFieldTypes.Text;
}

export type TypeCodeSnippetSkeleton = EntrySkeletonType<TypeCodeSnippetFields, "codeSnippet">;
export type TypeCodeSnippet<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCodeSnippetSkeleton, Modifiers, Locales>;
