import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSpot__copy__for__informal__systemsFields {
    slug: EntryFieldTypes.Symbol;
    context?: EntryFieldTypes.Symbol;
    heading?: EntryFieldTypes.Symbol;
    subheading?: EntryFieldTypes.Symbol;
    body?: EntryFieldTypes.RichText;
    primaryCallToActionLabel?: EntryFieldTypes.Symbol;
    primaryCallToActionUrl?: EntryFieldTypes.Symbol;
    secondaryCallToActionLabel?: EntryFieldTypes.Symbol;
    secondaryCallToActionUrl?: EntryFieldTypes.Symbol;
    featureIconCollection?: EntryFieldTypes.Symbol<"Brands" | "Light" | "Regular" | "Solid" | "Thin">;
    featureIconName?: EntryFieldTypes.Symbol;
    featureImages?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    children?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeSpot__copy__for__informal__systemsSkeleton>>;
    json?: EntryFieldTypes.Object;
}

export type TypeSpot__copy__for__informal__systemsSkeleton = EntrySkeletonType<TypeSpot__copy__for__informal__systemsFields, "spot-copy-for-informal-systems">;
export type TypeSpot__copy__for__informal__systems<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSpot__copy__for__informal__systemsSkeleton, Modifiers, Locales>;
