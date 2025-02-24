import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeRouteMetadataFields {
    routePattern: EntryFieldTypes.Symbol;
    isBaseRoute: EntryFieldTypes.Boolean;
    pageTitle?: EntryFieldTypes.Symbol;
    pageDescription?: EntryFieldTypes.Text;
    keywords?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    json?: EntryFieldTypes.Object;
}

export type TypeRouteMetadataSkeleton = EntrySkeletonType<TypeRouteMetadataFields, "routeMetadata">;
export type TypeRouteMetadata<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeRouteMetadataSkeleton, Modifiers, Locales>;
