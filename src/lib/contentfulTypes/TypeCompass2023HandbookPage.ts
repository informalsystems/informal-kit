import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCompass2023HandbookPageFields {
    year: EntryFieldTypes.Integer;
    order: EntryFieldTypes.Integer;
    screenCodename: EntryFieldTypes.Symbol;
    menuIcon?: EntryFieldTypes.Symbol;
    layoutType: EntryFieldTypes.Symbol<"CSV Data Dump" | "Content + Photo" | "Content Only" | "Photo + Content" | "Title Screen">;
    coverPhoto?: EntryFieldTypes.AssetLink;
    screenContent: EntryFieldTypes.RichText;
    csvData?: EntryFieldTypes.Text;
}

export type TypeCompass2023HandbookPageSkeleton = EntrySkeletonType<TypeCompass2023HandbookPageFields, "compass2023HandbookPage">;
export type TypeCompass2023HandbookPage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCompass2023HandbookPageSkeleton, Modifiers, Locales>;
