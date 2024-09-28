import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeBlogPostFields {
    featureImage?: EntryFieldTypes.AssetLink;
    date: EntryFieldTypes.Date;
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    categories: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"Cooperative" | "Cosmos" | "Cycles" | "Engineering" | "Research">>;
    authors: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    keywords?: EntryFieldTypes.Text;
    excerpt: EntryFieldTypes.RichText;
    includeTableOfContents?: EntryFieldTypes.Boolean;
    introduction?: EntryFieldTypes.RichText;
    body?: EntryFieldTypes.RichText;
    scripts?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"MathJAX for LaTeX support">>;
}

export type TypeBlogPostSkeleton = EntrySkeletonType<TypeBlogPostFields, "blogPost">;
export type TypeBlogPost<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;
