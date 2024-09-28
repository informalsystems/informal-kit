import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeEmbeddedTweetFields {
    tweetUrl: EntryFieldTypes.Symbol;
}

export type TypeEmbeddedTweetSkeleton = EntrySkeletonType<TypeEmbeddedTweetFields, "embeddedTweet">;
export type TypeEmbeddedTweet<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeEmbeddedTweetSkeleton, Modifiers, Locales>;
