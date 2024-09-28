import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeRouteMetadataFields {
    routePattern: EntryFieldTypes.Symbol;
    isBaseRoute: EntryFieldTypes.Boolean;
    title?: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    keywords?: EntryFieldTypes.Text;
    favicon?: EntryFieldTypes.Symbol<"blue-300" | "blue-500" | "teal-500">;
}

export type TypeRouteMetadataSkeleton = EntrySkeletonType<TypeRouteMetadataFields, "routeMetadata">;
export type TypeRouteMetadata<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeRouteMetadataSkeleton, Modifiers, Locales>;
